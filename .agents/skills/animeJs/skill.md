---
name: animejs
description: Helps build modern web animations using Anime.js, especially for React portfolio interfaces, text reveals, staggered animations, hover interactions, SVG animations, and lightweight UI motion.
---

# Anime.js Skill

Use Anime.js when implementing animations for this project.

## General rules

- Prefer Anime.js for lightweight interface animations.
- Use Anime.js for entrance animations, text reveals, staggered elements, hover interactions, SVG animations, and micro-interactions.
- Avoid unnecessary continuous animation loops.
- Keep animations performant.
- Respect prefers-reduced-motion where appropriate.
- Do not add animations merely for visual decoration.
- Animations should support the user's understanding of the interface.

## React

When working with React:

- Prefer React lifecycle hooks appropriately.
- Scope animations to the component.
- Clean up animation resources when components unmount.
- Avoid directly manipulating unrelated DOM elements.

## Portfolio animation style

Prefer:

- smooth entrance animations
- staggered text reveals
- subtle hover interactions
- elegant transitions
- cinematic section transitions
- interactive typography
- SVG motion

Avoid:

- excessive bouncing
- random animation everywhere
- distracting infinite loops
- animations that reduce readability
- unnecessary dependencies

## Implementation

Before creating an animation:

1. Understand the purpose of the animation.
2. Decide whether CSS is sufficient.
3. Use Anime.js when JavaScript-driven animation provides meaningful value.
4. Keep the implementation component-friendly.
5. Test responsiveness and performance.

## Priority

Performance and usability are more important than animation complexity.