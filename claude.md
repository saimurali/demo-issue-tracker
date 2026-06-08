# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies (npm is used; README references bun but package-lock.json is present)
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit — no test suite or linter is configured
```

## Architecture

A minimal Next.js 15 (App Router) kanban board. All data lives in a single in-memory `IssueStore` and resets on server restart.

### Data layer (`lib/`)

- **`lib/types.ts`** — single source of truth for the `Issue` shape and the ordered `STATUSES` array (`backlog → todo → in_progress → done`). Both the API and the frontend import from here.
- **`lib/store.ts`** — singleton `IssueStore` backed by a `Map<string, Issue>`. Exported as `store`. To survive Next.js hot-reloads without re-seeding, the instance is pinned to `globalThis.__issueStore` in development. Moving an issue to a new column without supplying `order` appends it at the end (`nextOrder` scans existing items in that column).

### API routes (`app/api/`)

Three route files map directly to the REST surface documented in `README.md`. Route params are typed as `Promise<{...}>` — the Next.js 15 convention — so they must be `await`ed before use.

### Frontend (`components/`)

- **`Board.tsx`** — the only stateful client component. Owns the full `issues` array in `useState`, drives all API calls via a local `api<T>()` helper, and hosts the `@dnd-kit/core` `DndContext`.
  - `handleDragOver`: optimistic cross-column move — updates local state immediately so the card visually follows the cursor.
  - `handleDragEnd`: computes final column order with `arrayMove`, updates local state, then persists via `PUT /api/columns/:status/reorder`.
- **`Column.tsx`** — droppable zone (`useDroppable`) wrapping a `SortableContext`.
- **`IssueCard.tsx`** — sortable drag handle (`useSortable`). The inline status `<select>` calls `e.stopPropagation()` on `onPointerDown` to prevent the drag sensor from firing when the user opens the dropdown.

### Path alias

`@/` resolves to the project root (configured in `tsconfig.json`).
