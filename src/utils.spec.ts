import { merge } from "./utils";

describe("merge", () => {
  test("Can work like Object.assign", () => {
    expect(merge({ a: 1, b: 2 }, { b: 3, c: 4 })).toStrictEqual({
      a: 1,
      b: 3,
      c: 4,
    });
  });

  test("Recursively merges objects", () => {
    expect(
      merge(
        { a: 1, b: { c: 2, d: 4, e: { f: 2, g: 3 } } },
        { b: { c: 3, e: { f: 32, h: 2 } } }
      )
    ).toStrictEqual({
      a: 1,
      b: {
        c: 3,
        d: 4,
        e: {
          f: 32,
          g: 3,
          h: 2,
        },
      },
    });
  });

  test("Clones arrays", () => {
    let target = { a: [] };
    const source = { a: ["b", "c"] };
    merge(target, source);
    expect(target.a).toStrictEqual(source.a);
    expect(target.a === source.a).toBe(false);
  });
});
