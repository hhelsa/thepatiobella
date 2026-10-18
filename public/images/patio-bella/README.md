# The Patio Bella photos

Real photography for the website, collected from The Patio Bella's Instagram.

## Where to put photos

Upload every photo, unsorted, into **`_incoming/`**. You do not need to sort
or rename anything.

Claude then reviews each photo and proposes where it belongs. Nothing is moved
or renamed until you approve. Moving a file keeps it byte-for-byte identical.

| Folder | Contents |
| --- | --- |
| `_incoming/` | Uploads waiting to be reviewed |
| `food/` | Plated dishes, close-ups, food on the table |
| `drinks/` | Cocktails, coffee, juices, bar shots |
| `interior/` | Dining room, seating, décor, bar, details |
| `views-and-atmosphere/` | The view, sunsets, terrace, ambience, evening light |
| `other/` | People, events, signage, promotions, anything else |

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
public/images/patio-bella/food/lemon-penne.jpg
```

is available at `/images/patio-bella/food/lemon-penne.jpg`. Components render
them with Next.js `<Image>`, which serves resized, modern-format versions for
each screen size and lazy-loads images below the fold:

```tsx
import Image from "next/image";

<Image
  src="/images/patio-bella/food/lemon-penne.jpg"
  alt="Lemon-zested penne with parmesan"
  width={1080}
  height={1350}
  sizes="(min-width: 1024px) 50vw, 100vw"
/>
```

Filenames are lowercase-with-hyphens and describe the subject
(e.g. `sunset-terrace-wide.jpg`), so code and alt text stay readable. The
review of every photo, and which ones are suggested for the homepage, is in
`docs/PATIO-BELLA-ASSET-INVENTORY.md` (created once photos are uploaded).
