---
name: nextjs-errors
description: Run the project with npm and collect all Next.js errors — compilation errors, type errors, runtime errors, and console errors. Use when asked to find errors, check for issues, or validate the build.
---

Runs the project three ways and collects all errors: type check, build compile, and dev server startup.

## Step 1 — Type errors

```bash
cd /Users/saimurali/Documents/demo-issue-tracker
npm run typecheck 2>&1
```

Captures TypeScript errors without running anything. Fast. Run this first.

## Step 2 — Build errors

```bash
cd /Users/saimurali/Documents/demo-issue-tracker
npm run build 2>&1 | grep -E "(error|Error|warning|Warning|Failed|failed|✓|✗|⨯)" | head -60
```

Catches compilation errors, missing modules, and invalid JSX that only surface at build time.

## Step 3 — Dev server startup errors

Kill any existing dev server first, then start fresh and capture the first 30 seconds of output:

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; sleep 1
npm run dev > /tmp/nextjs-dev.log 2>&1 &
echo $! > /tmp/nextjs-dev.pid
sleep 20
kill $(cat /tmp/nextjs-dev.pid) 2>/dev/null
grep -E "(error|Error|warn|Warning|failed|Failed|✗|⨯|SyntaxError|TypeError|ReferenceError)" /tmp/nextjs-dev.log | grep -v "node_modules"
```

This catches runtime errors, missing env vars, and middleware failures that only appear when the server actually starts.

## Full log

If you need the complete unfiltered dev server output:

```bash
cat /tmp/nextjs-dev.log
```

## What to report

For each error found, report:
- **Source**: typecheck / build / dev-server
- **File and line** (if shown)
- **Error message** (exact text)
- **Severity**: error (blocks build/start) or warning (degrades at runtime)

Ignore errors inside `node_modules/`. Ignore Next.js telemetry messages.
