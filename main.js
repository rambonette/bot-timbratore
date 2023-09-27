const CronJob = require('cron').CronJob;
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

var browser; //hold puppeteer session

start();

function start() {
  dotenv.config({ path: '.env' });
  let daysOfWeek = process.env.WEEK_DAYS.split(' ');
  for (let day of daysOfWeek) {
    for (let i = 0; i < 4; i++) {
      let hoursMinutes = process.env[`HOUR${i + 1}`].split(':');
      console.log(`${hoursMinutes[1]} ${hoursMinutes[0]} * * ${day}`);
      let cron = new CronJob(
        `${hoursMinutes[1]} ${hoursMinutes[0]} * * ${day}`,
        () => { (i + 1) % 2 == 0 ? exit() : entry() }
      );
      cron.start();
    }
  }
}

async function entry() {
  console.log("comincio timbratura entrata");
  let page = await newPage();
  await login(page);

  const elementHandle = await page.$(
    'iframe[name="Main"]',
  );
  const frame = await elementHandle.contentFrame();

  await frame.waitForSelector('[id$=_label9]');

  console.log("timbrato entrata", new Date());
  await frame.tap('[id$=_label9]');

  await page.close();

  await closeBrowser();

}

async function exit() {
  console.log("comincio timbratura uscita");
  let page = await newPage();
  await login(page);

  const elementHandle = await page.$(
    'iframe[name="Main"]',
  );
  const frame = await elementHandle.contentFrame();

  await frame.waitForSelector('[id$=_label10]');

  console.log("timbrato uscita", new Date());
  await frame.tap('[id$=_label10]');

  await page.close();

  await closeBrowser();
}

async function login(page) {
  await page.goto(process.env.LOGIN_URL, { waitUntil: 'networkidle0' });

  await page.waitForSelector('[id$=_m_cUserName]');
  await page.waitForSelector('[id$=_m_cPassword]');


  await page.type('[id$=_m_cUserName]', process.env.USERNAME);
  await page.type('[id$=_m_cPassword]', process.env.PASSWORD);

  await page.waitForSelector('[id$=_Accedi]');
  await page.tap('[id$=_Accedi]');

  await page.waitForNavigation();
}

async function newPage() {
  if (!browser) await openPuppeteer();
  return await browser.newPage();
}

async function closeBrowser() {
  if (!browser) return;
  await browser.close();
}

async function openPuppeteer() {
  if (browser) { return; }

  var pathPi = '/usr/bin/chromium-browser';

  var normalAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";

  //1366 768
  var options =
  {
    headless: true,
    args: ['--user-agent=' + normalAgent, '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process', `--window-size=1366,768`, "--disable-notifications"],
    defaultViewport: { width: 1366, height: 768 },
    executablePath: '/usr/bin/chromium'
  };

  //if (process.platform === 'linux' && process.arch === "arm") { options.executablePath = pathPi; } // Raspberry Pi

  browser = await puppeteer.launch(options);
}




