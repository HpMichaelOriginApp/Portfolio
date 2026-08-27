# Michael Adenuga, Portfolio ("The Cut")

A single-page, dark, mobile-first portfolio. No build step, no dependencies, just three files. Hosts anywhere (Netlify, Vercel, GitHub Pages, Cloudflare Pages) or opens straight in a browser.

```
michael-portfolio/
├── index.html      ← page structure + copy
├── styles.css      ← all styling (one type system, one accent)
├── script.js       ← ★ EDIT HERE: video links, email, library
├── assets/         ← drop your media here
└── README.md
```

## The only file you edit: `script.js`

Everything you'll change day-to-day lives in the **CONFIG block at the top of `script.js`**.

### 1. Add tomorrow's videos (the "More Work" library)
Find the `MORE_WORK` array and paste one object per video:

```js
const MORE_WORK = [
  { youtubeId: "ABC123xyz", category: "Long Form",
    caption: "<b>Client, project</b>: what the edit accomplished." },
  { youtubeId: "DEF456uvw", category: "Short Form", vertical: true,
    caption: "<b>Client</b>: the outcome in one line." },
];
```

- `youtubeId` = the bit after `youtu.be/`, `watch?v=`, or `shorts/`.
- `category` = `"Long Form"` or `"Short Form"` (drives the filter chips).
- `vertical: true` for 9:16 shorts; omit for normal 16:9.
- The "More Work" section stays hidden until this array has at least one item, so no empty/dead section.

The three hero pieces live just above in the `FEATURED` array (same shape).

### 2. Change where the CTA sends people
The "Work with me" button opens an email. Edit the top of `script.js`:

```js
contactEmail: "olu@drcynthiacolon.com",   // ← change to Michael's inbox
```

> Currently set to the address on file. **Update this to Michael's preferred email before going live.**

## Replacing placeholders with real assets

The site works immediately, but two things use temporary stand-ins:

| What | Placeholder now | To upgrade |
|------|-----------------|-----------|
| **Hero showreel** | A still frame from *Giana* | Export an ~8s muted reel to `assets/showreel.mp4`, it autoplays full-bleed. |
| **Tile posters** | YouTube auto-thumbnails | Export a sharp frame per video to `assets/`, then set `poster: "assets/name.jpg"` on that item. |
| **About photo** | "MA" initials block | Add `assets/about.jpg` (portrait, ~4:5). |
| **Transformation "Raw"** | Labelled placeholder | Add a short raw clip and set `rawVideo:` in the `TRANSFORMATION` config. |

## YouTube setup (important for the "no leak" behaviour)
- Set each video to **Unlisted** (works in embeds, stays off the channel and out of search).
- The site never loads a YouTube iframe until a tile is clicked, so the grid is fast and viewers see *your* poster and play button, not YouTube chrome, until they commit to watching. On click it loads the privacy-domain embed (`youtube-nocookie.com`) with related videos limited to the channel.

## Accessibility & performance built in
- Respects `prefers-reduced-motion` (no autoplay drift / reveals if opted out).
- Real headings, alt text, keyboard-focusable play buttons, skip link, focus rings.
- Lazy-loaded posters; iframes only on click; preconnect to the video hosts.

## Deploy
Drag the `michael-portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or push to GitHub and enable Pages. No configuration needed.
