---
name: code-reviewer
description: Review code changes in this project. Use when asked to review code, check a diff, audit changes, or give feedback on a PR or file.
---

Review the staged diff (or a specific file) for bugs, clarity issues, and anything that doesn't match the project's conventions.

## What to review

Run this to see what changed:

```bash
git diff HEAD          # unstaged changes
git diff --cached      # staged changes
git diff main...HEAD   # all changes on current branch vs main
```

Or review a specific file:

```bash
git diff main...HEAD -- <path/to/file.tsx>
```

## Review checklist

For each changed file, check:

1. **Bugs** — off-by-one errors, missing awaits, unchecked nulls, wrong types
2. **Next.js / React conventions** — server vs client components, missing `"use client"`, route param must be `await`ed (Next.js 15)
3. **Store mutations** — changes to `lib/store.ts` should keep the singleton pattern (`globalThis.__issueStore`)
4. **API routes** — params typed as `Promise<{...}>` and `await`ed before use
5. **Drag-and-drop** — `e.stopPropagation()` on `onPointerDown` inside sortable items to prevent sensor conflicts
6. **Types** — no use of `any`; new shapes should go in `lib/types.ts`

## Output format

Report findings as:

```
FILE: <path>
LINE: <number>
ISSUE: <one sentence — what's wrong>
FIX: <one sentence — what to do instead>
```

Skip files with no issues. End with a one-line summary: "N issues found" or "Looks good."
