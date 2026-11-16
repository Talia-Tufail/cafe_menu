// 1. Send selected coffee from Menu page to Order page
function quickSelect(coffeeName) {
  localStorage.setItem("selectedCoffee", coffeeName);
  window.location.href = "order.html";
}

// 2. Auto-select coffee if customer clicked "Order This" on the Menu page
window.onload = function () {
  const savedCoffee = localStorage.getItem("selectedCoffee");
  const dropdown = document.getElementById("coffeeChoice");

  if (savedCoffee && dropdown) {
    for (let i = 0; i < dropdown.options.length; i++) {
      if (dropdown.options[i].getAttribute("data-name") === savedCoffee) {
        dropdown.selectedIndex = i;
        break;
      }
    }
    localStorage.removeItem("selectedCoffee");
    calculateTotal();
  }
};

// 3. Live bill calculator on the Order page
function calculateTotal() {
  const dropdown = document.getElementById("coffeeChoice");
  const qtyInput = document.getElementById("quantity");
  const totalDisplay = document.getElementById("totalDisplay");

  if (!dropdown || !qtyInput || !totalDisplay) return;

  const price = parseInt(dropdown.value);
  const qty = parseInt(qtyInput.value) || 1;
  const total = price * qty;

  totalDisplay.textContent = "Total Bill: Rs. " + total;
}

// 4. Upgraded Order Confirmation (keeps your alert + shows an on-page receipt!)
function confirmOrder(event) {
  event.preventDefault();

  const name = document.getElementById("customerName").value;
  const dropdown = document.getElementById("coffeeChoice");
  const coffeeName = dropdown.options[dropdown.selectedIndex].getAttribute("data-name");
  const price = parseInt(dropdown.value);
  const qty = parseInt(document.getElementById("quantity").value);
  const notes = document.getElementById("notes").value || "None";
  const total = price * qty;

  // Your original alert message!
  alert("Hey " + name + "! You confirmed your order for " + qty + "x " + coffeeName + ".");

  // Display clean receipt card on screen
  const receiptBox = document.getElementById("receiptBox");
  receiptBox.style.display = "block";
  receiptBox.innerHTML = `
    <h3>✅ Order Confirmed!</h3>
    <p><strong>Customer:</strong> ${name}</p>
    <p><strong>Item:</strong> ${qty}x ${coffeeName}</p>
    <p><strong>Notes:</strong> ${notes}</p>
    <p><strong>Total Paid:</strong> Rs. ${total}</p>
  `;
}