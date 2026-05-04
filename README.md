# Project 2 Copy: Giga Pet DevTools Lab

This folder is a copy of Project 2 with practical examples from the Chrome DevTools Console and Sources demos added directly into the app.

Original project URL from the previous README:
https://lod12321.github.io/comp484-project2/

## Added DevTools Examples

- Message logging: info, warning, error, table, group, and custom styled console messages.
- Browser messages: a missing fetch request for a 404 network error, an intentional TypeError, and a long click handler for a violation warning.
- Console filters: seeded messages for filtering by log level, text, regular expression, message source, and user messages.
- Sources debugging: a reproducible string-concatenation bug, breakpoint-friendly code, variable inspection, Scope pane and Watch expression practice, Console drawer fix testing, and an app button that applies the numeric conversion fix.

## Files

- `index.html` contains the original pet dashboard plus the DevTools Lab controls.
- `style.css` updates the layout and responsive visual design.
- `script.js` contains the console examples and debugging functions using browser-native DOM APIs.
- `assets/devtools-implementation-report.pdf` describes the implementation and includes screenshots.

## Local Testing

Run the included local server from this folder so the 404 fetch example logs as a network request:

```bash
node local-server.js
```

Then open `http://localhost:8080` in Chrome and open DevTools with `Control+Shift+J`.

## Documentation Reviewed

- Chrome DevTools Console logging tutorial: https://developer.chrome.com/docs/devtools/console/log/
- Chrome DevTools JavaScript debugging tutorial: https://developer.chrome.com/docs/devtools/javascript/
