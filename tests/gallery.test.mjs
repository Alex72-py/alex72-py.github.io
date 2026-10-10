import test from "node:test";
import assert from "node:assert/strict";
import { selectFeaturedIndices } from "../client/src/lib/gallery.mjs";

const gallery = ["ai", "alya", "aqua", "marin", "zero-two"].map((id) => ({
  id,
}));
test("keeps requested hero drawings after reordering", () => {
  const reordered = [...gallery].reverse();
  const indices = selectFeaturedIndices(reordered, ["ai", "aqua"]);
  assert.deepEqual(
    indices.map((i) => reordered[i].id),
    ["ai", "aqua"],
  );
});
test("replaces a removed featured drawing without duplicates", () => {
  const remaining = gallery.filter((piece) => piece.id !== "ai");
  assert.deepEqual(selectFeaturedIndices(remaining, ["ai", "aqua"]), [1, 0]);
});
test("handles one artwork and duplicate preferences", () => {
  assert.deepEqual(selectFeaturedIndices([{ id: "ai" }], ["ai", "ai"]), [0]);
});
test("handles an empty gallery", () => {
  assert.deepEqual(selectFeaturedIndices([], ["ai", "aqua"]), []);
});
test("selects two fallbacks when both preferred drawings are removed", () => {
  assert.deepEqual(
    selectFeaturedIndices(gallery.slice(3), ["ai", "aqua"]),
    [0, 1],
  );
});
