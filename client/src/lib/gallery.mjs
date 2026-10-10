/** Preserve preferred artwork IDs, then fall back to remaining pieces without duplicates. */
export function selectFeaturedIndices(gallery, preferredIds) {
  const selected = [];
  for (const id of preferredIds) {
    const index = gallery.findIndex((piece) => piece.id === id);
    if (index >= 0 && !selected.includes(index)) selected.push(index);
  }
  for (let index = 0; index < gallery.length && selected.length < 2; index++) {
    if (!selected.includes(index)) selected.push(index);
  }
  return selected.slice(0, 2);
}
