---
name: The Patio Bella
description: Two Kampala rooms, one table. Quiet butter sections and immersive canopy moments, told in photographs and Noto Serif Display.
colors:
  canopy: "#10230c"
  butter: "#e8c585"
  gold: "#cfaa5a"
  light: "#f6ebd6"
  lantern: "#b0661e"
typography:
  display:
    fontFamily: "Noto Serif Display, Noto Serif Display 72, Didot, Georgia, serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "opsz auto"
  headline:
    fontFamily: "Noto Serif Display, Noto Serif Display 72, Didot, Georgia, serif"
    fontSize: "clamp(2.75rem, 5.4vw, 5rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Noto Serif Display, Noto Serif Display 72, Didot, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.4vw, 4.25rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
  statement:
    fontFamily: "Noto Serif Display, Noto Serif Display 72, Didot, Georgia, serif"
    fontSize: "clamp(1.9rem, 3.7vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  caption-title:
    fontFamily: "Noto Serif Display, Noto Serif Display 72, Didot, Georgia, serif"
    fontSize: "clamp(1.375rem, 1.9vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  wordmark:
    fontFamily: "Noto Serif Display, Noto Serif Display 72, Didot, Georgia, serif"
    fontSize: "clamp(4.5rem, 19vw, 19rem)"
    fontWeight: 500
    lineHeight: 0.82
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  ui:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.01em"
  label:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  focus: "2px"
  inline-photo: "3px"
  frame: "4px"
spacing:
  gutter: "4vw"
  gutter-centred: "6vw"
  column-gap: "3vw"
  header-h: "76px"
  section-y: "clamp(7rem, 18vh, 12rem)"
  statement-y: "clamp(8rem, 26vh, 15rem)"
components:
  button-butter:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.canopy}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "48px"
  button-butter-hover:
    backgroundColor: "{colors.light}"
    textColor: "{colors.canopy}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.canopy}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-gold-hover:
    backgroundColor: "{colors.light}"
    textColor: "{colors.canopy}"
  button-canopy:
    backgroundColor: "{colors.canopy}"
    textColor: "{colors.butter}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  photo-frame:
    rounded: "{rounded.frame}"
  reserve-chooser:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.canopy}"
    rounded: "{rounded.none}"
    padding: "8px"
    width: "min(92vw, 400px)"
  header:
    backgroundColor: "{colors.canopy}"
    textColor: "{colors.light}"
    height: "76px"
    padding: "0 4vw"
---

# Design System: The Patio Bella

## Overview

**Creative North Star: "Two Rooms, One Table"**

The page alternates between two grounds taken from the two real rooms: Lugogo's butter-yellow walls for the quiet, light, centred sections, and Arena's canopy green for the immersive, full-bleed moments. Photographs carry the atmosphere; type carries the voice. Display type is Noto Serif Display at weight 500 in sentence case with authored line breaks; everything functional is Montserrat. Corners are square or nearly so. There are no cards, no decorative shapes and no gradients except scrims that exist to keep type legible over photographs.

Motion is reserved for a few authored scenes rather than spread evenly: an opening where photographs stack in a small centred frame and the Arena canopy opens to full bleed, a pinned two-rooms scene, a horizontally travelling food gallery, words that fill with ink as the statement is read, and section seams that open from an inset panel so each change of ground is a movement, not a cut. Everything is visible without JavaScript and with reduced motion.

Density is low and the rhythm is generous: big vertical spacing on the light sections, viewport-height moments on the dark ones.

**Key Characteristics:**
- Two grounds only: butter (light, quiet) and canopy (immersive); gold and light belong to canopy.
- Noto Serif Display 500, sentence case, tight tracking (-0.03em), authored two-line breaks.
- Photographs in square-cornered frames (4px); the frame clips, the image inside moves.
- Fill-sweep buttons and roll links are the only interactive flourishes.
- Ground changes are revealed by clip-path seams, never by gradients.

## Colors

A two-ground palette pulled from the rooms themselves, with gold and a warm cream reserved for the dark ground.

### Primary
- **Canopy** (canopy): the Arena room's leaf-ceiling green. The immersive ground (hero, rooms, happenings, finale, footer, mobile menu, header bar), body ink on butter, the text-selection fill, and the browser theme colour.

### Secondary
- **Lugogo Butter** (butter): the Lugogo walls. The quiet ground (statement, food, visit, reserve chooser) and the default page background; also the primary button fill on canopy.

