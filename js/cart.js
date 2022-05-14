function initCartNumber() {
  const itemsNumbers = localStorage.getItem('cartNumbers');
  document.querySelector('.basket span').textContent = !!itemsNumbers ? itemsNumbers : 0
}

function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('productsInCart'))
  const totalPrice = localStorage.getItem('totalPrice')

  const productsContainer = document.querySelector('.products-container')
  const totalCount = document.getElementById('total-count');

  if (cartItems && productsContainer) {
    productsContainer.innerHTML = '';
    totalCount.innerHTML = `${totalPrice} ₴`;
    Object.values(cartItems).map(item => {
      productsContainer.innerHTML += populateCartItemContent(item);
    })
  } else {
    productsContainer.innerHTML = `
        <h1 class="empty-cart-text">Корзина порожня</h1>
        `
  }

  if (!cartItems) {
    document.querySelector('.list-group-item').style = 'display: none';
  }

  const removeButtons = document.querySelectorAll('.btn-minus')
  const addButtons = document.querySelectorAll('.btn-plus')
  if (!!cartItems) {
    handleRemoveAction(cartItems, removeButtons)
    handleAddAction(cartItems, addButtons)
  }
}

function populateCartItemContent(item) {
  return `
  <div class="rov">
  <ul class="list-group">
    <li class="list-group-item">
      <div class="row g-0 position-relative">
        <div class="col-md-6 mb-md-0 p-md-4">
          <img
            src="${item.img}"
            class="w-100"
            alt="..."
          />
        </div>
        <div
          class="
            col-md-6
            p-4
            ps-md-0
            d-flex
            flex-column
            justify-content-between
          "
        >
          <h2 class="mt-0">${item.name}</h2>
          <h4>${item.price * item.inCart} грн</h4>
          <div class="btn-ptc d-flex">
            <button class="btn-minus"></button>
            <div>${item.inCart}</div>
            <button class="btn-plus"></button>
          </div>
          <button class="delete-btn">Видалити</button>
        </div>
      </div>
    </li>
  </ul>
</div>
  `
}

function handleAddAction(cartItems, addButtons) {
  const items = Object.values(cartItems)
  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', () => {
      addNumbersToCart(items[i])
      totalItemsPrice(items[i])
    })
  }
}

function handleRemoveAction(cartItems, removeButtons) {
  const items = Object.values(cartItems)
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', () => {
      removeNumbersFromCart(items[i]);
    })
  }
}

function addNumbersToCart(product) {
  let itemsNumbers = parseInt(localStorage.getItem('cartNumbers'));
  localStorage.setItem('cartNumbers', !!itemsNumbers ? itemsNumbers + 1 : 1)
  document.querySelector('.basket span').textContent = !!itemsNumbers ? itemsNumbers + 1 : 1
  setItems(product)
}

function removeNumbersFromCart(product) {
  console.log('product: ', product);
}

function setItems(product) {
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'))
  if (!!cartItems) {
      if (!cartItems[product.tag]) {
          cartItems = {
              ...cartItems,
              [product.tag]: product
          }
      }
      cartItems[product.tag].inCart += 1
  } else {
      product.inCart = 1;
      cartItems = {
          [product.tag]: product
      }
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  displayCartItems();
}

function totalItemsPrice(product) {
  let totalPrice = localStorage.getItem('totalPrice');

  if (!!totalPrice) {
      totalPrice = parseInt(totalPrice);
      localStorage.setItem('totalPrice', totalPrice + product.price)
  } else {
      localStorage.setItem('totalPrice', product.price)
  }
}

function initCartNumbers() {
  let itemsNumbers = localStorage.getItem('cartNumbers');

  if (itemsNumbers) {
      document.querySelector('.basket span').textContent = itemsNumbers;
  }
}

function deleteAllItems() {
  const deleteBtn = document.querySelector('.delete-all-items');
  deleteBtn.addEventListener('click', () => {
    localStorage.clear();
    initCartNumber();
    displayCartItems();
  })
}

deleteAllItems();
initCartNumber();
displayCartItems();
