---
name: animejs
description: Build performant, polished web animations using Anime.js v4.5.0 for this React portfolio. Use for text reveals, staggered entrances, hover interactions, SVG animation, timelines, micro-interactions, and cinematic UI motion.
---

# Anime.js Skill

## Purpose

Use Anime.js v4.5.0 to create polished, intentional animations for this portfolio.

The goal is premium motion design, not animation everywhere.

## When to use Anime.js

Use Anime.js for:

- Text reveal animations
- Character/word/line stagger effects
- Section entrance animations
- Element choreography
- SVG animations
- Timeline-based sequences
- Interactive UI motion
- Hover and cursor interactions
- Micro-interactions
- Coordinated page transitions

## When NOT to use Anime.js

Prefer CSS when a simple CSS transition is sufficient.

Do not use Anime.js for:

- Simple opacity transitions
- Basic hover effects
- Simple transforms
- Layout styling
- Animations that CSS can handle cleanly

Do not introduce JavaScript animation unnecessarily.

## React rules

This project uses React.

When using Anime.js:

1. Keep animations scoped to the component.
2. Start animations after the component has mounted.
3. Avoid manipulating unrelated DOM elements.
4. Clean up animation instances when components unmount.
5. Avoid unnecessary re-renders.
6. Prefer refs for DOM animation targets.
7. Do not store rapidly changing animation state in React state.

## Performance

Prioritize:

- transform
- opacity
- efficient DOM access
- GPU-friendly animation
- minimal layout recalculation

Avoid animating expensive layout properties such as:

- width
- height
- top
- left
- margin
- padding

Prefer:

- translateX
- translateY
- scale
- rotate
- opacity

Do not create unnecessary infinite animations.

## Motion design

Animations should have purpose.

Prefer:

- smooth entrances
- controlled stagger
- subtle easing
- deliberate timing
- consistent motion language
- visual hierarchy

Avoid:

- excessive bouncing
- random movement
- excessive particles
- constant motion
- distracting effects
- animation that hurts readability

## Portfolio style

The portfolio should feel:

- premium
- modern
- technical
- cinematic
- confident
- minimal
- responsive

Motion should reinforce the visual hierarchy.

Important content should appear naturally before decorative animation.

## Accessibility

Respect reduced-motion preferences.

When the user prefers reduced motion:

- reduce or disable non-essential animation
- preserve content visibility
- avoid motion-dependent interactions

Never hide essential content permanently behind an animation.

## Implementation workflow

Before implementing an animation:

1. Identify the purpose.
2. Determine whether CSS is enough.
3. If JavaScript animation is useful, use Anime.js.
4. Choose the smallest appropriate animation.
5. Keep the animation scoped to its component.
6. Test desktop and mobile behavior.
7. Consider reduced-motion behavior.
8. Check performance.

## Code quality

Prefer simple, readable animation code.

Do not create large animation abstractions unless multiple components genuinely need them.

Keep animation logic close to the component it controls.

Use Anime.js v4.5.0 APIs and syntax.

Do not invent Anime.js APIs.

When uncertain about an API, consult the official Anime.js documentation before implementing it.

## Design principle

The portfolio should never look like:

"Look how many animations I can add."

It should look like:

"Every movement was intentional."