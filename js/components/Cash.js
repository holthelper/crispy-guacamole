function input(event) {
  let total = document.querySelector('#receipt-total span').textContent.slice(1);

  let change = subtractMoney(event.target.value, total)

  document.querySelector('#receipt-change span').textContent = change;
  document.querySelector('#receipt-cashout ul').textContent = "";

  cashout(change)
}

const cashout = (change) => {
  let total = parseFloat(change.slice(1));
  let cash = [];

  if(total >= 100) {
    let hundred = Math.floor(total / 100)
    total -= hundred * 100;
    cash.push([100, hundred]);
  }
  if(total >= 50) {
    let fifty = Math.floor(total /50)
    total -= fifty * 50;
    cash.push([50, fifty]);
  }
  if(total >= 20) {
    let twenty = Math.floor(total / 20)
    total -= twenty * 20;
    cash.push([20, twenty]);
  }
  if(total >= 10) {
    let ten = Math.floor(total / 10)
    total -= ten * 10;
    cash.push([10, ten]);
  }
  if(total >= 5) {
    let five = Math.floor(total / 5)
    total -= five * 5;
    cash.push([5, five]);
  }
  if(total < 5) {
    cash.push([1, total]);
  }

  cash.forEach(([dom, qty]) => {
    document.querySelector('#receipt-cashout ul').insertAdjacentHTML('beforeend', `<li>${qty} x $${dom}`)
  })
}

const Cash = _ => {
  document.querySelector('#receipt-cash input').addEventListener("input", input);
}

export {
  Cash as default,
  parseMoney
}

const parseMoney = (num1, num2 = 1) => {
  return `$${parseFloat(num1 * num2).toFixed(2)}`;
}

const subtractMoney = (from, num) => {
  return `$${parseFloat(from - num).toFixed(2)}`;
}