# Base64 Encode / Decode

Route: `/tools/base64`

Base64 Encode / Decode converts text to and from Base64 entirely in the browser. It is intended for quick developer workflows where payload snippets, tokens, or config values should not be pasted into third-party tools.

## Features

- Encode plain text to Base64.
- Decode Base64 back to UTF-8 text.
- Supports Unicode input through `TextEncoder` and `TextDecoder`.
- Accepts whitespace in encoded input and common URL-safe Base64 characters (`-` and `_`).
- Shows friendly validation errors for malformed Base64.
- Copy, swap, and clear actions without uploads, telemetry, backend calls, or persistent storage.

## Conversion Approach

Input text is converted to UTF-8 bytes with the browser `TextEncoder` API before `btoa` encodes the byte string. Decode mode normalizes whitespace and URL-safe characters, decodes with `atob`, then converts bytes back to UTF-8 with `TextDecoder`.

## Limitations

- This tool is text-only; it does not encode files or arbitrary binary uploads.
- Base64 is reversible encoding, not encryption. Do not treat encoded values as secrets.
- Invalid Base64 and non-UTF-8 decoded bytes are rejected with an error message.
