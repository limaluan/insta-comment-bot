const puppeteer = require("puppeteer");
const credentials = require("./credentials");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleepRandom(min, max) {
  const ms = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomNumber() {
  return Math.floor(Math.random() * 7); // 0 a 6, inclusive
}

const comments = [
  "#multiraodochicletinho",
  "Que pegadaaa",
  "👏👏",
  "🔥🔥",
  "Bora chicletinho",
  "#chicletinho",
  "🚀🚀🚀",
];

async function start() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
  await page.setViewport({ height: 720, width: 1280 });

  await page.goto("https://www.instagram.com/accounts/login/");

  await page.waitForSelector("input[name=username]");

  await page.type("input[name=username]", credentials.username);
  await page.type("input[name=password]", credentials.password);

  await page.evaluate(() => {
    const button = document.getElementsByTagName("button")[1];
    button.click();
  });

  await sleep(5000);
  
  await page.waitForSelector("button"); // Botão de salvar info

  await page.evaluate(() => {
    const button = document.querySelector("button"); // Botão de salvar info
    button.click();
  });

  await sleep(5000);

  // Se pedir pra ativar as notificações clicar em "Not now"
  await page.evaluate(() => {
    const button = document.querySelectorAll("button")[26];
    if (button) button.click();
  });
  
  await page.goto("https://www.instagram.com/p/C-TmMcJsZQk/");
  
  // Aqui o pulo do gato
  while (true) {
    await sleepRandom(120000, 300000); // Aqui é o intervalo de tempo que ele vai escolher em mili segundos

    await page.waitForSelector("textarea");

    await page.type("textarea", comments[getRandomNumber()]);

    await page.keyboard.press("Enter");
  }
}

start();
