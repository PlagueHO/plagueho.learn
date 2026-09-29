---
title: 'Hands-on labs design direction'
description: 'Approved visual direction and refinement constraints for the hands-on labs VitePress site.'
---

## Direction contract

The approved identity is a race pit-wall runbook: operational, evidence-led, and built for focused technical work. Refinements must preserve this identity rather than replace it with a generic documentation theme.

Keep these defining choices:

- Dark pit-wall navigation against a warm canvas
- Natural-case navigation and full-size sidebar typography for sustained reading
- Dense, ruled runbook structure with clear operational hierarchy
- Green signal color for completion and active state
- Copper markers and tinted operational panels that add warmth without weakening contrast
- Square, low-radius controls and panels
- Tabular numerals for sequence and measurement
- Generous reading space without card-based page scaffolding

## Responsive adaptation

Mobile layouts retain the same information architecture and task sequence. At 320 CSS pixels, content reflows without extending beyond the viewport, code blocks scroll within their own containers, navigation text can wrap, and no core action is hidden.

Task controls provide a minimum 44 by 44 CSS pixel activation area while preserving the compact visible checkbox. Pointer, touch, and keyboard users receive the same task state and persistent identity.

## Accessibility floor

- Body text and controls retain the approved high-contrast palette.
- Keyboard focus remains visible on links, task controls, summaries, and zoomable screenshots.
- Reduced-motion preferences remove nonessential transitions.
- Screenshot zoom closes before route cleanup and remains keyboard operable.
- Browser surfaces such as selection, focus, caret, and scrollbars use the site palette.

## Publication review

Final visual approval remains blocked until the eight real product screenshots are supplied. Review the populated screenshot expanders at 320-pixel and desktop widths before changing the lab status from draft to published.
