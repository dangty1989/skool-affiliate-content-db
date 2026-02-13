# Event Handler Development Guidelines

## Reading Markdown Files

Always use `render_md` when reading `.md` files from `operating_system/`. Never use raw `fs.readFileSync` for markdown — `render_md` resolves `{{filepath}}` includes that markdown files may contain.

```js
const { render_md } = require('./utils/render-md');
const content = render_md(path.join(__dirname, '..', 'operating_system', 'SOME_FILE.md'));
```

This applies to any markdown file loaded as a prompt or system message (CHATBOT.md, JOB_SUMMARY.md, etc.).
