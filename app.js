// variables 

const cartBtn = document.querySelector(".cart-btn");
const closeCartBrn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const carttotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productDOM = document.querySelector(".products-center");

// cart
let cart = [];

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
        console.log(products)
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
};

// loacl storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    });
});


