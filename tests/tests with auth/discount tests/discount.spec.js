import { test, expect } from "@playwright/test";
import { NavPage } from "../../../pages/nav.page";
import { DiscountPage } from "../../../pages/discount.page";

test(
  "user open discount page",
  { tag: ["@regression", "@smoke"] },
  async ({ page }) => {
    const navPage = new NavPage(page);
    const discountPage = new DiscountPage(page);

    await page.goto("/");
    await navPage.clickOnlineShopLink();
    await navPage.clickMenuIcon();
    await navPage.clickOnineShopMenu();
    await page.waitForLoadState("networkidle");
    await navPage.clickDiscountMenu();
    await navPage.clickMenuIcon();
    await expect(
      discountPage.discountHeading,
      "discount page is opened"
    ).toBeVisible();
  }
);

test(
  "user put filter by price",
  { tag: ["@regression", "@smoke"] },
  async ({ page }) => {
    const navPage = new NavPage(page);
    const discountPage = new DiscountPage(page);
    const maxLimit = 2;
    const minPrice = Math.floor(Math.random() * maxLimit);
    const maxPrice =
      Math.floor(Math.random() * (maxLimit - minPrice)) + minPrice + 1;

    await page.goto("/");
    await navPage.clickOnlineShopLink();
    await navPage.clickMenuIcon();
    await navPage.clickOnineShopMenu();
    await page.waitForLoadState("networkidle");
    await navPage.clickDiscountMenu();
    await page.waitForLoadState("networkidle");
    await discountPage.fillPriceFrom(minPrice.toString());
    await page.keyboard.press("Tab");
    await discountPage.fillPriceTo(maxPrice.toString());
    await page.keyboard.press("Enter");
    await expect(page, "filter by price is applied").toHaveURL(
      `https://www.lidl.sk/q/query/zlavy?sort=null-desc&price=${minPrice}+-+${maxPrice}`
    );
  }
);

test(
  "validate prices greater then min and less then max price",
  { tag: ["@regression", "@smoke"] },
  async ({ page }) => {
    const discountPage = new DiscountPage(page);

    await page.goto(
      "https://www.lidl.sk/q/query/zlavy?availabilityIndicator=3.0&availabilityIndicator=3.01&discountFlag=1&price=1&price=2"
    );
    const prices = await discountPage.getDiscountedPrices();

    await discountPage.validateShownPrices(prices);
  }
);

test(
  "validate max price is always greater than min price",
  { tag: "@regression" },
  async ({ page }) => {
    const discountPage = new DiscountPage(page);

    await page.goto("https://www.lidl.sk/q/query/zlavy?pageId=10000274");
    await discountPage.fillPriceFrom("2");
    await page.keyboard.press("Tab");
    await discountPage.fillPriceTo("1");
    await page.keyboard.press("Enter");
    await expect(page, "min price is always less than max price").toHaveURL(
      `https://www.lidl.sk/q/query/zlavy?sort=null-desc&price=1+-+2`
    );
  }
);

test(
  "user filter by price in ascending order",
  { tag: "@regression" },
  async ({ page }) => {
    const discountPage = new DiscountPage(page);

    await page.goto(
      "https://www.lidl.sk/q/query/zlavy?availabilityIndicator=3.0&availabilityIndicator=3.01&discountFlag=1&price=1&price=2"
    );
    await discountPage.setOrderBy();
    await discountPage.setOrderLowestPrice();
    await page.waitForLoadState("networkidle");
    const prices = await discountPage.getDiscountedPrices();

    await discountPage.validateByAscendingPrices(prices);
  }
);

test(
  "user filter by price in descending order",
  { tag: "@regression" },
  async ({ page }) => {
    const discountPage = new DiscountPage(page);

    await page.goto(
      "https://www.lidl.sk/q/query/zlavy?sort=price-desc&availabilityIndicator=3.0&availabilityIndicator=3.01&price=1&price=2&discountFlag=1"
    );
    await page.waitForLoadState("networkidle");
    const prices = await discountPage.getDiscountedPrices();

    await discountPage.validateByDescendingPrices(prices);
  }
);

test(
  "user filter by highest discount",
  { tag: "@regression" },
  async ({ page }) => {
    const discountPage = new DiscountPage(page);

    await page.goto(
      "https://www.lidl.sk/q/query/zlavy?sort=percentageDiscount-desc&availabilityIndicator=3.0&availabilityIndicator=3.01&discountFlag=1&price=1&price=2"
    );
    await page.waitForLoadState("networkidle");
    const discounts = await discountPage.getDiscountValue();

    await discountPage.validateByHighestDiscountValues(discounts);
  }
);

test(
  "validate that final price calculated right",
  { tag: "@regression" },
  async ({ page }) => {
    const discountPage = new DiscountPage(page);

    await page.goto(
      "https://www.lidl.sk/q/query/zlavy?sort=percentageDiscount-desc&availabilityIndicator=3.0&availabilityIndicator=3.01&discountFlag=1&price=1&price=2"
    );
    await page.waitForLoadState("networkidle");
    await discountPage.validateDiscountCalculations();
  }
);
