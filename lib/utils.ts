// Step 03 — Library Layer
// Tiny class-name joiner. It exists so we don't add clsx/tailwind-merge
// (zero extra dependencies). Used by every UI component.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}