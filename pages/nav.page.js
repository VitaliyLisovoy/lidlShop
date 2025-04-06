import { test } from "@playwright/test";

export class NavPage {
  constructor(page) {
    this.page = page;
    this.lidlIcon = page.getByRole("link", { name: "Logo Lidl Slovensko" });
    this.menuIcon = page.getByRole("link", { name: "Menu" });
    this.homeIcon = page.getByRole("link", { name: "Domov" });
    this.onlineShopLink = page.getByRole("link", {
      name: "Online Shop",
      exact: true,
    });
    this.inShopIcon = page.getByRole("link", {
      name: "V predajni",
      exact: true,
    });
    this.searchInput = page.getByRole("searchbox", {
      name: "Vyhľadaj obľúbený produkt,",
    });
    this.newsIcon = page.getByRole("link", { name: "Letáky" });
    this.signInIcon = page.getByRole("link", { name: "Lidl Plus účet" });
    this.basketIcon = page.getByRole("link", { name: "Nákupný košík" });
    this.onlineShopMenu = page
      .getByRole("banner")
      .getByRole("link", { name: "Online Shop" });
    this.discountMenu = page.getByRole("link", { name: "Zľavy" });
  }

  async clickSignInIcon() {
    await test.step("user click sign in icon on nav bar", async () => {
      await this.signInIcon.click();
    });
  }

  async clickBasketIcon() {
    await test.step("user click basket icon on nav bar", async () => {
      await this.basketIcon.click();
    });
  }

  async clickOnlineShopLink() {
    await test.step("user click online shop lcon link on nav bar", async () => {
      await this.onlineShopLink.click();
    });
  }

  async clickMenuIcon() {
    await test.step("user click menu icon on nav bar", async () => {
      await this.menuIcon.click();
    });
  }

  async clickOnineShopMenu() {
    await test.step("user click online shop link in menu", async () => {
      await this.onlineShopMenu.click();
    });
  }

  async clickDiscountMenu() {
    await test.step("user click discount link in menu", async () => {
      await this.discountMenu.nth(0).click();
    });
  }
}
