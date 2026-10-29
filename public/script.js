
const form = document.getElementById("itemForm");
const itemId = document.getElementById("itemId");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const itemsTable = document.getElementById("itemsTable");
const message = document.getElementById("message");

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

function showMessage(text) {
  message.textContent = text;
}

async function loadItems() {
  try {
    const items = await request("/api/items");
    itemsTable.replaceChildren();

    if (items.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 4;
      cell.textContent = "No items available.";
      row.appendChild(cell);
      itemsTable.appendChild(row);
      return;
    }

    items.forEach((item) => {
      const row = document.createElement("tr");

      [item.id, item.name, item.price.toFixed(2)].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      const actions = document.createElement("td");

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-btn";
      editButton.addEventListener("click", () => {
        itemId.value = item.id;
        nameInput.value = item.name;
        priceInput.value = item.price;
        submitBtn.textContent = "Update";
        cancelBtn.hidden = false;
        showMessage("Editing item " + item.id);
        nameInput.focus();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-btn";
      deleteButton.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
          await request(`/api/items/${item.id}`, {
            method: "DELETE"
          });
          showMessage("Item deleted successfully.");
          await loadItems();
        } catch (error) {
          showMessage(error.message);
        }
      });

      actions.append(editButton, deleteButton);
      row.appendChild(actions);
      itemsTable.appendChild(row);
    });
  } catch (error) {
    showMessage(error.message);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const editing = itemId.value !== "";
  const url = editing
    ? `/api/items/${itemId.value}`
    : "/api/items";

  try {
    await request(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        price: priceInput.value
      })
    });

    showMessage(editing ? "Item updated successfully." : "Item added successfully.");
    form.reset();
    itemId.value = "";
    submitBtn.textContent = "Submit";
    cancelBtn.hidden = true;
    await loadItems();
  } catch (error) {
    showMessage(error.message);
  }
});

cancelBtn.addEventListener("click", () => {
  form.reset();
  itemId.value = "";
  submitBtn.textContent = "Submit";
  cancelBtn.hidden = true;
  showMessage("Edit cancelled.");
});

loadItems();
