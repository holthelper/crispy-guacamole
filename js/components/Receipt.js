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
    document.querySelector('#receipt-items').insertAdjacentHTML('beforeend', itemTemplate(quantity, items[index]));
  
  if(li != null) {
    li.querySelector('span.item-quantity').textContent = quantity;
    li.querySelector('span.item-total').textContent = parseMoney(items[index].Price, quantity);
  }

  if(li != null && quantity <= 0)
    document.querySelectorAll(`li[data-index="${index}"]`).forEach(el => el.remove());

  updateReceipt();

  return;
}

const updateReceipt = () => {
  const totals = [...document.querySelectorAll('.item-total')].reduce((t,el) => {
    return t + parseFloat(el.textContent.slice(1));
  }, 0.00)

  document.querySelector('#receipt-total span').textContent = parseMoney(totals);
}

const Receipt = _ => {
  time();
}

export {
  Receipt as default,
  edit
}

const itemTemplate = (qty, item) => {
  return `<li data-index="${item.ID}">
            <span class="item-quantity">${qty}</span>
            <span class="item-name">${item.Name}</span>
            <span class="item-price">(${parseMoney(item.Price)})</span>
            <span class="item-total">${parseMoney(item.Price, qty)}</span>
          </li>`;
}