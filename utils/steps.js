/**
 * User login with email і password params
 * @param {object} page
 * @param {LoginPage} loginPage
 * @param {NavPage} navPage
 * @param {OneTrustPolicy} policyPage
 * @param {string} email
 * @param {string} password
 */
export const loginUser = async ({
  page,
  loginPage,
  navPage,
  policyPage,
  email,
  password,
}) => {
  await page.goto("/");
  await policyPage.clickgdprCancelBtn();
  await navPage.clickSignInIcon();

  if (email) {
    await loginPage.fillInEmail(email);
  }

  if (password) {
    await loginPage.fillInPassword(password);
  }

  await loginPage.clickSignInBtn();
};
