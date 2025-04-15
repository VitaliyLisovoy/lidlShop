// import { test, expect } from "../fixtures.js";
import { loginUser } from "../utils/steps";
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

const invalidLogins = [
  {
    title: "user login with empty email and password",
    email: "",
    password: "",
    expectations: [
      {
        locator: (page) => page.emailError,
        description: "user get email error message",
        expectedText: "Pre pokračovanie je potrebné zadať e-mailovú adresu",
      },
      {
        locator: (page) => page.passwordError,
        description: "user get password error message",
        expectedText: "Pre pokračovanie je potrebné zadať heslo",
      },
    ],
  },
  {
    title: "user login with valid email and empty password",
    email: "vglisovoy@gmail.com",
    password: "",
    expectations: [
      {
        locator: (page) => page.passwordError,
        description: "user get password error message",
        expectedText: "Pre pokračovanie je potrebné zadať heslo",
      },
    ],
  },
  {
    title: "user login with empty email and valid password",
    email: "",
    password: "sahrA6-xyrgyn-vyjzud",
    expectations: [
      {
        locator: (page) => page.emailError,
        description: "user get email error message",
        expectedText: "Pre pokračovanie je potrebné zadať e-mailovú adresu",
      },
    ],
  },
  {
    title: "user login with incorrect credentials",
    email: "user@example.com",
    password: "WrongPass123!",
    expectations: [
      {
        locator: (page) => page.emailError,
        description: "user get incorrect credentials error message",
        expectedText:
          'Neplatný email alebo nesprávne heslo. Skús to znova alebo vyber možnosť "Nepamätáš si heslo?"',
      },
    ],
  },
];

for (const { title, email, password, expectations } of invalidLogins) {
  test(title, { tag: "@low-priority" }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navPage = new NavPage(page);
    const policyPage = new OneTrustPolicy(page);

    await page.goto("/");
    await policyPage.clickgdprCancelBtn();
    await navPage.clickSignInIcon();

    await loginUser({ page, loginPage, navPage, policyPage, email, password });

    for (const { locator, description, expectedText } of expectations) {
      await expect(locator(loginPage), description).toContainText(expectedText);
    }
  });
}

// test(
//   "user login with invalid email format",
//   { tag: "@low-priority" },
//   async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const navPage = new NavPage(page);
//     const policyPage = new OneTrustPolicy(page);

//     await page.goto("/");
//     await policyPage.clickgdprCancelBtn();
//     await navPage.clickSignInIcon();
//     await loginPage.fillInEmail("vggmail.com");
//     await loginPage.fillInPassword("sahrA6-xyrgyn-vyjzud");
//     await loginPage.clickSignInBtn();
//     await expect(
//       loginPage.emailError,
//       "user get invalid email format error message"
//     ).toContainText("Neplatná e-mailová adresa, skús to znova 😉");
//   }
// );

// test(
//   "user login with empty email and password",
//   { tag: "@low-priority" },
//   async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const navPage = new NavPage(page);
//     const policyPage = new OneTrustPolicy(page);

//     await page.goto("/");
//     await policyPage.clickgdprCancelBtn();
//     await navPage.clickSignInIcon();
//     await loginPage.clickSignInBtn();
//     (await expect(
//       loginPage.emailError,
//       "user get email error message"
//     ).toContainText("Pre pokračovanie je potrebné zadať e-mailovú adresu")) &&
//       (await expect(
//         loginPage.passwordError,
//         "user get password error message"
//       ).toContainText("Pre pokračovanie je potrebné zadať heslo"));
//   }
// );

// test(
//   "user login with valid email and empty password",
//   { tag: "@low-priority" },
//   async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const navPage = new NavPage(page);
//     const policyPage = new OneTrustPolicy(page);

//     await page.goto("/");
//     await policyPage.clickgdprCancelBtn();
//     await navPage.clickSignInIcon();
//     await loginPage.fillInEmail("vglisovoy@gmail.com");
//     await loginPage.clickSignInBtn();
//     await expect(
//       loginPage.passwordError,
//       "user get password error message"
//     ).toContainText("Pre pokračovanie je potrebné zadať heslo");
//   }
// );

// test(
//   "user login with empty email and valid password",
//   { tag: "@low-priority" },
//   async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const navPage = new NavPage(page);
//     const policyPage = new OneTrustPolicy(page);

//     await page.goto("/");
//     await policyPage.clickgdprCancelBtn();
//     await navPage.clickSignInIcon();
//     await loginPage.fillInPassword("sahrA6-xyrgyn-vyjzud");
//     await loginPage.clickSignInBtn();
//     await expect(
//       loginPage.emailError,
//       "user get email error message"
//     ).toContainText("Pre pokračovanie je potrebné zadať e-mailovú adresu");
//   }
// );

// test(
//   "user login with incorrect credentials",
//   { tag: "@low-priority" },
//   async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const navPage = new NavPage(page);
//     const policyPage = new OneTrustPolicy(page);

//     await page.goto("/");
//     await policyPage.clickgdprCancelBtn();
//     await navPage.clickSignInIcon();
//     await loginPage.fillInEmail("user@example.com");
//     await loginPage.fillInPassword("WrongPass123!");
//     await loginPage.clickSignInBtn();
//     await expect(
//       loginPage.emailError,
//       "user get incorrect credentials error message"
//     ).toContainText(
//       'Neplatný email alebo nesprávne heslo. Skús to znova alebo vyber možnosť "Nepamätáš si heslo?"'
//     );
//   }
// );
