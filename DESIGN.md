---
name: The Patio Bella
description: One Patio Bella day in the real light of its two Kampala rooms, from first coffee to last light.
colors:
  butter: "#e8c585"
  amber: "#da933b"
  lantern: "#b0661e"
  canopy: "#10230c"
  gold: "#cfaa5a"
  light: "#f6ebd6"
typography:
  display:
    fontFamily: "Gloock, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Gloock, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.4vw, 4rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Gloock, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2.125rem)"
    fontWeight: 400
    lineHeight: 1.25
  lead:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.12em"
  nav:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  focus: "4px"
  plate: "14px"
  pill: "9999px"
  arch-top: "999px"
spacing:
  gutter: "4vw"
  column-gap: "3vw"
  section-top: "clamp(6rem, 14vh, 10rem)"
  section-bottom: "clamp(5rem, 12vh, 9rem)"
  chapter-gap: "clamp(6rem, 16vh, 12rem)"
  header-h: "72px"
  callbar-h: "56px"
components:
  button-call-on-light:
    backgroundColor: "{colors.canopy}"
    textColor: "{colors.butter}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-call-on-canopy:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.canopy}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-call-on-canopy-hover:
    backgroundColor: "{colors.light}"
    textColor: "{colors.canopy}"
  button-reserve:
    backgroundColor: "{colors.canopy}"
    textColor: "{colors.butter}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  tag-new:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.canopy}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  call-bar:
    backgroundColor: "{colors.canopy}"
    textColor: "{colors.light}"
    height: "{spacing.callbar-h}"
  aperture-plate:
    rounded: "{rounded.plate}"
---

# Design System: The Patio Bella

## Overview

**Creative North Star: "One Day in Two Rooms"**

The system is a single restaurant day told in the sampled light of Patio Bella's two rooms. Grounds are drenched, whole-width fields of colour that move through the day: Lugogo's butter morning, amber midday, a lantern sunset, and the canopy-green night of Arena Mall. Nothing sits on a neutral page; the colour of a section is its time of day, and the header, scrollbar and selection follow that time.

Photography never runs full bleed. It is held in apertures, shapes taken from the rooms themselves: the ring of the logo, the round-topped arch of Lugogo's doorways, and the plate. Apertures overlap one another at different sizes on an asymmetric twelve-column field, so rooms read as places you look into, not banners. Display type is Gloock in sentence case, set large and tight; everything else is Hanken Grotesk. The only action anywhere is calling one of two locations, and it travels with the visitor as pills, a two-stop call bar and a chooser panel.

Density is low and spacing is generous, in viewport-relative units: 4vw gutters, 3vw column gaps, section padding that scales with viewport height. Motion is the day itself: grounds crossfade, apertures open by clip, and the sun ring sets at Arena Mall. With reduced motion or no JavaScript, each section simply owns its own ground and everything is visible.

**Key Characteristics:**
- Whole-section colour grounds that mark time of day (butter, amber, lantern, canopy).
- Photography only inside ring, arch and plate apertures, overlapping.
- Gloock sentence-case display with Hanken Grotesk; no other faces.
- Pill-shaped call actions; a Canopy two-stop call bar; a day line with a lantern marker.
- Flat surfaces; depth comes from overlap and the 6px ground-coloured mat, not shadow.

## Colors

A warm, sampled palette: three yellows-to-browns from the rooms and the lanterns, one deep foliage green, a logo gold and a pale ink, all used as drenched fields rather than accents on white.

### Primary
- **Canopy Night** (canopy): the Arena Mall foliage canopy. It is the night ground (Sunset, Night, Closing, footer) and the ink on every light ground. It also fills the call bar, the reservation chooser and the call pills on light grounds.

### Secondary
- **Lugogo Butter** (butter): the Lugogo wall. The morning ground (hero, Lugogo), the static page background, the browser theme colour and the text on Canopy pills.
- **Lugogo Amber** (amber): the Lugogo ceiling. The midday ground, and the fill of the NEW tag that marks the newer branch.

### Tertiary
- **Lantern** (lantern): Arena's rattan lanterns. Used for the sun ring's stroke and 9px band, the day-line markers, and as the transitional sunset sky in the crossfade between amber and canopy.
- **Logo Gold** (gold): the brush ring of the logo. Call pills, drink line, Instagram link and selection on Canopy only.

### Neutral
- **Lamplight** (light): text on Canopy and Lantern. Secondary text on Canopy is Lamplight at 75% opacity (meta, places, captions) and 85% for lead paragraphs. Hairline dividers on Canopy are Lamplight at 15 to 20%.
- Dividers on light grounds are Canopy at 25 to 30% opacity; the hero's day rule is solid Canopy at 2px.

