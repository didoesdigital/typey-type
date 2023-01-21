import hasEfAsVeeOrEss from "./hasEfAsVeeOrEss";

describe("hasEfAsVeeOrEss", () => {
  it("returns true for trust", async () => {
    expect(hasEfAsVeeOrEss("TRUFT", "trust")).toEqual(true);
  });

  xit("returns false for cultures", async () => {
    expect(hasEfAsVeeOrEss("KAOUFPS", "cultures")).toEqual(false);
  });

  xit("returns false for confused", async () => {
    expect(hasEfAsVeeOrEss("KAOUFD", "confused")).toEqual(false);
  });

  xit("returns false for consist of", async () => {
    expect(hasEfAsVeeOrEss("KAOF", "consist of")).toEqual(false);
  });
});
