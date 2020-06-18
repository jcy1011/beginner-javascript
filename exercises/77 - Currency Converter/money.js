const fromInput = document.querySelector('[name=from_amount]');
const fromSelect = document.querySelector('[name=from_currency]');
const toSelect = document.querySelector('[name=to_currency]');
const toOutput = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
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
  // convert the amount user passed in. Note, must use [] for object lookup
  // using variables
  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} ${to}`);
  return convertedAmount;
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput(e) {
  // console.log(e.target);
  // console.log(e.currentTarget);
  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );
  console.log(`rawAmount: ${rawAmount}`);
  toOutput.textContent = formatCurrency(rawAmount, toSelect.value);
  // attempt to format input text not working
  // fromInput.value = formatCurrency(fromInput.value, fromSelect.value);
  console.log(`fromInput.value: ${fromInput.value}`);
  console.log(`fromSelect.value: ${fromSelect.value}`);
}

// store result in variable so only have to run function once
const optionsHTML = generateOptions(currencies);
// console.log(optionsHTML);

// populate the options elements on pageload
// USD shows as default on pageload
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;
// "Select a currency" shows as default on page load
// fromSelect.insertAdjacentHTML('beforeend', optionsHTML);
// toSelect.insertAdjacentHTML('beforeend', optionsHTML);

// We need to listen for 3 inputs: typed in number and both currency selections
// Listen for an input event on the whole form and that'll cover all 3
form.addEventListener('input', handleInput);