### Tertiary
- **Logo Gold** (gold): the logo's brush-stroke ring. Used only on canopy: the dark-tone call buttons, phone numbers in the menu, Instagram and Directions links, and the selection fill inside canopy sections.
- **Lantern** (lantern): the Arena lanterns. A trace accent: the middle-dot separator between names in the moving dish line on butter.

### Neutral
- **Warm Light** (light): the cream ink for text on canopy and on photographs, and the hover fill of butter and gold buttons. Never a section ground. Secondary text on canopy uses it at reduced opacity (90%, 80%, 75%, 65%); hairlines on canopy at 20-25%.
- Canopy at reduced opacity is the neutral ink family on butter: 75% for captions and notes, 30-40% for rules and link underlines, 15-20% for hairlines and the gallery progress track.

### Named Rules
**The Two Grounds Rule.** A section's background is canopy or butter, nothing else. Warm Light is ink, never ground.

**The Gold Stays Home Rule.** Gold appears only on canopy. On butter it has no contrast and no meaning.

**The Scrim Only Rule.** Gradients exist only as canopy-tinted scrims behind type on photographs (top, bottom, a centred radial behind a headline) and as masks that fade a photograph into canopy. No decorative gradients.

## Typography

**Display Font:** Noto Serif Display (with Noto Serif Display 72, Didot, Georgia), loaded with its optical-size axis and `font-optical-sizing: auto`.
**Body Font:** Montserrat (with ui-sans-serif, system-ui).

**Character:** A high-contrast Didone at display sizes against a sturdy, slightly condensed grotesk: dinner-menu elegance on one side, plain directions and phone numbers on the other.

### Hierarchy
- **Display** (500, clamp(3rem, 7.2vw, 6rem), 0.98): the hero headline only, centred, two authored lines.
- **Headline** (500, about clamp(2.75rem, 5-6.4vw, 5-6rem), 0.95-0.98): section titles, always two short sentence-case lines set as block spans ("From the kitchen / and the bar.").
- **Title** (500, clamp(2.25rem, 4.4vw, 4.25rem), 1): room names, happenings, location names. Room names on photographs run larger (up to 6rem, 0.92).
- **Statement** (500, clamp(1.9rem, 3.7vw, 3.6rem), 1.14): the centred about-sentence, max 21em, with photographs set inline like words.
- **Caption title** (500, clamp(1.375rem, 1.9vw, 1.75rem), 1.25): dish names under plates; the chooser's location names at 28px.
- **Wordmark** (500, clamp(4.5rem, 19vw, 19rem), 0.82, -0.035em): the closing "Patio Bella" in the footer, one line.
- **Lead** (400, 18-20px, 1.625): section intros, max 30-34ch.
- **Body** (400, 17px, 1.55-1.625): room and happening copy, max 40-46ch.
- **UI** (600, 15px, 0.01em): buttons and emphasised links; nav links at 500.
- **Label** (500, 13px, 0.08em, uppercase): the two room labels at the hero's foot only. The "New" tag in the chooser is 11px 600 at 0.14em.

### Named Rules
**The Authored Break Rule.** Display and headline text breaks where it was written, as block-level lines, not where the browser wraps. Headings also use `text-wrap: balance`.

**The Sentence Case Rule.** Noto Serif Display is always sentence case at weight 500. Uppercase belongs only to small Montserrat labels.

## Layout

Two spatial modes. Quiet butter sections are centred or set on a 12-column grid with a 4vw outer gutter (6vw on centred sections) and 3vw column gap, with vertical padding of clamp(7rem, 18vh, 12rem) (the statement runs to clamp(8rem, 26vh, 15rem)). Immersive canopy moments go full bleed and viewport-height (`100svh`), with copy anchored bottom-left over a scrim.

The fixed header is 76px tall; anchor scrolls offset by header height plus 12px, and sticky columns sit at header height plus 6svh. Breakpoints follow Tailwind: md 768px (tablet), lg 1024px (desktop; full nav, 12-column splits). On phones the food gallery is a swipeable snap strip, the rooms stack as 88svh panels, and the visit photo moves inline above each location. Safe-area insets are respected at the bottom edge.

Food plates vary in size and drop (tall 3:4, mid 4:5 dropped 10svh, short 1:1 dropped 18svh) so the strip reads as a staggered line, not a grid of equal tiles.

## Elevation & Depth

