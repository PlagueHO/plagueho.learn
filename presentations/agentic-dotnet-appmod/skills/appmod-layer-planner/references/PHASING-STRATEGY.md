# Phasing Strategy Reference

Detailed guidance for phased .NET Framework → .NET modernization upgrades.

## Table of Contents

- [SDK-Style Conversion](#sdk-style-conversion)
- [Package Upgrade Grouping](#package-upgrade-grouping)
- [PR Sizing Guidelines](#pr-sizing-guidelines)
- [Layer Traversal Rules](#layer-traversal-rules)
- [Working Application at Each Phase](#working-application-at-each-phase)

## SDK-Style Conversion

SDK-style conversion is the mandatory gating step before any module-level
modernization can proceed. Key constraints:

### Why It Cannot Be Decomposed

- SDK-style conversion and `packages.config → PackageReference` are tightly
  coupled in current tooling and cannot be cleanly separated.
- Mixing SDK-style and non-SDK projects in the same solution is unreliable —
  build and restore failures are common.
- The old format explicitly listed transitive dependencies; the new format
  relies on inferred versions, leading to version collisions and breakage
  of things that "worked by accident."

### Mitigation Strategies

1. **Run `dotnet try-convert` or the Visual Studio migration wizard** on the
   entire solution in a single pass.
2. **Pin transitive dependency versions** using a `Directory.Packages.props`
   with Central Package Management to prevent version drift.
3. **Create a `Directory.Build.props`** at the solution root for shared
   properties (`TargetFramework`, `LangVersion`, etc.).
4. **Validate the build after conversion** before making any other changes.
   The goal is: same framework, same packages, new project format.
5. **Keep the TFM as `net48`** during SDK-style conversion — do NOT
   retarget in the same PR.

### Expected PR Size

For a solution with ~88 projects, the SDK-style conversion PR will
touch every `.csproj` file plus delete all `packages.config` files.
This is often 5K–15K lines of diff but is mostly mechanical — the
reviewer should focus on:

- All projects still build.
- Package versions match the original `packages.config`.
- No packages were accidentally dropped or added.
- Assembly binding redirects are preserved where needed.

## Package Upgrade Grouping

After SDK-style conversion, package upgrades should be grouped logically
to keep PRs reviewable:

| Group | Examples | Why Together |
|-------|----------|-------------|
| Azure SDKs | `Microsoft.Azure.*`, `Azure.*` | Version matrix coupling |
| ASP.NET / System.Web adapters | `Microsoft.AspNetCore.SystemWebAdapters` | Single concern |
| NHibernate stack | `NHibernate`, `FluentNHibernate` | ORM layer |
| Test infrastructure | `NUnit`, `Moq`, `Autofac.Extras.Moq` | Test-only impact |
| Serialization | `Newtonsoft.Json`, `System.Text.Json` | Data contract alignment |

### Rules

- Never upgrade more than one logical group per PR.
- Solution-wide package version consistency is mandatory — use
  `Directory.Packages.props` to enforce.
- If a package upgrade requires code changes, include the code changes
  in the same PR (keeps the build green).

## PR Sizing Guidelines

| Metric | Target | Hard Limit |
|--------|--------|------------|
| Lines of code changed | < 2,000 | 5,000 |
| Files changed | < 50 | 100 |
| Projects affected | < 15 | 30 |
| Story points | < 100 | 200 |

If a phase exceeds these limits, split it into sub-phases.

Exception: Phase 0 (SDK-style conversion) may exceed these limits because
it is inherently solution-wide and mechanical.

## Layer Traversal Rules

1. **Bottom-up only** — never modernize a project before its dependencies.
2. **Breadth-first within a layer** — projects at the same dependency depth
   can be modernized in parallel.
3. **Test projects follow their subject** — modernize `Orchard.Framework`
   before `Orchard.Framework.Tests`.
4. **Hub projects get their own phase** — if a project has > 20 downstream
   dependents (e.g. `Orchard.Framework`), give it a dedicated phase even
   if it is the only project at that level.
5. **Leaf nodes are safest** — projects with zero downstream dependents can
   be modernized with minimal risk of cascading breakage.

## Working Application at Each Phase

Each phase must result in a buildable, testable application:

- **Phase 0**: Solution builds with SDK-style projects on `net48`.
- **Phase 1+**: As each layer is retargeted, the solution should still
  build. Use `<TargetFrameworks>net48;net10.0</TargetFrameworks>` multi-
  targeting if needed during the transition.
- **Final phase**: Remove `net48` targets, validate on `net10.0` only.

If a phase cannot produce a building solution, it is too coarse — split
it further.
