# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are external technical audiences, including developers, architects, engineering leads, and AI practitioners. They use the repository during conference sessions, workshops, demonstrations, and self-guided learning.

Daniel Scott-Raynsford and repository contributors are the authors and maintainers. Their authoring workflow supports the primary audience outcome rather than defining it.

## Product Purpose

PlagueHO Learn publishes presentations, runnable demonstrations, learning pathways, and reusable development patterns. It helps technical audiences quickly understand current Microsoft and GitHub technologies, trust the supporting evidence, and reuse the material in their own work.

Success means that an audience can grasp the central idea, verify important claims, follow or run the demonstration, and leave with an artifact they can apply.

## Positioning

Practitioner-led, demo-first learning for current Microsoft and GitHub technologies. Concepts are explained through visual stories, working demonstrations, and reusable source assets rather than documentation alone.

## Operating Context

- Public GitHub repository with content delivered through GitHub Pages, Slidev presentations, Markdown documents, and runnable demos.
- Presentations are used live at events and workshops, then retained as self-guided web resources.
- Technical claims link to authoritative sources where available.
- Presentation outlines are created before slides, and live demonstrations carry much of the proof.
- Authors work with Node.js, pnpm, Slidev, Markdown linting, and repository CI.

## Capabilities and Constraints

- Content includes Slidev presentations, self-contained demos, curated learning pathways, and reusable development patterns.
- Presentation source must remain readable, buildable, and usable at the repository's 1280 x 720 Slidev canvas where configured.
- Existing conventions in `AGENTS.md`, `.github/copilot-instructions.md`, and path-specific instruction files remain authoritative.
- Content must not contain secrets, credentials, private information, or unverifiable claims.
- Current or time-sensitive claims require clear dates and primary-source evidence where available.
- Solutions should remain simple, testable, reusable, and maintainable without unnecessary dependencies.

## Brand Commitments

- Daniel Scott-Raynsford / PlagueHO authorship remains visible and consistent.
- Microsoft and GitHub technical credibility must be protected through accuracy, source quality, and honest qualification.
- The voice is direct, practical, technically informed, and focused on helping people apply what they learn.
- Public assets should be reusable and link back to their source.

## Evidence on Hand

- `README.md` defines the repository purpose, content categories, and related repositories.
- `AGENTS.md` defines the content layout, authoring workflow, validation commands, and CI requirements.
- `.github/copilot-instructions.md` defines repository-wide security, content, naming, and style conventions.
- `presentations/` contains the published Slidev talks, their outlines, source assets, and presentation-specific evidence.
- `demos/`, `learning-pathways/`, and `patterns/` contain the reusable learning material.
- The repository does not provide blanket permission to fabricate testimonials, adoption figures, benchmarks, or product claims.

## Product Principles

- Communicate visually and keep each presentation moment focused on one concept.
- Prefer simple explanations and working demonstrations over dense reference material.
- Ground important claims in evidence and make the source easy to reach.
- Produce reusable artifacts that continue to teach after the live session.
- Keep implementation maintainable so presentation craft does not create authoring friction.

## Accessibility & Inclusion

Published web presentations and learning content target WCAG 2.2 AA. Essential content and interactions must support keyboard access, sufficient contrast, meaningful alternatives for visual material, and comprehension without relying only on color, hover, animation, or audio.
