function input(event) {
  let total = document.querySelector('#receipt-total span').textContent.slice(1);
  let change = subtractMoney(event.target.value, total).slice(1);

  document.querySelector('#receipt-change span').textContent = parseMoney(Math.max(change, 0));
  cashout(change)
}

const cashout = (change) => {
  document.querySelector('#receipt-cashout ul').textContent = "";

  if(change < 0) return;

  [100, 50, 20, 10, 5, 1]
    .reduce((total, tender) => {
      let bills = Math.floor(total / tender);

      if(total <= tender && total != tender) return total;

      total -= bills * tender;
      document.querySelector('#receipt-cashout ul').insertAdjacentHTML('beforeend', `<li>${bills} x ${parseMoney(tender)}`);

      return total;
    }, parseFloat(change));
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