---

name: portfolio
description: Build and maintain Suman Mandal's premium interactive developer portfolio. Use for portfolio architecture, UI design, typography, responsive layouts, project presentation, animation direction, 3D character interactions, accessibility, performance, and overall visual consistency.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Suman Mandal — Portfolio Master Skill

## Identity

The portfolio represents:

**Name:** Suman Mandal

**Headline:** Vibe Coder · UI Designer

The portfolio should communicate a technically capable developer with strong visual taste and an interest in creating polished digital experiences.

Do not invent qualifications, companies, achievements, projects, statistics, or experience.

Use placeholders when information has not yet been provided.

---

# Design Direction

The visual identity should feel:

* Premium
* Futuristic
* Technical
* Minimal
* Interactive
* Confident
* Cinematic
* Developer-focused

Anime-inspired elements are allowed as a distinctive personal identity, but the website must remain professional.

Avoid making the website look like an anime fan website.

---

# Typography

Primary typeface:

**Departure Mono v1.500**

Source:

https://github.com/rektdeckard/departure-mono/releases/tag/v1.500

Use the official release assets and self-host the font inside the project.

Do not depend on a third-party font CDN when the font can be bundled locally.

Departure Mono should be used prominently for:

* Navigation
* Hero typography
* Headings
* Technical labels
* Buttons
* Project metadata
* Numbers
* UI elements

The typeface creator recommends 11px increments for pixel-perfect results.

Prefer 11px-based sizing where practical, but prioritize readability and responsive design over rigid adherence.

Do not use excessive font weights or unnecessary typography variations.

---

# Animation

Anime.js is installed in this project.

Use the dedicated Anime.js skill when implementing animations.

Animation should feel:

* Intentional
* Smooth
* Controlled
* Cinematic
* Responsive

Do not animate everything.

Prefer motion that communicates:

* hierarchy
* interaction
* state changes
* navigation
* personality
* depth

Use CSS for simple transitions when JavaScript animation is unnecessary.

---

# Signature 3D Character

The portfolio should eventually contain a 3D anime-inspired representation of Suman.

The character will be created using a user-provided photo as the visual reference.

Do not invent the user's appearance.

The intended interaction:

* Character has a natural idle state.
* Mouse movement subtly influences gaze/head/body orientation.
* Character follows the cursor without excessive movement.
* Movement should have smoothing and inertia.
* When the pointer leaves the interaction area, the character gradually returns to its neutral position.
* Interaction should feel alive rather than mechanical.

Avoid:

* aggressive rotation
* excessive shaking
* constant spinning
* distracting effects
* uncanny motion
* unnecessary particle effects

On mobile devices, provide an appropriate touch/static fallback rather than requiring mouse interaction.

---

# UI Principles

Use strong visual hierarchy.

Prioritize:

1. Identity
2. Introduction
3. Technical capability
4. Projects
5. Experience/achievements
6. Contact

Maintain generous spacing.

Avoid unnecessary cards, gradients, shadows, borders, and decorative elements.

Every visual element should have a reason to exist.

---

# Responsive Design

The portfolio must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

Do not design desktop-first and simply shrink everything.

Adapt:

* typography
* spacing
* navigation
* character interaction
* project layouts
* animation intensity

for smaller screens.

---

# Performance

Performance is a core requirement.

Prioritize:

* optimized assets
* lazy loading
* efficient animation
* minimal JavaScript
* GPU-friendly transforms
* optimized 3D assets
* code splitting when appropriate

Avoid:

* unnecessary dependencies
* huge unoptimized images
* excessive WebGL effects
* unnecessary infinite animations
* blocking page-load animations

The portfolio should feel fast before it feels flashy.

---

# Accessibility

Maintain:

* readable contrast
* keyboard navigation
* semantic HTML
* visible focus states
* meaningful alt text
* reduced-motion support

Do not make essential content dependent on animation.

Respect:

`prefers-reduced-motion`

---

# Project Showcase

Current confirmed project:

**Society Management System**

GitHub:

https://github.com/RajsProjects/society-management

Do not invent project features.

Before writing the project description, inspect the repository or ask for the required project information.

Projects should communicate:

* What problem was solved
* Technical architecture
* Technologies used
* Important engineering decisions
* Challenges
* Results
* GitHub/demo links

The project showcase should demonstrate engineering ability rather than simply displaying screenshots.

---

# Content Integrity

Never fabricate:

* job experience
* internships
* salary
* achievements
* GitHub statistics
* user counts
* performance numbers
* client names
* technologies not confirmed by the user
* awards
* certifications

If information is missing, use a clearly marked placeholder.

---

# Code Architecture

Use clean component-based architecture.

Prefer reusable components when reuse provides real value.

Avoid over-engineering.

Keep:

* UI components
* animation logic
* data
* utilities
* assets

organized logically.

Do not create unnecessary abstractions.

---

# Technology Selection

Use the smallest technology stack capable of producing the desired result.

Current known technologies:

* React
* Vite
* Anime.js
* Departure Mono

Additional technologies such as Three.js, React Three Fiber, GSAP, Lenis, or other libraries should only be introduced when there is a clear technical/design reason.

Do not install dependencies simply because they are popular.

---

# Development Workflow

Before implementing a major feature:

1. Understand the requirement.
2. Inspect the existing project.
3. Identify reusable components.
4. Choose the simplest appropriate implementation.
5. Implement incrementally.
6. Test desktop and mobile.
7. Check accessibility.
8. Check performance.
9. Review visual consistency.

Do not rewrite working code without a reason.

Do not make large architectural changes without explaining why.

---

# Visual Quality Standard

The final result should feel like a portfolio designed by a developer who understands both engineering and visual design.

Avoid generic:

* template layouts
* hero sections
* glassmorphism everywhere
* excessive gradients
* meaningless 3D
* animation overload
* generic "developer portfolio" aesthetics

The goal is a recognizable personal identity.

---

# Core Principle

**Technology should serve the experience.**

Do not add a technology because it looks impressive.

Use technology when it creates a better interaction, stronger visual communication, better performance, or meaningful engineering value.
