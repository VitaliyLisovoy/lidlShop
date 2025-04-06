import { test } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByTestId("input-email");
    this.passwordInput = page.getByTestId("input-password");
    this.signInBtn = page.getByTestId("button-primary");
    this.signOutBtn = page.getByRole("button", { name: "Odhlásiť sa" });
    this.accountHeading = page.getByRole("heading", {
      name: "Môj Lidl Plus účet",
    });
    this.loginHeading = page.locator('[id="\\31 0233509"]');
    this.errorEmail = page
      .getByTestId("input-email-error-message")
      .getByRole("paragraph");
    this.epmtyEmailError = page
      .getByTestId("input-email-error-message")
      .getByRole("paragraph");
    this.emptyPasswordError = page
      .getByTestId("input-password-error-message")
      .getByRole("paragraph");
    this.credError = page
      .getByTestId("input-email-error-message")
      .getByRole("paragraph");
  }
  async fillInEmail(email) {
    await test.step(`user fill in email`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async fillInPassword(pass) {
    await test.step(`user fill in password`, async () => {
      await this.passwordInput.fill(pass);
    });
  }

  async clickSignInBtn() {
    await test.step(`user click sing in button`, async () => {
      await this.signInBtn.click();
    });
  }

  async clickSignOutBtn() {
    await test.step(`user click sing in button`, async () => {
      await this.signOutBtn.click();
    });
  }
}