Flat. Depth comes from photography, scrims and clip-path layering, not shadows. One shadow exists: the reserve chooser, which floats over the hero (`0 24px 48px -16px` canopy at 50%). Sections overlap in time rather than in z-space: a seam opens the next ground over the wrapper painted in the previous one.

### Named Rules
**The Flat Ground Rule.** Surfaces sit flat. A shadow is permitted only on a floating overlay that covers a photograph.

## Shapes

Square-cornered. Photo frames carry a 4px radius, inline photographs in the statement 3px; buttons, the chooser, the menu and sections are square. Hairlines (1px, ink at 15-30%) divide rows and locations; on canopy they draw in from the left on scroll. The round logo mark is the brand asset's own shape and is the only circle in the system.

## Components

### Buttons
Rectangular and confident; colour does the work.
- **Shape:** square corners, min height 48px (44px in the header), 24-28px horizontal padding, UI type.
- **Butter on canopy:** "Reserve a table" and the header Reserve. Hover sweeps a Warm Light fill in from the left.
- **Gold on canopy:** the call buttons in the finale, with the phone number in tabular figures at 80% opacity. Hover sweeps Warm Light.
- **Canopy on butter:** the call buttons in Visit, butter label. Hover sweeps a fill in from the left; whatever fill is used must keep the label at 4.5:1 or better (see Do's and Don'ts).
- **Fill sweep:** a pseudo-element scales from 0 to 1 on X, origin right at rest and left on hover/focus, 0.6s on the expo-out curve.
- **Focus:** 2px currentColor outline, 4px offset.

### Roll Links
The text link of the system. The label slides up and an identical copy rolls in from below (0.55s, expo-out). Standalone roll links on a ground take a 1px underline in ink at 40% with 4px padding; on canopy, links to external places take gold.

### Photo Frame
A rectangle that clips; the image layer inside it scales or drifts. Reveals open the frame's clip-path (from the bottom, from the centre line, or from a small inset to full bleed) while the image settles from 1.25-1.6x to 1x. Placeholder fill is canopy at 30%.

### Navigation
- **Header:** fixed, 76px, Warm Light text. Solid canopy everywhere except over the hero, where the bar fades transparent (0.7s). Logo left, roll-link nav at 15px from lg up, Reserve and (below lg) Menu right.
- **Reserve chooser:** the Reserve button morphs (Flip, 0.6s) into a butter panel listing both locations: Noto Serif Display names, phone numbers, a Call action; each row inverts to canopy on hover. Escape and outside clicks close it.
- **Mobile menu:** full-screen canopy, opened by a clip-path wipe; Noto Serif Display links at clamp(2.75rem, 11vw, 4.5rem) rise from masks; phone numbers in gold at the foot.

### Inline Photo (signature)
Small photographs (1.75em by 0.9em, 3px radius) set into the statement sentence like words, opening from their centre line as the reader reaches them while the words fill from 16% to full ink.

### Happening Row
On canopy: a hairline, a 13rem photo and a Noto Serif Display title. With a fine pointer the photos leave the rows and a single cursor-following frame (max 320px) wipes in the hovered row's image.

### Dish Line
Menu names in Noto Serif Display at up to 7.5rem, separated by a lantern middle dot, running sideways with the scroll when motion is on and wrapping centred when it is not.

## Do's and Don'ts

### Do:
- **Do** set every section on canopy or butter, and change ground with a seam reveal (clip from a 6% side inset to full) rather than a gradient.
- **Do** keep gold and Warm Light text on canopy; on butter, ink is canopy at full or reduced opacity.
- **Do** break display and headline text into authored sentence-case lines.
- **Do** frame every photograph in a square-cornered (4px) clipping frame and animate the image inside it, not the frame's layout box.
- **Do** use the motion tokens in `src/lib/motion` (power3.out, expo.out, power2.inOut, expo.inOut; 0.35/0.8/1.2/1.6s) and animate only transforms, opacity and clip-path.
- **Do** keep every label on a fill at 4.5:1 or better in rest and hover states, including during the fill sweep.

### Don't:
- **Don't** use cards, rounded pills or decorative circles; the logo mark is the only round shape.
- **Don't** add decorative gradients; scrims and photo fade masks are the only gradients.
- **Don't** add shadows to sections, frames or buttons.
- **Don't** put small uppercase labels or eyebrows above headings; uppercase is reserved for the hero's room labels and the "New" tag.
- **Don't** use Warm Light as a section ground or gold on butter.
- **Don't** hide content with CSS outside the hero's intro gate; without JavaScript or with reduced motion, every section is simply there.
