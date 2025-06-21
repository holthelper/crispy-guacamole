import { edit as receiptEdit } from "./Receipt.js";
import { items } from "../items.js";

function modify(event) {
  let data = event.target.parentNode.dataset;
  let quantity = parseInt(data.quantity);

  if(event.target.dataset.action == "add")
    data.quantity = quantity + 1;

  if(event.target.dataset.action == "min" && quantity >= 1) 
    data.quantity = quantity - 1;

  receiptEdit(data.id, data.quantity);
  document.querySelector('#receipt-cash input').dispatchEvent(new Event('input'));
}

const Menu = _ => {

  items.map((item) => {
    if(item.Enabled == false)
      return;

    document.querySelector('section#menu').insertAdjacentHTML("beforeend", template(item));
  });

  document.querySelectorAll('.item button').forEach(el => el.addEventListener('click', modify));
}

export {
  Menu as default
}

const template = (item) => {
  return `<div class="item" data-id="${item.ID}" data-quantity="0">
            <img src="${item.Image}" /><br/>
            <button type="button" data-action="add">+</button>
            <button type="button" data-action="min">-</button>
          </div>`;
};