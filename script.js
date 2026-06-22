// ====================== BrokenAlgorithm - JavaScript ======================

document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { id: 1, name: "Techwear Jacket",     price: 79,  category: "Techwear",   img: "images/techwear-jacket.png" },
        { id: 2, name: "Neon Sneakers",       price: 129, category: "Accessories", img: "images/neon-sneakers.png" },
        { id: 3, name: "Glitch Hoodie",       price: 89,  category: "Cyberpunk",  img: "images/glitch-hoodie.png" },
        { id: 4, name: "Digital Watch",       price: 59,  category: "Accessories", img: "images/digital-watch.png" },
        { id: 5, name: "Futuristic Sunglasses", price: 49, category: "Cyberpunk", img: "images/futuristic-sunglasses.png" },
        { id: 6, name: "Techwear Pants",      price: 99,  category: "Techwear",   img: "images/techwear-pants.png" },
        { id: 7, name: "Holographic Bag",     price: 79,  category: "Accessories", img: "images/holographic-bag.png" },
        { id: 8, name: "LED Cap",             price: 39,  category: "Cyberpunk",  img: "images/led-cap.png" },
        { id: 9, name: "Futuristic Gloves",   price: 29,  category: "Techwear",   img: "images/gloves.png" }
    ];

    let cart = [];

    const cartBtn = document.getElementById('cart-btn');
    const cartCount = document.getElementById('cart-count');
    const productGrid = document.getElementById('products-grid');
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close');

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function addToCart(product) {
        cart.push(product);
        updateCartCount();
        
        const notif = document.createElement('div');
        notif.style.cssText = `position:fixed; bottom:20px; right:20px; background:#00FF00; color:#000; padding:14px 24px; border-radius:4px; z-index:3000;`;
        notif.textContent = `${product.name} добавлен в корзину`;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 2500);
    }

    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">$${product.price}</div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('add-to-cart-btn')) showProductModal(product);
            });

            card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(product);
            });

            productGrid.appendChild(card);
        });
    }

    function showProductModal(product) {
        modalBody.innerHTML = `
            <div style="display:flex; gap:40px; padding:40px;">
                <img src="${product.img}" style="width:420px; height:420px; object-fit:cover;" alt="${product.name}">
                <div>
                    <h2 style="font-size:32px; margin-bottom:16px;">${product.name}</h2>
                    <p style="font-size:28px; color:#00FF00; margin-bottom:24px;">$${product.price}</p>
                    <button class="btn-primary" style="width:100%; padding:16px;" id="modal-add">Добавить в корзину</button>
                </div>
            </div>
        `;
        modal.style.display = 'flex';

        document.getElementById('modal-add').onclick = () => addToCart(product);
    }

    // События
    cartBtn.addEventListener('click', () => {
        alert(cart.length ? 'Корзина работает!' : 'Корзина пуста');
    });

    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    // Запуск
    renderProducts();
    updateCartCount();
});