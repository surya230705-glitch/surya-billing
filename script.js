let bills = JSON.parse(localStorage.getItem("bills")) || [];
let oldBalance = 0;

// DOM elements
const shop = document.getElementById("shop");
const number = document.getElementById("number");
const total = document.getElementById("total");
const paid = document.getElementById("paid");
const balance = document.getElementById("balance");
const homePage = document.getElementById("homePage");
const historyPage = document.getElementById("historyPage");
const historyTable = document.getElementById("historyTable");

// Event listeners
paid.addEventListener("input", calcBalance);
total.addEventListener("input", calcBalance);

// Calculate balance
function calcBalance() {
  let totalVal = Number(total.value);
  let paidVal = Number(paid.value);
  balance.value = (totalVal + oldBalance) - paidVal;
}

// Save bill
function saveBill() {
  if (!shop.value || !total.value || !paid.value) {
    alert("⚠️ Please fill all required fields!");
    return;
  }

  const bill = {
    shop: shop.value,
    number: number.value,
    total: Number(total.value),
    paid: Number(paid.value),
    balance: Number(balance.value)
  };

  bills.push(bill);
  localStorage.setItem("bills", JSON.stringify(bills));
  oldBalance = Number(balance.value);

  alert("✅ Bill saved successfully!");

  // Reset form
  shop.value = "";
  number.value = "";
  total.value = "";
  paid.value = "";
  balance.value = "";
}

// Show history
function showHistory() {
  homePage.style.display = "none";
  historyPage.style.display = "block";
  loadHistory();
}

// Show home
function showHome() {
  historyPage.style.display = "none";
  homePage.style.display = "block";
}

// Load history
function loadHistory() {
  historyTable.innerHTML = "";
  bills.forEach((b, i) => {
    historyTable.innerHTML += `
      <tr>
        <td>${b.shop}</td>
        <td>${b.total}</td>
        <td>${b.paid}</td>
        <td>${b.balance}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="useBill(${i})"><i class="bi bi-pencil"></i> Use</button>
          <button class="btn btn-sm btn-danger" onclick="deleteBill(${i})"><i class="bi bi-trash"></i> Delete</button>
        </td>
      </tr>
    `;
  });
}

// Delete bill
function deleteBill(index) {
  if (confirm("Are you sure you want to delete this bill?")) {
    bills.splice(index, 1);
    localStorage.setItem("bills", JSON.stringify(bills));
    loadHistory();
  }
}

// Use bill to prefill form
function useBill(index) {
  const b = bills[index];
  shop.value = b.shop;
  number.value = b.number;
  total.value = b.total;
  paid.value = b.paid;
  balance.value = b.balance;
  showHome();
}
