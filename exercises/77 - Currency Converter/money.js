const fromSelect = document.querySelector('[name=from_currency]');
const toSelect = document.querySelector('[name=to_currency]');
const endpoint = 'https://api.exchangeratesapi.io/latest';

// An object to cache our rates. We don't want to request rates every time
// the user types a digit in. This would be slow and we could get rate limited
// by the API
const ratesByBase = {};

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
        `<option value="${currencyCode}">${currencyCode} – ${currencyName}</option>`
    )
    .join(''); // join on nothing to turn output into pure html dump
}

async function fetchRates(base = 'USD') {
  const response = await fetch(`${endpoint}?base=${base}`);
  const rates = await response.json();
  return rates;
}

async function convert(amount, from, to) {
  // first check if we have the rates to convert from that currency
  // NOTE: we have to use square bracket notation [] to access ratesByBase
  // object values when we use the variables from and to
  if (!ratesByBase[from]) {
    console.log(
      `Oh no. We don't have ${from} to convert to ${to} so let's go get it.`
    );
    const rates = await fetchRates(from);
    console.log(rates);
    // store rates for next time
    ratesByBase[from] = rates;
  }
  // convert the amount user passed in
  const convertedAmount = ratesByBase[from].rates[to];
}

// store result in variable so only have to run function once
const optionsHTML = generateOptions(currencies);
// console.log(optionsHTML);

// populate the options elements on pageload
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;
