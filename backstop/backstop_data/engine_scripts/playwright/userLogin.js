const waitForPageLoad = require("./waitForPageLoad");

module.exports = async function userLogin(page) {
  await page.waitForSelector("#enterEmailFormEmail", { state: "visible" });
  await page.type("#enterEmailFormEmail", "user1@stresstest.com", {
    delay: 100,
  });

  await page.waitForSelector("#enterEmailFormSubmit", { state: "visible" });
  await page.click("#enterEmailFormSubmit");

  await page.waitForSelector("#password", { state: "visible" });
  await page.type("#password", "Qweasd12@", { delay: 100 });

  await page.waitForSelector("#submitLogin", { state: "visible" });
  await page.click("#submitLogin");

  await page.getByRole("button", { name: "Accept" }).click();
  await page.waitForSelector("div[class^='SideNav_headerTitle_']", {
    state: "visible",
  });

  await waitForPageLoad(page);
};
