# Learning Hub – JupyterLite

JupyterLite/Pyodide is built by GitHub Actions into `public/jupyterlite/` on pushes to
`main` which change notebook files or the JupyterLite workflow.

The site exposes an allowlisted Next.js route:

`/courses/data-analytics/notebooks/<notebook-file.ipynb>`

Its iframe opens the corresponding preloaded notebook using:

`/jupyterlite/lab/index.html?path=<notebook-file.ipynb>`

Keep notebook filenames in sync with `lib/notebooks.ts`.

The GitHub Actions workflow commits the generated site files to `main`. These assets
are not hand-edited. Python execution is entirely client-side and can lazily download
additional packages over the internet. Python package support is limited by Pyodide.

To build locally, install Python 3.12 and:

```sh
python -m pip install -r jupyterlite/requirements.txt
jupyter lite build --contents content/data-analytics/notebooks --output-dir public/jupyterlite
npm run build
```

To publish a new notebook, commit the .ipynb, update the `lib/notebooks.ts` allowlist,
and let the workflow generate the static JupyterLite site.

If GitHub Actions cannot push generated files, review branch protection and the workflow
token's `contents: write` permission in the repository settings.