### Named Rules
**The Ground Is the Hour Rule.** Every section declares one ground from butter, amber or canopy, and the ground follows the order of the day. Lantern is a ground only in the sunset transition, never a static section.

**The Gold Stays Home Rule.** Logo Gold appears only on a Canopy ground. On butter and amber, the call action is a Canopy pill instead.

**The No Cream Ground Rule.** Lamplight is ink, never a background. The only place it fills a surface is the hover state of a gold pill.

**The Lantern Contrast Rule.** Neither Canopy nor Lamplight reaches 4.5:1 on Lantern (about 3.7:1). On a Lantern ground only display-size type may stay visible; body copy fades out until the ground is Canopy.

## Typography

**Display Font:** Gloock 400 (with Iowan Old Style, Georgia, serif)
**Body Font:** Hanken Grotesk (with ui-sans-serif, system-ui, sans-serif)

**Character:** A high-contrast, slightly bookish serif set very tight and large, against a clean, warm grotesk that does all the working text. The serif carries names: of rooms, dishes, drinks and moments.

### Hierarchy
- **Display** (400, clamp(2.75rem, 7vw, 6rem), 0.95, -0.025em): chapter titles (Midday, Sunset, Night). The hero runs it at 6vw and -0.02em, the closing brand line at 8vw, 0.92 and -0.03em. Never above 6rem.
- **Headline** (400, clamp(2.25rem, 4.4vw, 4rem), 0.98, -0.02em): sub-chapter heads such as "New at Lugogo Mall." and "Seen at Patio Bella."; the art quote and breakfast head sit just below it (2rem to 3.5rem).
- **Title** (400, clamp(1.5rem, 2.4vw, 2.125rem), 1.25): list items naming dishes and moments, stop names in the call bar and chooser (28px), short pull lines (1.5rem).
- **Lead** (Hanken 400, 1.125rem, 1.625): the paragraph under each heading, held to 34 to 40ch.
- **Body** (Hanken 400, 1.0625rem, 1.5): base text, moment descriptions to 44ch.
- **Label** (Hanken 600, 0.875rem, 0.12em, uppercase): the day line's part names only (0.75rem and 0.08em in the header copy), and place names under the large stop titles.
- **Nav** (Hanken 600, 15px, 0.04em, sentence case): header links and the Reserve pill.

Phone numbers are Hanken 600 with tabular figures.

### Named Rules
**The Sentence Case Rule.** Display and headlines are sentence case and end with a full stop. Uppercase belongs only to the day line, the NEW tag and place labels.

**The Names in Serif Rule.** Rooms, dishes, drinks and moments are set in Gloock even at list size; instructions and facts are set in Hanken.

## Layout

