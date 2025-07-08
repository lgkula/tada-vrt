const waitForStableDom = require("./waitForStableDom");

module.exports = async function waitForPageLoad(page) {
  console.log("Waiting for page to fully load...");
  await page.waitForLoadState("domcontentloaded");
  await waitForStableDom(page);
  console.log("Page fully loaded!");
};