let BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropDown = document.querySelectorAll(".dropdown select");

let exchangeBtn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let fromPrice = document.querySelector("#from-price");
let fromCurrency = document.querySelector("#from-currency");
let toPrice = document.querySelector("#to-price");
let toCurrency = document.querySelector("#to-currency");

for (let select of dropDown) {
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let imgUrl = element.parentElement.querySelector("img");
  imgUrl.src = newSrc;
};

exchangeBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  let amount = document.querySelector(".amount input");
  if (amount.value == "" || amount.value < 0) {
    amount.value = 1;
    amount.innerText = 1;
  }
  console.log(fromCurr.value, toCurr.value);
  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();
  let URL = `${BASE_URL}/${from}/${to}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  fromPrice.innerText = amount.value;
  fromCurrency.innerText = from.toUpperCase();
  toPrice.innerText = parseFloat(parseFloat(amount.value) * data[to]).toFixed(2);
  toCurrency.innerText = to.toUpperCase();
  console.log(data, to);
  console.log(typeof data[to]);
  console.log(parseFloat(amount.value), data[to]);
  console.log(parseFloat(amount.value) * data[to]);
});
