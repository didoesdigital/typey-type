import hasEfAsVeeOrEss from "./hasEfAsVeeOrEss";

describe("hasEfAsVeeOrEss", () => {
  it("returns true for trust", async () => {
    expect(hasEfAsVeeOrEss("TRUFT", "trust")).toEqual(true);
  });

  it.skip("returns false for cultures", async () => {
    expect(hasEfAsVeeOrEss("KAOUFPS", "cultures")).toEqual(false);
  });

  it.skip("returns false for confused", async () => {
    expect(hasEfAsVeeOrEss("KAOUFD", "confused")).toEqual(false);
  });

  it.skip("returns false for consist of", async () => {
    expect(hasEfAsVeeOrEss("KAOF", "consist of")).toEqual(false);
  });
});
