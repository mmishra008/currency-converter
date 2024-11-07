const BASE_URL =
  'https://v6.exchangerate-api.com/v6/d3cadc418aee3318707af3ec/latest';

const dropdown = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

//accessing country codes
// for (code in countryList) {
//   console.log(code, countryList[code]); //received key in code and key value in countryList[code]
// }

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currCode; //assign text to newOption tag
    newOption.value = currCode; //assign value to this tag
    if (select.name === 'from' && currCode === 'USD') {
      newOption.selected = 'selected';
    } else if (select.name === 'to' && currCode === 'INR') {
      newOption.selected = 'selected';
    }
    select.append(newOption);
  }
  //send the changes of 'from' and 'to' of <select>
  select.addEventListener('change', (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
};

btn.addEventListener('click', (evt) => {
  evt.preventDefault();
  let amount = document.querySelector('.amount input');
  let amtVal = amount.value;
  if (amtVal === '' || amtVal < 1) {
    amtVal = 1;
    amount.value = '1';
  }
  const fromUrl = `${BASE_URL}/${fromCurr.value}`;
  console.log(fromCurr.value, toCurr.value);

  async function checkApi() {
    const resp = await fetch(fromUrl);
    const data = await resp.json();
    const exchValue = data.conversion_rates[toCurr.value];
    const finalAmount = amtVal * exchValue;
    console.log(finalAmount);
    msg.innerText = `${amtVal}-${fromCurr.value} = ${finalAmount}-${toCurr.value}`;
  }
  checkApi();
});
