# One Link

## Share all your links, in one link!

A service to easily share multiple links, without actually sending multiple links. A similar concept to linktree.

## Frontend

### Technologies

- Vite.js: React.js, TypeScript & SWC
- MUI

## Plan

### Core

- User authentication
- Your own profile w/ links and basic customization

### Profile

- Customize & personalize!

  - A small bio section, for your shareable profile?
  - BBCode support to allow for personalization?
  - Customize profile, background and banner image?

- Create link-buttons on your profile
  - Customize icons (or auto-select for certain known services)
  - Custom button/link text, possibly add small domain hint for visitors
  - Allow some room for customizing buttons (font-size, font-type, fun text-effects, button images etc.)

#### Play around with layout options

I think playing around with different layout options and alternatives might be a nice twist! Ex. show the buttons in some grid format instead of all in one column as most similar services do?
Allow for some sort of categorization type thing to render specific links/buttons with the same category of links/buttons?

## Proof of concept / MVP

We have to start somewhere, and this time our first goals should be:

- [ ] Create a basic profile view, custom image, display name and link-buttons in a column.

  - [ ] Some sleek, modern, minimalist look as default style (with a splash of pastel colors and good vibes)

- [ ] Plan, design and create the user registration and authentication services, keep it simple. Collect basic info, at minimum: username, email and password. Nice to haves: country, full-name and gender.

  - [ ] All users should have some generic but cool profile picture, either random squiggles, possibly with the user's initials?

- [ ] Basic analytics, at minimum: Profile views (first-time visits & re-visits), Viewer countries based off of IP, Amount of clicks on a per-button basis.
  - [ ] Possibly use some fingerprinting to identify visitors instead of session cookies? Could be good to re-identify visitors viewing in app web-views vs mobile browser
