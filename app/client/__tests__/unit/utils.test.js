import "../setup/setupTests";
import * as utils from "../../utils";

describe("test formatMoney", () => {
  it.each([
    [200, undefined, undefined, undefined, "AUD", "200.00 AUD"],
    [-200, undefined, undefined, undefined, "AUD", "-200.00 AUD"],
    [undefined, undefined, undefined, undefined, "AUD", "0.00 AUD"],
    [2, 1, undefined, undefined, "USD", "2.0 USD"],
    [999999, 4, ".", ",", "R", "999,999.0000 R"]
  ])(
    ".formatMoney(%i, %i, %s, %s, %s) == %s",
    (amount, decimalCount, decimal, thousands, currency, expected) => {
      expect(
        utils.formatMoney(amount, decimalCount, decimal, thousands, currency)
      ).toBe(expected);
    }
  );
});

describe("test URL functions", () => {
  test("test parseQuery", () => {
    expect(utils.parseQuery("?is_deleted=true&foo=bar")).toStrictEqual({
      foo: "bar",
      is_deleted: "true"
    });
  });

  test("test generateFormattedURLPath", () => {
    expect(
      utils.generateFormattedURLPath(
        "/user/",
        { is_deleted: true, foo: "bar" },
        1
      )
    ).toBe("/api/v1/user/?is_deleted=true&foo=bar");
  });

  test("test generateFormattedURL", () => {
    expect(
      utils.generateFormattedURL("/user/", { is_deleted: true, foo: "bar" }, 1)
    ).toBe("http://localhost/api/v1/user/?is_deleted=true&foo=bar");
  });
});

describe("test localStorage", () => {
  const orgId = "1";
  const TFAToken = "abcdadsf123123123";
  const sessionToken = "asfdasfd91234pfa";

  describe("orgId", () => {
    test("test setOrgId", () => {
      utils.storeOrgid(orgId);
      expect(localStorage).toHaveProperty("orgId", orgId);
    });

    test("test getOrgId", () => {
      expect(utils.getOrgId()).toEqual(orgId);
    });

    test("test removeOrgId", () => {
      utils.removeOrgId();
      expect(localStorage).not.toHaveProperty("orgId", orgId);
    });
  });

  describe("TFAToken", () => {
    test("test storeTFAToken", () => {
      utils.storeTFAToken(TFAToken);
      expect(localStorage).toHaveProperty("TFAToken", TFAToken);
    });

    test("test getTFAToken", () => {
      expect(utils.getTFAToken()).toEqual(TFAToken);
    });

    test("test removeTFAToken", () => {
      utils.removeTFAToken();
      expect(localStorage).not.toHaveProperty("TFAToken", TFAToken);
    });
  });

  describe("sessionToken", () => {
    test("test storeSessionToken", () => {
      utils.storeSessionToken(sessionToken);
      expect(localStorage).toHaveProperty("sessionToken", sessionToken);
    });

    test("test getToken - sessionToken only", () => {
      expect(utils.getToken()).toEqual(sessionToken);
    });

    test("test getToken - sessionToken + TFAToken", () => {
      utils.storeTFAToken(TFAToken);
      expect(utils.getToken()).toEqual(sessionToken + "|" + TFAToken);
      utils.removeTFAToken();
    });

    test("test removeSessionToken", () => {
      utils.removeSessionToken();
      expect(localStorage).not.toHaveProperty("sessionToken", sessionToken);
    });
  });
});

test("replaceUnderscores", () => {
  expect(utils.replaceUnderscores("Hello_World")).toBe("Hello World");
});

test("replaceSpaces", () => {
  expect(utils.replaceSpaces("Hello World")).toBe("Hello-World");
});
