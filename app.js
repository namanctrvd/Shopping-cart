// variables 

const cartBtn = document.querySelector(".cart-btn");
const closeCartBrn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productDOM = document.querySelector(".products-center");

// cart
let cart = [];

// buttons 
buttonssDOM  = [];

// getting the prducts 
class Products {
    async getProducts() {
        try {
            let result = await fetch("products.json");
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image }
            })
            return products;
        } catch (error) {
            console.log(errors)
        }
    }
};

// display products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} class="product-img" alt="product" />
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart">add to bag</i>
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4><i class="fa-solid fa-indian-rupee-sign"></i> ${product.price}</h4>
            </article>
            `;
        });
        productDOM.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttonssDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id ===id);
            if(inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
            button.addEventListener("click", event => {
                event.target.innerText = "in Cart";
                event.target.disabled = true;
                // get product from products
                let cartItem = {...Storage.getProduct(id), amount: 1 };
                // add product to the cart
                cart = [ ...cart, cartItem];
                // save cart item in the local storage
                Storage.saveCart(cart);
                // set cart values
                this.setCartValues(cart);
            });
            
        });
    };
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
        console.log(cartTotal, cartItems);
    }
};

// loacl storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    };
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    };
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
    });
});


