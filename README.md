# Isaac Garee academic website

This is a lightweight GitHub Pages academic website adapted from the structure of `mraoaakash/academic-website-template`.

## Edit content

Most content lives in JSON files:

- `content/site.json` — name, bio, contact, links, navigation
- `content/projects.json` — research project cards
- `content/news.json` — news feed
- `content/cv.json` — CV sections
- `content/publications.json` — research outputs / future publications

Images and PDFs live in `assets/`.

## Preview locally

Because the site loads JSON files, do not open `index.html` directly as a `file://` URL. Run a local server instead:

```bash
python3 -m http.server 9100
```

Then open:

```text
http://localhost:9100
```

## Deploy

Upload the contents of this folder to the root of the `isgaree.github.io` repository.

Make sure these paths exist at the repository root:

```text
index.html
content/site.json
site/styles.css
assets/images/profile.jpg
pages/projects.html
pages/cv.html
```

GitHub Pages should be set to deploy from:

```text
Branch: main
Folder: /root
```
