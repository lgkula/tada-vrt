module.exports = async function waitForStableDom(
  page,
  timeout = 5000,
  interval = 500
) {
  let prevHTML = "";
  let stableTime = 0;
  while (stableTime < timeout) {
    const currHTML = await page.evaluate(() => document.body.innerHTML);
    if (currHTML === prevHTML) {
      stableTime += interval;
    } else {
      stableTime = 0;
      prevHTML = currHTML;
    }
    await page.waitForTimeout(interval);
  }
};