A twelve-column grid from 768px (md), single column below. Gutters are 4vw at every width; column gaps are 3vw. Compositions are asymmetric: text takes five to seven columns, apertures take the rest, and apertures overlap each other by negative margins or absolute placement (the cappuccino arch over the hero ring, the staircase arch bridging the Lugogo entrance and counter, the dining plate over the Arena table's corner). Section padding scales with viewport height (section-top and section-bottom tokens); chapter breaks inside a section use the chapter-gap token.

The header is sticky at 72px. The hero fills the first viewport (100svh minus the header) and ends in an 84px Canopy band holding both stops on tablet and desktop. On phones, the same two stops ride in a 56px sticky bottom call bar until the closing section's large stop blocks take over. The header day line appears from 1280px (xl) once the hero's own day line has scrolled away; header nav links appear from md.

Breakpoints are Tailwind defaults: md 768px, lg 1024px, xl 1280px. Anchor scrolling pads by the header and call-bar heights plus 16px.

## Elevation & Depth

The system is flat. Depth comes from overlap of apertures, a 6px mat in the current ground colour around an aperture that overlaps another (butter on morning sections, canopy at Arena), and scroll-scrubbed drift at different speeds. Shadows exist only on the two floating Canopy surfaces that sit above content.

### Shadow Vocabulary
- **Chooser lift** (`box-shadow: 0 18px 40px -12px rgb(16 35 12 / 0.45)`): the reservation chooser panel opened from the header.
- **Call-bar lift** (`box-shadow: 0 -10px 30px -12px rgb(16 35 12 / 0.35)`): the phone call bar, cast upward.
- **Marker halo** (`box-shadow: 0 0 0 2px var(--ground-now)`): a 2px ground-coloured ring that cuts the header day marker out of its rule.

### Named Rules
**The Mat Not Shadow Rule.** An aperture that overlaps another is separated by a 6px border in the section's ground colour, never by a drop shadow.

## Shapes

Four shapes, all taken from the rooms and the logo. The **ring** (fully round, square aspect) is the logo's ring and the sun; the signature sun ring has a 1.4-unit Lantern stroke drawn around it in the hero and a 9px Lantern band with a gap at Arena. The **arch** is round-topped (999px top radius) with 14px plate corners at the bottom, at 3:4, taken from Lugogo's doorways. The **plate** has 14px corners at 4:5, 3:4 or 3:2. Every action is a **pill** (fully rounded). The chooser panel is the one larger rounded surface (22px). Focus outlines are 2px currentColor, 4px offset, 4px radius.

## Components

### Buttons
Every action is a pill; each is a phone call except Reserve, which opens the chooser.
- **Shape:** fully rounded pill.
- **Call on light ground:** Canopy fill, Butter text, 14px 24px, Hanken 600, the number in tabular figures inside the label ("Call Lugogo 0794 299 074"). Hover lowers the fill to 85%.
- **Call on Canopy:** Gold fill, Canopy text, same size; hover fills Lamplight.
- **Large call (closing):** a Gold pill holding the number at 1.5 to 1.875rem with an inner Canopy pill reading "Call to reserve" that nudges 2px right on hover.
- **Reserve (header):** filled with the current ink, text in the current ground, 12px 24px; it follows the day as the ground changes, with a 700ms colour transition.
- **Text links:** Hanken 600 with no underline at rest; a 1px underline draws in from the left on hover and focus (500ms, expo-out).

### Tags
- **NEW:** Amber pill, Canopy text, 0.75rem bold uppercase at 0.08em, 4px 10px. Only on Lugogo, the newer branch.

### Navigation
- **Header:** sticky, 72px, filled with the current ground and current ink; the logo roundel at 48px; four sentence-case links at 15px with the draw-in underline; the Reserve pill on the right.
- **Day line:** four uppercase part names over a rule, with a Lantern dot marker. In the hero it is a 2px Canopy rule with a 16px marker at Morning; in the header (xl) it is a 1px rule at 50% with a 9px marker that slides 76px per part of the day (900ms, expo-out), the current part at full opacity and the others at 70%.

### Call bar and chooser
- **Hero stop band (md and up):** 84px Canopy band split in two by a 15% Lamplight rule; each half is one tel: link with the stop name in Gloock 28px, NEW tag, place, number and a Gold "Call" pill; hover tints the half with white at 5%.
- **Phone call bar:** sticky, 56px plus safe area, Canopy, two halves each holding a Gloock 20px stop name over a Gold "Call to reserve" line.
- **Chooser:** Canopy panel up to 420px, 22px corners, chooser lift; "Call to reserve" in Gloock 24px, then one 14px-cornered row per stop. It opens from the Reserve pill by a FLIP morph (550ms, expo-out) and closes on Escape or an outside click.

### Aperture (signature)
A shaped frame for every photograph: ring, arch or plate, with a 20% Canopy fill showing while the image loads. The frame never moves; an inner media layer is what motion scales or drifts. Apertures open by clip reveal (circle for rings, from the bottom for arches and plates) and drift at different scrubbed speeds.

### Sun ring (signature)
At Arena Mall the stage pins for 140% of the viewport on desktop (scrubbed on phones): the sunset ring sinks below a horizon rule, the ground crossfades amber to lantern to canopy, and the Arena canopy ring rises from the horizon by circular clip. Without motion only the Arena ring shows on a Canopy ground.

### Motion
GSAP through `src/lib/motion` only. Eases: out power3.out, outStrong expo.out, inOut power2.inOut, cinematic expo.inOut; CSS transitions use cubic-bezier(0.16, 1, 0.3, 1). Durations: 0.35s, 0.8s, 1.2s, 1.6s. Headlines reveal line by line. Reduced motion collapses all animation and leaves every section on its own static ground.

## Do's and Don'ts

### Do:
- **Do** give every section one ground from butter, amber or canopy, in the order of the day, and set ink by ground (Canopy on butter and amber, Lamplight on canopy).
- **Do** put every photograph in a ring, arch or plate aperture, and overlap apertures with a 6px ground-coloured mat.
- **Do** make every reservation action a tel: link in a pill, with the number in tabular figures, and give both locations equal presence with the NEW tag on Lugogo.
- **Do** set display and headlines in Gloock 400, sentence case, tight (0.92 to 1.02 line height, negative tracking), capped at 6rem.
- **Do** keep Logo Gold on Canopy grounds only.
- **Do** keep every section readable on its own static ground with reduced motion and without JavaScript.

### Don't:
- **Don't** run photography full bleed or behind text.
- **Don't** use Lamplight (or any cream) as a ground.
- **Don't** use colour gradients on grounds or surfaces, glows, or drop shadows on apertures; the two Canopy lifts are the only shadows.
- **Don't** add eyebrows or kickers above headlines; uppercase is reserved for the day line, the NEW tag and place labels.
- **Don't** set body copy on a Lantern ground; it does not reach 4.5:1.
- **Don't** add typefaces beyond Gloock and Hanken Grotesk.
