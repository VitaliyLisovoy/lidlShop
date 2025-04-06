import { test, expect } from "@playwright/test";

test(
  "GET /products - return product list with valid structure",
  { tag: ["@API", "@smoke"] },
  async ({ request }) => {
    const response = await request.get(
      "https://www.lidl.sk/q/api/query/zlavy?availabilityIndicator=3.0&availabilityIndicator=3.01&discountFlag=1&price=1&price=2&fetchsize=48&offset=0&locale=sk_SK&assortment=SK&version=2.1.0&idsOnly=false&productsOnly=false"
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.items)).toBeTruthy();
    expect(body.items.length).toBeGreaterThan(0);

    const firstProduct = body.items[0];
    expect(firstProduct.gridbox.data.fullTitle).toBeDefined();
    expect(firstProduct.gridbox.data.price).toBeDefined();
    expect(
      firstProduct.gridbox.data.productId,
      "product list structure is valid "
    ).toBeDefined();
  }
);
