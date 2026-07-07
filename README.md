# pdf-lib-table tester

**Live site → [pdf-lib-table.com](https://www.pdf-lib-table.com/)**

An interactive playground for [pdf-lib-table](https://github.com/nashtheflash/pdf-lib-table), a table add-on for [pdf-lib](https://pdf-lib.js.org/). Tweak any table setting in the browser and watch the PDF re-render live — no install required.

## What you can do

- **Live preview** — every option in pdf-lib-table (positioning, dividers, borders, headers, rows, cells, subheadings) is exposed as a form field, and the rendered PDF updates as you type
- **Examples** — start from single-page, multi-page, and subheading tables with realistic data
- **Copy your config** — one click copies a ready-to-paste `createPDFTables` configuration matching exactly what you see
- **Documentation** — the full options reference, mirrored from the package README

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Developing against a local pdf-lib-table

The site consumes the published npm package. To hack on the package and see changes live, link it with [yalc](https://github.com/wclr/yalc):

```bash
# in your pdf-lib-table checkout - watches and pushes on save
npm run dev

# in this repo, in a second terminal
npm run dev
```

Pushed changes hot-reload (the Next config un-manages `node_modules` in dev for this reason). Before deploying, restore the npm dependency:

```bash
yalc remove pdf-lib-table && npm install
```

## Built with

[Next.js](https://nextjs.org/) · [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) · [pdf-lib](https://pdf-lib.js.org/) · [MDX](https://mdxjs.com/)

---

If pdf-lib-table saves you some time, you can [buy me a coffee](https://www.buymeacoffee.com/nashbrowns) ☕
