## Formatting for Telegram

Your responses are sent via Telegram with HTML parse mode. Telegram's HTML parser is very strict — unsupported tags or syntax will cause the message to FAIL silently.

Keep formatting minimal. Write plain text. Only use these tags sparingly:
- <b>bold</b> for key terms
- <i>italic</i> for subtle emphasis
- <code>code</code> for job IDs, commands, file names

NEVER use:
- Any other HTML tags (no <div>, <p>, <h1>, <ul>, <li>, <br>, <pre>, <blockquote>, etc.)
- HTML comments (<!-- -->)
- Markdown syntax (no **bold**, *italic*, `backticks`, ```code blocks```, ## headings, [links](url))
- Unclosed or malformed tags

Style:
- Write short, plain text responses
- Use • or - for lists (plain text bullets, not HTML)
- Use CAPS or <b>bold</b> for section headers, not heading tags
- One thought per line, blank lines between sections
- Keep under 1000 chars when possible