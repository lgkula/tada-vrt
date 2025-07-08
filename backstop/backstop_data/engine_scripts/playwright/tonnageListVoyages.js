const tonnageListBasic = require("./tonnageListBasic");
const waitForPageLoad = require("./waitForPageLoad");

const fs = require("fs");

module.exports = async function (page, scenario) {
  console.log("Loading mock data from fixtures...");

  const voyagesData = JSON.parse(
    fs.readFileSync("backstop_data/fixtures/voyages.json", "utf8")
  );

  const historicalTceForVoyagesData = JSON.parse(
    fs.readFileSync(
      "backstop_data/fixtures/historicalTceForVoyages.json",
      "utf8"
    )
  );

  console.log("Setting up API Mocking...");

  await page.route("**/api/tonnageList/9251597/v3/voyages**", async (route) => {
    console.log("Intercepted API call: /api/tonnageList/9251597/v3/voyages");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(voyagesData),
    });
  });

  await page.route(
    "**/api/historicaltce/forVoyages/9251597**",
    async (route) => {
      console.log(
        "Intercepted API call: /api/historicaltce/forVoyages/9251597"
      );
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(historicalTceForVoyagesData),
      });
    }
  );

  console.log("Mocking setup complete.");

  await tonnageListBasic(page, scenario);

  const rowSelector = "div[aria-rowindex='1'][role='row']";
  await page.waitForSelector(rowSelector, { state: "visible" });
  await page.locator(rowSelector).click();

  await waitForPageLoad(page)
};