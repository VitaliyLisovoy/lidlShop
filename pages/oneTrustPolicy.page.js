import { test } from "@playwright/test";

export class OneTrustPolicy {
  constructor(page) {
    this.page = page;
    this.operatorLink = page.getByRole("link", {
      name: "prevádzkovateľ webových strá",
    });
    this.gdprLink = page.getByRole("link", {
      name: "zásadách ochrany osobných ú",
    });
    this.gdprSettinsBtn = page.getByRole("button", { name: "PRISPÔSOBIŤ" });
    this.gdprOkBtn = page.getByRole("button", { name: "POVOLIŤ" });
    this.gdprCancelBtn = page.getByRole("button", { name: "ODMIETNUŤ" });
  }

  async clickgdprCancelBtn() {
    await test.step(`user click cancel button on GDPR pop up`, async () => {
      await this.gdprCancelBtn.click();
    });
  }
}
