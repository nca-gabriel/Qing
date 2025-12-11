import { shuffleQuestions } from "../utils/shuffle";

describe("shuffle array", () => {
  it("returns a new array", () => {
    const arr = [1, 2, 3];
    const result = shuffleQuestions(arr);
    expect(result).not.toBe(arr);
  });

  it("contains the same elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffleQuestions(arr);

    expect(result.sort()).toEqual(arr.sort());
  });
});
