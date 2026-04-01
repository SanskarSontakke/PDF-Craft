## 2024-05-18 - Missing ARIA on Custom Dialogs
**Learning:** Custom UI modal panels (like the Search panel in the Bottom Dock) built with generic `div` containers are opaque to screen readers unless explicitly marked with `role="dialog"` and `aria-modal="true"`. Furthermore, icon-only dismiss buttons in these custom dialogs often lack accessible names, confusing keyboard/screen reader users.
**Action:** When implementing custom modal or bottom-sheet UI elements, always ensure the container has `role="dialog"` (or `alertdialog`), `aria-modal="true"`, and an `aria-label` or `aria-labelledby`, and ensure all interactive elements within have clear accessible names (e.g., `aria-label="Close"` on icon buttons).

## 2024-05-18 - Interactive Divs and Hardcoded Colors
**Learning:** Interactive `div` elements used for modals/previews lack keyboard focus by default, excluding keyboard-only users. Additionally, hardcoded light-theme colors (e.g., `bg-red-100`) cause severe contrast issues in the default dark-theme environment.
**Action:** Always use semantic `<button>` elements for clickable actions to ensure automatic keyboard accessibility. Always use CSS variables (like `hsl(var(--color-destructive))`) for hover states to respect the active theme.

## 2025-02-14 - Nested Buttons inside Links in Next.js
**Learning:** Found a critical accessibility issue where `<Button>` components (rendering as `<button>`) were nested inside Next.js `<Link>` elements. This creates invalid HTML (`<a><button>...</button></a>`) and creates double focus rings for screen readers and keyboard users.
**Action:** Implemented `asChild` pattern using `@radix-ui/react-slot` in the `Button` component, allowing the button styles and semantics to cleanly merge into the `Link` element without breaking HTML rules. Added `focus-visible:ring-offset-[hsl(var(--color-background))]` to make focus rings accessible.

## 2025-02-14 - Keyboard Accessibility for Non-Native Interactive Elements
**Learning:** Setting `tabIndex={0}` and `role="button"` on a non-native interactive element (like a `div`) makes it focusable and recognizable to screen readers, but it does not inherently make it accessible via the keyboard (e.g., triggering actions with the 'Enter' or 'Space' keys). This means keyboard-only users can navigate to the element but cannot interact with it.
**Action:** Always implement an `onKeyDown` handler for non-native interactive elements to listen for 'Enter' and 'Space' key presses, trigger the intended action (e.g., `onClick`), and prevent the default browser scroll behavior for 'Space' when the element is activated.
