const productForm = document.getElementById("add-product-form");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productList = document.getElementById("products");

let products = [];

function addProduct() {
  const name = productName.value.trim();
  const price = Number(productPrice.value);
  if (name && price) {
    const product = { name, price };
    products.push(product);
    displayProduct(product);
    clearForm();
  } else {
    showError("Please fill in all fields.");
  }
}

function displayProduct(product) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${product.name} - ${product.price}</span>
    <button class="edit-button" data-id="${products.indexOf(product)}">Edit</button>
    <button class="delete-button" data-id="${products.indexOf(product)}">Delete</button>
  `;
  productList.appendChild(li);
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
}

function showError(message) {
  alert(message);
}

function editProduct(event) {
  const button = event.target;
  const id = button.getAttribute("data-id");
  const product = products[id];
  const name = prompt("Enter new product name", product.name);
  const price = Number(prompt("Enter new product price", product.price));
  if (name && price) {
    product.name = name;
    product.price = price;
    updateProduct(product, id);
  } else {
    showError("Please fill in all fields.");
  }
}

function updateProduct(product, id) {
  const li = productList.children[id];
  li.innerHTML = `
    <span>${product.name} - ${product.price}</span>
    <button class="edit-button" data-id="${id}">Edit</button>
    <button class="delete-button" data-id="${id}">Delete</button>
  `;
}

function deleteProduct(event) {
  const button = event.target;
  const id = button.getAttribute("data-id");
  products.splice(id, 1);
  productList.removeChild(productList.children[id]);
  for (let i = id; i < products.length; i++) {
    const li = productList.children[i];
    const editButton = li.querySelector(".edit-button");
    const deleteButton = li.querySelector(".delete-button");
    editButton.setAttribute("data-id", i);
    deleteButton.setAttribute("data-id", i);
  }
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addProduct();
});

productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    editProduct(event);
  } else if (event.target.classList.contains("delete-button")) {
    deleteProduct(event);
  }
});
