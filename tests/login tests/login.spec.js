// import { test, expect } from "../fixtures.js";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { NavPage } from "../../pages/nav.page";
import { OneTrustPolicy } from "../../pages/oneTrustPolicy.page";

test("user login", { tag: ["@regression", "@smoke"] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const navPage = new NavPage(page);
  const policyPage = new OneTrustPolicy(page);

  await page.goto("/");
  await policyPage.clickgdprCancelBtn();
  await navPage.clickSignInIcon();
  await loginPage.fillInEmail("vglisovoy@gmail.com");
  await loginPage.fillInPassword("sahrA6-xyrgyn-vyjzud");
  await loginPage.clickSignInBtn();
  await expect(loginPage.accountHeading, "user login").toBeVisible();
});

test(
  "user login with invalid email format",
  { tag: "@low-priority" },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navPage = new NavPage(page);
    const policyPage = new OneTrustPolicy(page);

    await page.goto("/");
    await policyPage.clickgdprCancelBtn();
    await navPage.clickSignInIcon();
    await loginPage.fillInEmail("vggmail.com");
    await loginPage.fillInPassword("sahrA6-xyrgyn-vyjzud");
    await loginPage.clickSignInBtn();
    await expect(
      loginPage.errorEmail,
      "user get invalid email format error message"
    ).toContainText("Neplatná e-mailová adresa, skús to znova 😉");
  }
);

test(
  "user login with empty email and password",
  { tag: "@low-priority" },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navPage = new NavPage(page);
    const policyPage = new OneTrustPolicy(page);

    await page.goto("/");
    await policyPage.clickgdprCancelBtn();
    await navPage.clickSignInIcon();
    await loginPage.clickSignInBtn();
    (await expect(
      loginPage.epmtyEmailError,
      "user get email error message"
    ).toContainText("Pre pokračovanie je potrebné zadať e-mailovú adresu")) &&
      (await expect(
        loginPage.emptyPasswordError,
        "user get password error message"
      ).toContainText("Pre pokračovanie je potrebné zadať heslo"));
  }
);

test(
  "user login with valid email and empty password",
  { tag: "@low-priority" },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navPage = new NavPage(page);
    const policyPage = new OneTrustPolicy(page);

    await page.goto("/");
    await policyPage.clickgdprCancelBtn();
    await navPage.clickSignInIcon();
    await loginPage.fillInEmail("vglisovoy@gmail.com");
    await loginPage.clickSignInBtn();
    await expect(
      loginPage.emptyPasswordError,
      "user get password error message"
    ).toContainText("Pre pokračovanie je potrebné zadať heslo");
  }
);

test(
  "user login with empty email and valid password",
  { tag: "@low-priority" },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navPage = new NavPage(page);
    const policyPage = new OneTrustPolicy(page);

    await page.goto("/");
    await policyPage.clickgdprCancelBtn();
    await navPage.clickSignInIcon();
    await loginPage.fillInPassword("sahrA6-xyrgyn-vyjzud");
    await loginPage.clickSignInBtn();
    await expect(
      loginPage.epmtyEmailError,
      "user get email error message"
    ).toContainText("Pre pokračovanie je potrebné zadať e-mailovú adresu");
  }
);

test(
  "user login with incorrect credentials",
  { tag: "@low-priority" },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navPage = new NavPage(page);
    const policyPage = new OneTrustPolicy(page);

    await page.goto("/");
    await policyPage.clickgdprCancelBtn();
    await navPage.clickSignInIcon();
    await loginPage.fillInEmail("user@example.com");
    await loginPage.fillInPassword("WrongPass123!");
    await loginPage.clickSignInBtn();
    await expect(
      loginPage.credError,
      "user get incorrect credentials error message"
    ).toContainText(
      'Neplatný email alebo nesprávne heslo. Skús to znova alebo vyber možnosť "Nepamätáš si heslo?"'
    );
  }
);
