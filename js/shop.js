let shopProducts = document.querySelector('.shop-products');

const products = [
    {
        name: 'Dodge Charger Hellcat',
        tag: 'dodge',
        price: 50,
        img: '../img/shop-model/Dodge%20Charger%20Hellcat.jpg',
        inCart: 0
    },
    {
        name: 'Honda Civic FD2 Mugen RR',
        tag: 'honda',
        price: 40,
        img: '../img/shop-model/Honda%20Civic%20FD2%20Mugen%20RR.jpg',
        inCart: 0
    },
    {
        name: 'Mercedes Benz S65 AMG',
        tag: 'mercedesS',
        price: 60,
        img: '../img/shop-model/Mercedes%20Benz%20S65%20AMG.jpg',
        inCart: 0
    },
    {
        name: 'Mercedes-Benz G65 AMG',
        tag: 'mercedesG',
        price: 80,
        img: '../img/shop-model/Mercedes-Benz%20G65%20AMG.jpg',
        inCart: 0
    },
    {
        name: 'Jonik',
        tag: 'jonik',
        price: 30,
        img: '../img/shop-model/skin1.jpg',
        inCart: 0
    },
    {
        name: 'Young fashionista',
        tag: 'fashionista',
        price: 30,
        img: '../img/shop-model/skin2.jpg',
        inCart: 0
    },
    {
        name: 'Nightclub security guard',
        tag: 'guard',
        price: 30,
        img: '../img/shop-model/skin3.jpg',
        inCart: 0
    },
    {
        name: 'Alpinist Green',
        tag: 'alpinist',
        price: 30,
        img: '../img/shop-model/skin4.jpg',
        inCart: 0
    },

]

function initShopItems() {
    products.map(product => {
        shopProducts.innerHTML += `
        <div class="col-md-6 col-xs-12">
        <div class="card">
          <div class="my-card-img">
            <img
              src="${product.img}"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <a href="#" class="btn btn-primary btn-1 add-item"
              ><div>Купити</div></a
            >
            <span>${product.price} грн.</span>
          </div>
        </div>
      </div>
        `
    })

    const items = document.querySelectorAll('.add-item')
    handleProductEvent(items)
}

function handleProductEvent(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', () => {
            cardNumbers(products[i])
            totalItemsPrice(products[i])
        })
    }
}

function cardNumbers(product) {
    console.log('product: ', product);
    let itemsNumbers = parseInt(localStorage.getItem('cartNumbers'));
    localStorage.setItem('cartNumbers', !!itemsNumbers ? itemsNumbers + 1 : 1)
    document.querySelector('.basket span').textContent = !!itemsNumbers ? itemsNumbers + 1 : 1

    setItems(product)
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
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
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

initShopItems();
initCartNumbers();