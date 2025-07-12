import { edit as receiptEdit, reset } from "./Receipt.js";
import { items } from "../items.js";

function modify(event) {
  let data = event.target.parentNode.dataset;
  let quantity = parseInt(data.quantity);

  data.quantity = Math.max(event.target.dataset.action == "rem" ? --quantity : ++quantity, 0);

  document.querySelector(`[data-id='${data.id}'] span.amount`).textContent = data.quantity;
  receiptEdit(data.id, data.quantity);
  document.querySelector('#receipt-cash input').dispatchEvent(new Event('input'));
}

const process = _ => {
  let count = [...document.querySelectorAll('ul#menu-items li')].reduce((count, el) => count + parseInt(el.dataset.quantity), 0);

  if(count < 1)
    return;

  document.querySelector('section#menu').style.display = "none";
  document.querySelector('section#receipt').style.display = "";
}

const Menu = _ => {
  items.map((item, id) => {
    if(item.Enabled == false)
      return;

    document.querySelector('ul#menu-items').insertAdjacentHTML("beforeend", template(id, item));
  });

  document.querySelectorAll('li img, li button').forEach(el => el.addEventListener('click', modify));
  
  document.querySelector('#menu-clear').addEventListener('click', reset);
  document.querySelector('#menu-process').addEventListener('click', process);
}

export {
  Menu as default
}

const template = (id, item) => {
  return `<li data-id="${id}" data-quantity="0">
            <img src="${item.Image}" /><br/>
            <span class="amount">0</span>
            <button type="button" data-action="rem">Remove</button>
          </li>`;
};