# 💙 Kannadi Birthday Website

A private, static, mobile-first birthday gift website.

## 1. Personalize it

Open **config.js**.

Everything you normally need to change is in that one file:

- Her name / nickname
- Opening text
- Reveal text
- Memories
- Photo paths
- Gallery captions
- Heartfelt message
- Final message
- Music link
- Main blue colors

### Adding photos

Put your photos inside:

`images/`

Then change a placeholder such as:

`image: ""`

to:

`image: "images/our-photo.jpg"`

You can use JPG, PNG, or WebP.

For best mobile loading, resize very large photos before uploading them. Around 1200–1600px wide is usually plenty.

## 2. Test it

You can simply double-click `index.html` and open it in a browser.

If your browser blocks anything locally, run a tiny local server:

### Python
```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## 3. Put it online for free

### Option A — GitHub Pages
1. Create a GitHub account.
2. Create a new repository.
3. Upload `index.html`, `style.css`, `script.js`, `config.js`, and the `images` folder.
4. Open the repository's **Settings → Pages**.
5. Choose **Deploy from a branch** and select the main branch.
6. GitHub will give you a public HTTPS link.

### Option B — Netlify
1. Create a Netlify account.
2. Use its option to deploy a site by uploading the website folder/ZIP.
3. Netlify generates an HTTPS link automatically.

### Privacy/discretion note
A normal static website link is public to anyone who has the URL. It isn't automatically password-protected.

For a truly private gift, use a hosting service's password/access-control feature if available, or choose a host that supports it. Also avoid putting private photos or sensitive information in a publicly accessible folder if you don't want them discoverable.

## Music

The default button opens a search for Harris J — Hayati on YouTube rather than bundling copyrighted audio into the website.

You can replace `musicUrl` in `config.js` with the official song page on YouTube, Spotify, Apple Music, etc.

## Files

- `index.html` — page structure
- `style.css` — design/animations
- `script.js` — interactions
- `config.js` — ⭐ edit this first
- `images/` — put your photos here
