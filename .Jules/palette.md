## 2024-05-18 - Missing ARIA on Custom Dialogs
**Learning:** Custom UI modal panels (like the Search panel in the Bottom Dock) built with generic `div` containers are opaque to screen readers unless explicitly marked with `role="dialog"` and `aria-modal="true"`. Furthermore, icon-only dismiss buttons in these custom dialogs often lack accessible names, confusing keyboard/screen reader users.
**Action:** When implementing custom modal or bottom-sheet UI elements, always ensure the container has `role="dialog"` (or `alertdialog`), `aria-modal="true"`, and an `aria-label` or `aria-labelledby`, and ensure all interactive elements within have clear accessible names (e.g., `aria-label="Close"` on icon buttons).

## 2024-05-18 - Interactive Divs and Hardcoded Colors
**Learning:** Interactive `div` elements used for modals/previews lack keyboard focus by default, excluding keyboard-only users. Additionally, hardcoded light-theme colors (e.g., `bg-red-100`) cause severe contrast issues in the default dark-theme environment.
**Action:** Always use semantic `<button>` elements for clickable actions to ensure automatic keyboard accessibility. Always use CSS variables (like `hsl(var(--color-destructive))`) for hover states to respect the active theme.
