# Dogmatix Log

A private devlog of the **D2 Controls / Dogmatix** workspace - what gets built, what breaks,
and every question asked of the agent along the way.

**Read it here: <https://jovanxin.github.io/dogmatix-blog/>** - password required.

---

## There is nothing readable in this repository

Every page is encrypted with **AES-256** ([StatiCrypt](https://github.com/robinmoisson/staticrypt))
*before* it is committed. What you can see here is ciphertext and a password prompt.

- The **password is not in this repository**, in its history, or in any commit message.
- The **plaintext sources are not in this repository** either - they live only on the author's
  machine, in a directory excluded from git.
- Session-log content passes through a **redaction pass** (GitHub tokens, API keys, JWTs, long
  hex/base64 blobs, `key=value` secrets and e-mail addresses) before it is written.

Be clear about what that does and does not buy: **the content is private, the site's existence
is not.** Anyone can see that a blog exists and count its pages. Nobody can read a word of it
without the password.

## What is in here

| Path | Encrypted | Notes |
|---|---|---|
| `index.html`, `about.html`, `archive.html`, `journal.html`, `questions.html`, `workspace.html`, `404.html` | **yes** | StatiCrypt gate + AES-256 payload |
| `posts/*.html` | **yes** | 16 posts |
| `assets/style.css`, `assets/blog.js` | no | presentation only, contains no site content |
| `README.md` | no | this file |

## How it is published

Everything happens locally, and only the encrypted output is committed:

```text
harvest workspace  ->  build plaintext site  ->  check internal links
                   ->  encrypt (AES-256)     ->  verify no plaintext  ->  commit + push
```

Two assertions run on every publish and block the push if either fails: a canary phrase that
exists only in the plaintext must be **absent** from every published file, and **every internal
link** must resolve.

## Reading it

1. Open <https://jovanxin.github.io/dogmatix-blog/>
2. Enter the password.
3. Tick **Keep me unlocked for 30 days** to avoid retyping it on every page.

There is no password recovery. The ciphertext is the only copy of the content that leaves the
author's machine.
