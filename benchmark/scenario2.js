const visit = async (page) => {
    await page.goto('2024-10-07%2006:35', {
        waitUntil: 'networkidle',
    });
    await page.waitForTimeout(10000);
    await page.scrollToEnd();
    await page.waitForNetworkIdle();
    await page.waitForTimeout(7000);
  };
  module.exports = visit;