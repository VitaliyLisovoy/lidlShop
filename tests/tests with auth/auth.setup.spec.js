import { test as setup, expect } from "@playwright/test";
import path from "node:path";
import { LoginPage } from "../../pages/login.page";
import { NavPage } from "../../pages/nav.page";
import { OneTrustPolicy } from "../../pages/oneTrustPolicy.page";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const navPage = new NavPage(page);
  const oneTrustPolicy = new OneTrustPolicy(page);

  await page.goto("/");
  await oneTrustPolicy.clickgdprCancelBtn();
  await navPage.clickSignInIcon();
  await loginPage.fillInEmail("vglisovoy@gmail.com");
  await loginPage.fillInPassword("sahrA6-xyrgyn-vyjzud");
  await loginPage.clickSignInBtn();

  await page.waitForTimeout(1000);

  await page.context().storageState({
    path: path.join(process.cwd(), "./.auth/user.json"),
  });
});
