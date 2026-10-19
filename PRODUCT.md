# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in Kampala choosing where to eat, drink or meet: friends planning a
weekend catch-up, colleagues looking for a lunch or daytime meeting spot,
couples and families marking an occasion, and people who already follow
The Patio Bella on Instagram and want details. Most will arrive on a phone,
often from social media.

A second audience is the competition's judges, who evaluate the homepage as
a piece of art-directed, professionally built web design.

## Product Purpose

A competition-entry website concept for The Patio Bella, a restaurant, café
and cocktail bar with two Kampala locations. The homepage is the main
deliverable. Success means that a first-time visitor understands what Patio Bella
is and what each location is like within seconds, wants to go, and reserves a
table. A judge should also remember the homepage as deliberately
art-directed rather than templated.

## Positioning

One brand with two distinct places. Arena Mall, Nsambya is an upper-floor
dining room under a hanging-foliage canopy and rattan lanterns, looking over
the city. Lugogo Mall is a newly opened, bright, butter-yellow café-restaurant
with glass walls onto palms. The brand's own recurring line is
**#WhereWeAllComeTogether**. Breakfast-to-late food, coffee and cocktails sit
alongside recurring social rituals: Henna Fridays, Sunday sunset music and
family fun days.

## Operating Context

- Reservations and deliveries are taken by phone, one number per location.
- Content is driven by Instagram posts: daily dishes, cocktails, events and
  location news.
- The website is a concept and is not yet commissioned or live.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router, Cache Components), React 19, TypeScript,
  Tailwind CSS 4, GSAP 3.15 (ScrollTrigger, SplitText, Flip) through
  `src/lib/motion`; conventions in `docs/MOTION.md`.
- Primary action: **reserve a table** by calling the chosen location.
- Both locations get equal presence, but Lugogo is newly opened and should
  be pushed slightly harder.
- Show real business details exactly as posted, marked for verification before
  launch. Menu prices are shown as printed on the posted menu (user request,
  2026-10-19). **Do not show opening hours** unless the user confirms them.
- The two locations are **branches** (never "rooms").
- Type: only the two faces of the logo: a high-contrast serif for "Patio"
  (Noto Serif Display, full weight) and a geometric sans for "BELLA"
  (Montserrat).
- Site structure: Home, Menu, About, What's on, Contact.
- No online booking system, ordering system or CMS exists; none may be implied.

## Brand Commitments

- Name: "The Patio Bella" / "Patio Bella". The posted tagline/hashtag is
  "Where we all come together".
- Logo: a gold brush-stroke ring around a serif "Patio" with "BELLA" set
  beneath (`public/images/patio-bella/brand/`; only 447 px JPGs exist, and an
  SVG is needed).
- Voice in posts: warm, playful, emoji-friendly, about sharing ("Good food,
  beautiful plates, and flavours worth slowing down for").

## Evidence on Hand

Verified from the restaurant's own posts:

- **Arena Mall, Nsambya**: deliveries and reservations on 0775 852 656.
- **Lugogo Mall**: RSVP 0794 299 074; map pin "Patio Bella Lugogo Mall,
  8JG4+JR Kampala", near Kyadondo Rugby Grounds. The opening graphic states
  hours of 7:00am–midnight; this is **unconfirmed and not to be shown**.
- Weekly programmes (confirmed by the user):
  - **Henna Fridays** at Patio Bella: "Come through for your favourite meal and
    enjoy complimentary henna on us." Buy a meal, get your henna free.
  - **Catching Sunsets at Bella**, every Sunday at Arena Mall, Nsambya,
    featuring AHundred and Fifi: "good music, golden skies, and even better
    vibes." Buy a cocktail, get one free. RSVP 0775 852 656 (poster:
    `public/images/patio-bella/video/catching-sunsets-poster.mp4`).
- Full menu with prices: `src/content/menu.ts`, transcribed from the posted
  menu photos.
- High-resolution Arena Mall photographs supplied by the user:
  `interior/arena-canopy-dining-hq.jpg` (hero), `interior/arena-bar-hq.jpg`,
  `people-and-events/arena-sunset-dinner.jpg`.
- Named dishes and drinks from posts and menu photos: e.g. Bella Burger,
  Chapati Royale combo, Chicken & Eggs Benedict, blueberry cheesecake,
  sangria, nojitos.
- Photography and video: 109 assets, catalogued in
  `docs/PATIO-BELLA-ASSET-INVENTORY.md`.

Absent, and never to be invented: reviews, testimonials, ratings, awards,
press, founding story, chef names, opening hours, booking widgets and social
follower counts.

## Product Principles

1. Two places, one table: every section serves both locations, with Lugogo
   given slight extra emphasis as the new branch.
2. The real restaurant is the proof: show actual rooms, dishes, people and
   rituals from the posts, never generic hospitality imagery or invented claims.
3. One clear action: everything leads to calling a location to reserve.
4. Phone first: most visitors come from Instagram on a phone.

## Accessibility & Inclusion

Content must stay readable without JavaScript and with reduced motion
(established in `docs/MOTION.md`). Phone numbers must be real `tel:` links.
Text must meet WCAG AA contrast, including over photography.
