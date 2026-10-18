# The Patio Bella photos

Real photography for the website, collected from The Patio Bella's Instagram.

## Where to put photos

Upload new photos, unsorted, into **`_incoming/`**. You do not need to sort
or rename anything.

Claude then reviews each photo and proposes a folder and descriptive name.
Nothing is moved or renamed until you approve, and moving a file keeps it
byte-for-byte identical. The first batch of 109 files has already been
sorted.

| Folder | Contents |
| --- | --- |
| `_incoming/` | Uploads waiting to be reviewed |
| `food/` | Plated dishes, close-ups, food on the table |
| `drinks/` | Cocktails, coffee, juices, bar shots |
| `interior/` | Dining room, seating, décor, bar, details |
| `views-and-atmosphere/` | The view, sunsets, terrace, ambience, evening light |
| `people-and-events/` | Guests, staff, chefs, henna and fun-day events |
| `brand/` | Logos |
| `video/` | Video clips (MP4) |
| `other/` | Promotional graphics and menus (reference only) |

### File requirements

- Use **JPG, PNG or WebP**. Browsers cannot display HEIC (the iPhone default),
  so export those as JPG first.
- Upload the largest version you have. The site resizes and compresses images
  automatically, so don't shrink them yourself.
- Avoid images with text, logos or price overlays baked in where a clean
  version exists. They can't be cropped or resized well.
- GitHub accepts up to 25 MB per file and 100 files per upload.

## How the website uses them

Files in `public/` are served from the site root, so

```
public/images/patio-bella/food/pizza-cheese-pull.jpg
```

is available at `/images/patio-bella/food/pizza-cheese-pull.jpg`. Components render
them with Next.js `<Image>`, which serves resized, modern-format versions for
each screen size and lazy-loads images below the fold:

```tsx
import Image from "next/image";

<Image
  src="/images/patio-bella/food/pizza-cheese-pull.jpg"
  alt="A slice of pizza lifted with stretching melted cheese"
  width={1170}
  height={1560}
  sizes="(min-width: 1024px) 50vw, 100vw"
/>
```

Filenames are lowercase-with-hyphens and describe the subject
(e.g. `arena-dining-city-view.jpg`), so code and alt text stay readable.
What every photo shows, its watermark/overlay status, the original upload
filename and which ones are suggested for the homepage are in
`docs/PATIO-BELLA-ASSET-INVENTORY.md`.
