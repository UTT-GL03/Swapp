const visit = async (page) => {
    await page.goto('http://localhost/item/35c18d89109260bbb375bef5e2fc6198', {
        waitUntil: 'networkidle',
    });
    await page.waitForTimeout(10000);
    await page.scrollToEnd();
    await page.waitForNetworkIdle();
    await page.waitForTimeout(7000);
  };
  module.exports = visit;