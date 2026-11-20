const products = [

    {
        id: 1,
        name: "Fresh Apples",
        category: "Fruits",
        price: 120,
        quantity: "1 kg",
        image: "🍎"
    },

    {
        id: 2,
        name: "Banana",
        category: "Fruits",
        price: 50,
        quantity: "1 dozen",
        image: "🍌"
    },

    {
        id: 3,
        name: "Fresh Tomato",
        category: "Vegetables",
        price: 40,
        quantity: "1 kg",
        image: "🍅"
    },

    {
        id: 4,
        name: "Broccoli",
        category: "Vegetables",
        price: 70,
        quantity: "500 g",
        image: "🥦"
    },

    {
        id: 5,
        name: "Milk",
        category: "Dairy",
        price: 60,
        quantity: "1 litre",
        image: "🥛"
    },

    {
        id: 6,
        name: "Cheese",
        category: "Dairy",
        price: 110,
        quantity: "200 g",
        image: "🧀"
    },

    {
        id: 7,
        name: "Potato Chips",
        category: "Snacks",
        price: 30,
        quantity: "1 pack",
        image: "🍟"
    },

    {
        id: 8,
        name: "Popcorn",
        category: "Snacks",
        price: 45,
        quantity: "1 pack",
        image: "🍿"
    },

    {
        id: 9,
        name: "Cold Drink",
        category: "Drinks",
        price: 50,
        quantity: "750 ml",
        image: "🥤"
    },

    {
        id: 10,
        name: "Orange Juice",
        category: "Drinks",
        price: 90,
        quantity: "1 litre",
        image: "🧃"
    },

    {
        id: 11,
        name: "Shampoo",
        category: "Personal Care",
        price: 180,
        quantity: "180 ml",
        image: "🧴"
    },

    {
        id: 12,
        name: "Face Wash",
        category: "Personal Care",
        price: 150,
        quantity: "100 ml",
        image: "🧼"
    }

];


let cart = [];


/* Display Products */

function displayProducts(productList = products) {

    const container = document.getElementById("productContainer");

    container.innerHTML = "";

    productList.forEach(product => {

        const productHTML = `

            <div class="product">

                <div class="product-image">
                    ${product.image}
                </div>

                <h3>${product.name}</h3>

                <p>${product.quantity}</p>

                <div class="product-bottom">

                    <span class="price">
                        ₹${product.price}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})">
                        ADD
                    </button>

                </div>

            </div>

        `;

        container.innerHTML += productHTML;

    });

}


/* Add Product */

function addToCart(id) {

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.qty++;

    } else {

        const product = products.find(item => item.id === id);

        cart.push({
            ...product,
            qty: 1
        });

    }

    updateCart();

}


/* Update Cart */

function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const totalQuantity = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    cartCount.innerText = totalQuantity;

    displayCart();

}


/* Display Cart */

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center; padding:30px;">
                Your cart is empty 🛒
            </p>
        `;

    }


    cart.forEach(item => {

        total += item.price * item.qty;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-icon">
                    ${item.image}
                </div>

                <div class="cart-item-info">

                    <b>${item.name}</b>

                    <p>₹${item.price}</p>

                    <div class="quantity">

                        <button onclick="changeQuantity(${item.id}, -1)">
                            -
                        </button>

                        <span>${item.qty}</span>

                        <button onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    cartTotal.innerText = total;

}


/* Quantity */

function changeQuantity(id, change) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {

        cart = cart.filter(product => product.id !== id);

    }

    updateCart();

}


/* Open Cart */

function openCart() {

    document.getElementById("cartSidebar")
        .classList.add("active");

    document.getElementById("cartOverlay")
        .classList.add("active");

}


/* Close Cart */

function closeCart() {

    document.getElementById("cartSidebar")
        .classList.remove("active");

    document.getElementById("cartOverlay")
        .classList.remove("active");

}


/* Search */

document.getElementById("searchInput")
    .addEventListener("input", function () {

        const search = this.value.toLowerCase();

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(search)
        );

        displayProducts(filtered);

    });


/* Category Filter */

function filterCategory(category) {

    const filtered = products.filter(
        product => product.category === category
    );

    displayProducts(filtered);

    document.getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* Show All */

function showAllProducts() {

    displayProducts(products);

}


/* Shop Now */

function scrollToProducts() {

    document.getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* Checkout */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert(
        "Order placed successfully! 🎉\n\n" +
        "Thank you for shopping with QuickCart."
    );

}


/* Initial Load */

displayProducts();
updateCart();