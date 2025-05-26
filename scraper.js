// scraper.js
const puppeteer = require('puppeteer');

async function scrapeDogs() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://www.gchscc.org/dogs', { waitUntil: 'networkidle2' });

  const dogs = await page.evaluate(() => {
    const dogElements = document.querySelectorAll('a[data-hook="link"]'); // Adjust this selector as needed
    const results = [];

    dogElements.forEach(el => {
      const img = el.querySelector('img');
      const name = el.innerText.trim();
      const link = el.href;

      if (img && name) {
        results.push({
          name,
          img: img.src,
          link,
        });
      }
    });

    return results;
  });

  await browser.close();
  return dogs;
}

scrapeDogs().then(dogs => {
  console.log(JSON.stringify(dogs, null, 2));
});
