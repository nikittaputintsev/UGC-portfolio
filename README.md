# Nikitta Putintsev — UGC Portfolio

Static single-page site built from the `project/design_handoff_ugc_portfolio` design handoff
(see that folder's `README.md` and `chats/chat1.md` for full spec and history).

## Run locally
Any static file server works, e.g.:
```
python3 -m http.server 8000
```
then open `http://localhost:8000/`.

## Videos
All three cards play Vimeo embeds, not local files. Each `.video-frame`'s player holds a
`<div class="video-player__embed" data-vimeo-id="...">`; `script.js` builds a
`player.vimeo.com/video/{id}?autoplay=1&title=0&byline=0&portrait=0` iframe into it on cover
click, and empties it on close (which actually stops playback, not just hides it). Current IDs:
- Card 1, "Dictating instead of typing" (Wispr Flow): `1224346945`
- Card 2, "Electrolytes, honestly" (Santa Cruz Paleo): `1224347449`
- Card 3, "A walk and a rant about AI" (Wispr Flow): `1224341003`

To swap any of them, change the `data-vimeo-id` value in `index.html` — no JS changes needed.
The `videos/` folder is unused now but left in place in case you switch a card back to a
self-hosted MP4 later (the same `openFrame`/`closeFrame` logic in `script.js` still supports a
plain `<video>` element as an alternative to the embed div).

**Vimeo privacy setting**: each video's "Where can this be embedded" setting must allow it
(anywhere, or your future domain) or the player shows a blocked icon instead of playing.

## Video covers
Each `.video-cover` button has a plain `<img>` pointing at a local file in `images/`:
- Card 1 (Dictating instead of typing): `images/video-1-cover.png`
- Card 2 (Electrolytes, honestly): `images/video-2-cover.png`
- Card 3 (A walk and a rant about AI): `images/video-3-cover.png`

These are manually-chosen screenshots, not auto-generated — an earlier version pulled a live
thumbnail from vumbnail.com (an unofficial Vimeo-thumbnail service) keyed by video ID, but
Vimeo's own auto-thumbnail is a landscape-ish crop even for vertical video, so it looked
heavily zoomed once stretched into the 9:16 card. Swap these files directly (keep the same
filenames, or update the `src` in `index.html`) to change a cover.

The images are currently large, uncompressed PNGs (0.8–2.3MB each, screenshots straight off a
phone) — worth running through a compressor (TinyPNG, Squoosh, etc.) before or after going live
to cut page weight; nothing depends on them staying PNG or this exact file size.

## Still needed (flagged in the handoff, not resolved here)
- **Favicon / OG image / analytics**: not specified in the design, not added here.
- Name spelling was confirmed as **Putintsev** (matches the Instagram handle) — the original
  design file said "Putinsev".

## Note on the hero headline
The design's hero `<h1>` font-size uses a viewport-relative (`vw`) clamp, which is correct in
a single-column layout but overflows into the photo across most desktop widths once the hero
splits into two columns (the column is only ~half the viewport, but the font was still sized
off the full viewport). Fixed here by sizing off the column's own width via a CSS container
query (`container-type: inline-size` + `cqw` units in `styles.css`) instead of the viewport —
same visual scale, no overflow. A narrow residual (~640–768px viewport) can still wrap
"Putintsev" onto a third line via `overflow-wrap: break-word` as a safety net; it never spills
onto the photo.
