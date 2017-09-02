const double = (n) => {
  return n * 2;
};

describe("double関数のテスト", () => {
  it("引数を2倍したものを返却する", () => {
    const result = double(2);
    const expected = 4;

    expect(result).toEqual(expected);
  });
});
