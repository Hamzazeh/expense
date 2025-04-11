let app = document.querySelector(".app");
let add_page = document.querySelector(".add-page");

let balance_num = document.getElementById("balance-num");
let expense_num = document.getElementById("expense-num");
let income_num = document.getElementById("income-num");
let sign_op = document.getElementById("sign_op");

let in_list_empty = true;
let ex_list_empty = true;

function turn_add_page() {
  add_page.style.display = "flex";
  app.style.display = "none";
  document.getElementById("description").focus();
}
function go_back() {
  add_page.style.display = "none";
  app.style.display = "flex";
}

// ________________________

function add_expense() {
  event.preventDefault();

  let description = document.getElementById("description");
  let amount = document.getElementById("amount");

  add_page.style.display = "none";
  app.style.display = "flex";

  amount_val = parseFloat(amount.value);

  add_amounts(amount_val);
  add_list(description.value, amount.value);

  description.value = "";
  amount.value = "";
}

// add li
function add_list(description, amount) {
  let income_list = document.querySelector(".income-list");
  let expense_list = document.querySelector(".expense-list");
  if (parseInt(amount) >= 0) {
    let li = document.createElement("li");
    li.innerHTML = `
		<div style="background: var(${pick_col()});" class="square"></div>
    <div class="list-content">
      <h3>${description}</h3>
      <p>+<span>${amount}</span>$</p>
		</div>
		`;

    if (in_list_empty) {
      income_list.innerHTML = "";
      income_list.appendChild(li);
      in_list_empty = false;
    } else {
      income_list.appendChild(li);
    }
  } else {
    let li = document.createElement("li");
    li.innerHTML = `
		<div style="background: var(${pick_col()});" class="square"></div>
    <div class="list-content">
      <h3>${description}</h3>
      <p><span>${amount}</span>$</p>
		</div>
		`;

    if (ex_list_empty) {
      expense_list.innerHTML = "";
      expense_list.appendChild(li);
      ex_list_empty = false;
    } else {
      expense_list.appendChild(li);
    }
  }
}

// add amounts
function add_amounts(amount_val) {
  if (amount_val >= 0) {
    // set the balance
    let balance_amount = parseFloat(balance_num.innerHTML) + amount_val;

    balance_num.innerHTML = balance_amount;

    // set income
    let income_amount = parseFloat(income_num.innerHTML) + amount_val;
    income_num.innerHTML = income_amount;

    // check balance value for sign
    if (balance_amount < 0) {
      sign_op.innerHTML = "";
      document.querySelector(".balance p").style.color = "var(--expense-c)";
    } else {
      sign_op.innerHTML = "+";
			document.querySelector(".balance p").style.color = "var(--accent)";
    }
  } else {
    // set the balance
    let balance_amount = parseFloat(balance_num.innerHTML) + amount_val;
    balance_num.innerHTML = balance_amount;

    // set expense
    let expense_amount = parseFloat(expense_num.innerHTML) - amount_val;
    expense_num.innerHTML = expense_amount;

    // check balance value for sign
    if (balance_amount < 0) {
      sign_op.innerHTML = "";
			document.querySelector(".balance p").style.color = "var(--expense-c)";
    } else {
      sign_op.innerHTML = "+";
			document.querySelector(".balance p").style.color = "var(--accent)";
    }
  }
}

// pick color
function pick_col() {
  let col_list = [
    "--nice-c1",
    "--nice-c2",
    "--nice-c3",
    "--nice-c4",
    "--nice-c5",
    "--nice-c6",
  ];

  let ran_col = col_list[Math.floor(Math.random() * (col_list.length - 1))];
  return ran_col;
}
