## 2026-04-01 - Incomplete Keyboard Accessibility on Custom "Button" Roles
**Learning:** Adding `role="button"` and `tabIndex={0}` to generic containers (like `Card` components) is not enough for full accessibility. While it makes the element focusable and readable by screen readers as a button, it fails to map the `Enter` and `Space` keys to the `onClick` handler, creating a broken experience for keyboard-only users.
**Action:** Always complement `role="button"` on non-native interactive elements with an `onKeyDown` handler. Ensure `Enter` and `Space` keys trigger the click action, and specifically use `e.preventDefault()` on `Space` to prevent unwanted page scrolling.

## 2024-05-18 - Missing ARIA on Custom Dialogs
**Learning:** Custom UI modal panels (like the Search panel in the Bottom Dock) built with generic `div` containers are opaque to screen readers unless explicitly marked with `role="dialog"` and `aria-modal="true"`. Furthermore, icon-only dismiss buttons in these custom dialogs often lack accessible names, confusing keyboard/screen reader users.
**Action:** When implementing custom modal or bottom-sheet UI elements, always ensure the container has `role="dialog"` (or `alertdialog`), `aria-modal="true"`, and an `aria-label` or `aria-labelledby`, and ensure all interactive elements within have clear accessible names (e.g., `aria-label="Close"` on icon buttons).

## 2024-05-18 - Interactive Divs and Hardcoded Colors
**Learning:** Interactive `div` elements used for modals/previews lack keyboard focus by default, excluding keyboard-only users. Additionally, hardcoded light-theme colors (e.g., `bg-red-100`) cause severe contrast issues in the default dark-theme environment.
**Action:** Always use semantic `<button>` elements for clickable actions to ensure automatic keyboard accessibility. Always use CSS variables (like `hsl(var(--color-destructive))`) for hover states to respect the active theme.

## 2025-02-14 - Nested Buttons inside Links in Next.js
**Learning:** Found a critical accessibility issue where `<Button>` components (rendering as `<button>`) were nested inside Next.js `<Link>` elements. This creates invalid HTML (`<a><button>...</button></a>`) and creates double focus rings for screen readers and keyboard users.
**Action:** Implemented `asChild` pattern using `@radix-ui/react-slot` in the `Button` component, allowing the button styles and semantics to cleanly merge into the `Link` element without breaking HTML rules. Added `focus-visible:ring-offset-[hsl(var(--color-background))]` to make focus rings accessible.
## 2026-04-01 - Accessible Interactive Divs
**Learning:** When making a non-native element like a `div` interactive (e.g., adding `tabIndex` and `role="button"`), it doesn't automatically trigger `onClick` handlers via keyboard. Keyboard users expect 'Enter' and 'Space' to activate buttons.
**Action:** Always add an `onKeyDown` handler to trigger the `onClick` action for `Enter` and `Space` keys when creating custom interactive components from standard block elements.
## 2023-10-27 - Custom File Drop Zone Accessibility
**Learning:** Using `display: none` (`hidden` in Tailwind) on an `<input type="file">` within a custom drop zone makes it completely inaccessible to screen readers and keyboard users.
**Action:** Always use `.sr-only` instead of `.hidden` for the hidden file input, add `tabIndex={-1}`, and ensure the parent container visually indicates focus by using `focus-within:ring-2` (and related focus-within styles).
