const userLogin = require("./userLogin");

const fs = require("fs");

module.exports = async function tonnageListBasic(page, scenario) {
  console.log("Loading mock data from fixtures...");

  const tonnageListData = JSON.parse(
    fs.readFileSync("backstop_data/fixtures/tonnageList.json", "utf8")
  );

  const tceData = JSON.parse(
    fs.readFileSync("backstop_data/fixtures/tce.json", "utf8")
  );

  console.log("Setting up API Mocking...");

  await page.route("**/api/tonnageList?basisPortID**", async (route) => {
    console.log("Intercepted API call: /api/tonnageList");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(tonnageListData),
    });
  });

  await page.route("**/api/tonnageList/tce?tabId**", async (route) => {
    console.log("Intercepted API call: /api/tonnageList/tce");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(tceData),
    });
  });

  console.log("Mocking setup complete.");

  await userLogin(page, scenario);
};