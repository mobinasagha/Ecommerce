let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");

    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        id: id,
        name: name,
        price: parseFloat(price),
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  });
});

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
  <h3>${item.name}</h3>
  <div class="item-title"><p>قیمت: ${item.price} تومان</p>
  <p class="change">تعداد: <button class="decrease-qty" data-id="${item.id}">-</button> ${item.quantity} <button class="increase-qty" data-id="${item.id}">+</button></p>
  <button class="remove-item" data-id="${item.id}">حذف</button></div>
`;

    cartItemsContainer.appendChild(itemDiv);
    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.innerText = totalPrice;

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    });
  });

  document.querySelectorAll(".decrease-qty").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const product = cart.find((item) => item.id === id);
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        cart = cart.filter((item) => item.id !== id);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    });
  });

  document.querySelectorAll(".increase-qty").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const product = cart.find((item) => item.id === id);
      product.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    });
  });
}

document.addEventListener("DOMContentLoaded", updateCartUI);
