# Design Improvement Plan — Issue Tracker

## Overview

Upgrade the issue tracker UI with:
- **Tailwind CSS v4** replacing the hand-written `globals.css`
- **Dark mode** that follows the OS preference (`prefers-color-scheme`)
- **Lucide React icons** for column headers and actions

No new features, no structural changes to the app — purely visual.

---

## Packages to Install

```bash
npm install tailwindcss @tailwindcss/postcss lucide-react
```

| Package | Purpose |
|---|---|
| `tailwindcss` | Utility-first CSS framework (v4) |
| `@tailwindcss/postcss` | PostCSS plugin required by Tailwind v4 |
| `lucide-react` | Icon library — lightweight, tree-shakeable, React-native |

---

## Files to Create / Modify

| File | Action | What changes |
|---|---|---|
| `postcss.config.mjs` | **Create** | Wires up `@tailwindcss/postcss` |
| `app/globals.css` | **Rewrite** | Replace all hand-written CSS with `@import "tailwindcss"` |
| `app/layout.tsx` | **Update** | Add background + text color classes to `<body>` |
| `app/page.tsx` | **Update** | Replace `.app` class with Tailwind layout classes |
| `components/Board.tsx` | **Update** | Tailwind classes on form, input, button; add `Plus` icon |
| `components/Column.tsx` | **Update** | Tailwind classes; add status icon + colored left-border accent |
| `components/IssueCard.tsx` | **Update** | Tailwind classes; add `GripVertical` drag-hint icon |

No changes to `lib/` (store, types) or any API routes.

---

## Color Design Tokens

Tailwind's `dark:` variant uses `prefers-color-scheme: dark` automatically in v4 — no JavaScript toggle needed.

| Role | Light | Dark |
|---|---|---|
| Page background | `gray-100` | `gray-950` |
| Column surface | `white` | `gray-900` |
| Card surface | `gray-50` | `gray-800` |
| Borders | `gray-200` | `gray-700` |
| Body text | `gray-900` | `gray-100` |
| Muted text | `gray-500` | `gray-400` |
| Drag-over highlight | `ring-2 ring-blue-400` | same |

---

## Column Status Accents & Icons

Each column gets a colored `border-l-4` (left border) and an icon in its header.

| Column | Icon | Accent color |
|---|---|---|
| Backlog | `Inbox` | `slate-400` |
| Todo | `Circle` | `blue-400` |
| In Progress | `Timer` | `amber-400` |
| Done | `CircleCheck` | `green-400` |

---

## Component-Level Changes

### `Board.tsx`
- Input: rounded, focus ring, dark-mode background/border
- Add button: solid blue, `Plus` icon, hover + disabled states

```
Before:  [ Add a new issue...          ] [ Add ]
After:   [ Add a new issue...          ] [+ Add]  ← blue button
```

### `Column.tsx`
- Left accent border (color per status)
- Header: status icon + label + count
- Drag-over: blue ring instead of blue border-color swap

```
Before:  | BACKLOG  0 |
After:   |▌ ⬜ Backlog  0 |   ← slate left border + Inbox icon
         |▌ 🔵 Todo     1 |   ← blue left border + Circle icon
         |▌ 🟡 In Prog  1 |   ← amber left border + Timer icon
         |▌ 🟢 Done     1 |   ← green left border + CircleCheck icon
```

### `IssueCard.tsx`
- Subtle shadow (`shadow-sm`) + hover lift (`hover:shadow-md`)
- `GripVertical` icon on the left as a visual drag hint
- Dragging state: `opacity-50` + blue ring outline
- Select: inherits dark-mode colors (currently looks broken in dark OS themes)

```
Before:  ┌─────────────────┐
         │ Write API routes │
         │ [todo         ▼] │
         └─────────────────┘

After:   ┌─────────────────┐
         │ ⠿ Write API routes│  ← grip icon
         │ [todo         ▼] │  ← themed select
         └─────────────────┘
```

---

## Visual Comparison

### Light Mode
```
┌─────────────────────────────────────────────────────────────────┐
│  bg-gray-100                                                    │
│                                                                 │
│  Issues                                                         │
│  ┌──────────────────────────────────┐  ┌──────────────┐        │
│  │  Add a new issue...              │  │  + Add       │        │
│  └──────────────────────────────────┘  └──────────────┘        │
│           white bg / gray-200 border      blue bg / white text  │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────┐ │
│  │▌ ⬜ Backlog 0│ │▌🔵 Todo    1│ │▌🟡 In Prog 1│ │▌🟢Done│ │
│  │  (slate)     │ │  (blue)      │ │  (amber)     │ │ (green)│ │
│  │              │ │ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌────┐ │ │
│  │  No issues   │ │ │⠿ Write.. │ │ │ │⠿ Design..│ │ │ │⠿Set│ │ │
│  │              │ │ │ [todo ▼] │ │ │ │ [in_p ▼] │ │ │ │[▼] │ │ │
│  │              │ │ └──────────┘ │ │ └──────────┘ │ │ └────┘ │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Dark Mode (auto, follows OS)
```
╔═════════════════════════════════════════════════════════════════╗
║  bg-gray-950                                                    ║
║                                                                 ║
║  Issues                                                         ║
║  ┌──────────────────────────────────┐  ┌──────────────┐        ║
║  │  Add a new issue...              │  │  + Add       │        ║
║  └──────────────────────────────────┘  └──────────────┘        ║
║           gray-800 bg / gray-600 border   blue bg / white text  ║
║                                                                 ║
║  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────┐ ║
║  │▌ ⬜ Backlog 0│ │▌🔵 Todo    1│ │▌🟡 In Prog 1│ │▌🟢Done│ ║
║  │  (slate)     │ │  (blue)      │ │  (amber)     │ │ (green)│ ║
║  │  gray-900 bg │ │ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌────┐ │ ║
║  │  No issues   │ │ │⠿ Write.. │ │ │ │⠿ Design..│ │ │ │⠿Set│ │ ║
║  │  gray-600    │ │ │ [todo ▼] │ │ │ │ [in_p ▼] │ │ │ │[▼] │ │ ║
║  │              │ │ └──────────┘ │ │ └──────────┘ │ │ └────┘ │ ║
║  └──────────────┘ └──────────────┘ └──────────────┘ └────────┘ ║
║    card bg: gray-800  border: gray-700                          ║
╚═════════════════════════════════════════════════════════════════╝
```

---

## What Does NOT Change

- All drag-and-drop logic (`@dnd-kit`)
- All API routes and data layer
- Component structure and props
- `lib/types.ts` and `lib/store.ts`
- The `@/` path alias

---

## Review Checklist

- [ ] Package choices approved (`lucide-react`, Tailwind v4)
- [ ] Dark mode via OS preference is acceptable (vs. manual toggle)
- [ ] Column accent colors approved (slate / blue / amber / green)
- [ ] Icon choices approved (Inbox / Circle / Timer / CircleCheck)
- [ ] Grip icon on cards is desired
- [ ] Blue CTA for the Add button is acceptable
