## 2025-03-28 - Missing ARIA label on search input
**Learning:** Found that the global search input in the BottomDock navigation lacked an `aria-label`, making it difficult for screen reader users to identify the purpose of the input field.
**Action:** Added an `aria-label` using the localized placeholder text to ensure the search input is properly announced by screen readers.
