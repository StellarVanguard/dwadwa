const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // needs to be visible for login
  const page = await browser.newPage();
  await page.goto('https://www.tiktok.com/upload');

  // Wait for manual login (or automate login via credentials, which is risky)
  await page.waitForTimeout(60000); // Give yourself a minute to log in

  // Upload the video
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('input[type="file"]'), // Click the file input
  ]);

  await fileChooser.accept(['path/to/video.mp4']);

  // Add title
  await page.waitForSelector('textarea');
  await page.type('textarea', 'Your video title');

  // Click post (adjust selector depending on actual TikTok interface)
  await page.click('button:has-text("Post")');

  // Wait for upload to complete
  await page.waitForTimeout(30000);
  await browser.close();
})();
