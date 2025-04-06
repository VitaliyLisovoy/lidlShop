import { test, expect } from "@playwright/test";

export class DiscountPage {
  constructor(page) {
    this.page = page;
    this.priceFrom = page.locator('//*[@id="Cena-filter-input-min"]');
    this.priceTo = page.locator('//*[@id="Cena-filter-input-max"]');
    this.orderBy = page.getByRole("button", {
      name: "Zoradené podľa: Relevantnosti",
    });
    this.orderFromLowestPrice = page.getByRole("link", {
      name: "Najnižšej ceny",
    });
    this.availableProductList = page.getByRole("link", {
      name: "zobraziť len dostupné produkty",
    });
    this.productId = page.locator(
      "//ol[@id='s-results']//li[@class='s-grid__item']"
    );
    this.fullPrice = page.locator("//div[@class='m-price__top']");
    this.discountPrice = page.locator("//div[@class='m-price__bottom']");
    this.discountValue = page.locator("//div[@class='m-price__label']");
    this.discountHeading = page.getByRole("heading", { name: "Zľavy" });
  }

  async fillPriceFrom(priceFrom) {
    await test.step(`user fill price from ${priceFrom}`, async () => {
      await this.priceFrom.fill(priceFrom);
    });
  }

  async fillPriceTo(priceTo) {
    await test.step(`user fill price to ${priceTo}`, async () => {
      await this.priceTo.fill(priceTo);
    });
  }

  async setOrderBy() {
    await test.step(`user set order of products`, async () => {
      await this.orderBy.hover();
    });
  }

  async setOrderLowestPrice() {
    await test.step(`user set order from lowest price of products`, async () => {
      await this.orderFromLowestPrice.click();
    });
  }

  async clickAvailableProductList() {
    await test.step(`user click available product list`, async () => {
      await this.availableProductList.click();
    });
  }

  async getDiscountedPrices() {
    const products = await this.productId.all();

    return await Promise.all(
      products.map(async (product) => {
        await product.scrollIntoViewIfNeeded();
        const priceText = await product.locator(this.discountPrice).innerText();
        const price = parseFloat(
          priceText.replace(",", ".").replace(/[^\d.]/g, "")
        );
        return price;
      })
    );
  }

  async validateShownPrices(prices) {
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(1);
      expect(
        prices[i],
        "prices are shown according to price filter"
      ).toBeLessThanOrEqual(2);
    }
  }

  async validateByAscendingPrices(prices) {
    for (let i = 1; i < prices.length; i++) {
      expect(
        prices[i],
        "products filtered in ascending order"
      ).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  }

  async validateByDescendingPrices(prices) {
    for (let i = 1; i < prices.length; i++) {
      expect(
        prices[i],
        "products filtered in descending order"
      ).toBeLessThanOrEqual(prices[i - 1]);
    }
  }

  async getDiscountValue() {
    const products = await this.productId.all();

    return await Promise.all(
      products.map(async (product) => {
        await product.scrollIntoViewIfNeeded();
        const discountText = await product
          .locator(this.discountValue)
          .innerText();
        const price = parseFloat(
          discountText.replace("-", "").replace("%", "")
        );
        return price;
      })
    );
  }

  async validateByHighestDiscountValues(discounts) {
    for (let i = 1; i < discounts.length; i++) {
      expect(
        discounts[i],
        "products filtered by highest discount"
      ).toBeLessThanOrEqual(discounts[i - 1]);
    }
  }

  async validateDiscountCalculations() {
    const products = await this.productId.all();

    const results = await Promise.all(
      products.map(async (product, index) => {
        await product.scrollIntoViewIfNeeded();
        const fullPriceText = await product.locator(this.fullPrice).innerText();
        const discountText = await product
          .locator(this.discountValue)
          .innerText();
        const priceText = await product.locator(this.discountPrice).innerText();
        const fullPrice = parseFloat(
          fullPriceText.replace(",", ".").replace(/[^\d.]/g, "")
        );
        const discountPercent = parseFloat(
          discountText.replace("-", "").replace("%", "")
        );
        const discountedPrice = parseFloat(
          priceText.replace(",", ".").replace(/[^\d.]/g, "")
        );
        const expectedPrice = parseFloat(
          (fullPrice * (1 - discountPercent / 100)).toFixed(2)
        );

        return {
          index,
          fullPrice,
          discountedPrice,
          expectedPrice,
        };
      })
    );
    for (const { index, discountedPrice, expectedPrice } of results) {
      expect(discountedPrice, "final price calculated right").toBeCloseTo(
        expectedPrice,
        1
      );
    }
  }
}
