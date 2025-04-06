import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/login.page";
import { NavPage } from "../../../pages/nav.page";

test("user logout", { tag: ["@regression", "@smoke"] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const navPage = new NavPage(page);

  await page.goto("/");
  await navPage.clickSignInIcon();
  await loginPage.clickSignOutBtn();

  await expect(loginPage.loginHeading, "user logout").toContainText(
    "Prihlás / registruj sa a užívaj si výhody Lidl Plus"
  );
});
