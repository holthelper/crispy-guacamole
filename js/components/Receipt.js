import { items } from "../items.js";
import { parseMoney } from "./Cash.js";

const time = _ => {
  let date = new Date();

  document.querySelector('#receipt-date').textContent = date.toLocaleDateString("en-US");
  document.querySelector('#receipt-time').textContent = date.toLocaleTimeString("en-US");
  setInterval(function() {
    document.querySelector('#receipt-time').textContent = new Date().toLocaleTimeString("en-US");
  }, 1000)
}

const edit = (index, quantity) => {
  let li = document.querySelector(`li[data-index="${index}"]`);

  if(li == null && quantity >= 1)
    document.querySelector('#receipt-items').insertAdjacentHTML('beforeend', itemTemplate(index, items[index]));
  
  if(li != null) {
    li.querySelector('span.item-quantity').textContent = quantity;
    li.querySelector('span.item-total').textContent = parseMoney(items[index].Price, quantity);
  }

  if(li != null && quantity <= 0)
    document.querySelectorAll(`li[data-index="${index}"]`).forEach(el => el.remove());

  updateTotal();

  return;
}

const updateTotal = () => {
  const totals = [...document.querySelectorAll('.item-total')].reduce((t,el) => {
    return t + parseFloat(el.textContent.slice(1));
  }, 0.00)

  document.querySelector('#receipt-total span').textContent = parseMoney(totals);
}

const reset = () => {
  [...document.querySelectorAll('#menu-items li')].map((item) => edit(item.dataset.id, item.dataset.quantity = 0) );
  [...document.querySelectorAll('.amount')].map((el) => el.textContent = 0);

  let cash = document.querySelector('#receipt-cash input');

  cash.value = "";
  cash.dispatchEvent(new Event('input'));
  
  document.querySelector('section#menu').style.display = "";
  document.querySelector('section#receipt').style.display = "none";
}

const save = () => {
  // TODO
};

const Receipt = _ => {
  time();

  document.querySelector('#receipt-clear').addEventListener('click', reset);
}

export {
  Receipt as default,
  edit,
  reset
}

const itemTemplate = (id, item, qty = 1) => {
  return `<li data-index="${id}">
            <span class="item-quantity">${qty}</span>
            <span class="item-name">${item.Name}</span>
            <span class="item-price">(${parseMoney(item.Price)})</span>
            <span class="item-total">${parseMoney(item.Price, qty)}</span>
          </li>`;
}