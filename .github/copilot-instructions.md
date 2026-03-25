# GitHub Copilot Instructions

These instructions apply to all GitHub Copilot interactions in this repository.

## Repository Purpose

This is the external-facing learning content repository for Daniel Scott-Raynsford
(PlagueHO). It contains demos, presentations, learning pathways, and reusable
patterns intended for sharing at events, workshops, and online. Agentic workflow
automation assets are in [PlagueHO/plagueho.os](https://github.com/PlagueHO/plagueho.os).
Plugins and skills are maintained separately in
[PlagueHO/skills](https://github.com/PlagueHO/skills).

## General Coding Principles

- Write clean, readable, and maintainable code
- Follow the principle of least privilege for security
- Prefer explicit over implicit
- Write self-documenting code with meaningful names
- Keep functions small and focused on a single responsibility
- Handle errors explicitly and gracefully

## Code Style

- Use consistent indentation (2 spaces for YAML/JSON, 4 spaces for PowerShell/Python)
- Include a newline at the end of every file
- Avoid trailing whitespace
- Keep lines under 120 characters where possible

## Documentation

- All scripts should include a header comment explaining their purpose, parameters, and usage
- All patterns should include a README explaining when and how to use them
- Prompts should include a description of their purpose and expected inputs/outputs

## Security

- Never commit secrets, passwords, API keys, or other sensitive information
- Use environment variables or secret management tools for sensitive values
- Validate all inputs, especially when processing external data

## Asset Organization

- **Demos**: Presentation-ready demos go in `demos/`
- **Learning Pathways**: Curated learning pathways go in `learning-pathways/`
- **Patterns**: Reusable development patterns go in `patterns/`
- **Scripts**: Utility scripts organized by technology in `scripts/`
- **Docs**: NOT maintained here — see [PlagueHO/plagueho.os](https://github.com/PlagueHO/plagueho.os)
