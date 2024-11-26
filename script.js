// Đường dẫn API
const API_URL = 'https://web-production-8e6a.up.railway.app';

// Xử lý nút đăng nhập
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
async function fetchCart() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/cart`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const cartData = await response.json();
            console.log('Dữ liệu giỏ hàng:', cartData);
        } else {
            console.error('Không thể tải giỏ hàng:', response.statusText);
        }
    } catch (error) {
        console.error('Lỗi khi tải giỏ hàng:', error);
    }
}

// Hàm đăng nhập
loginBtn.addEventListener('click', () => {
    window.location.href = 'auth.html';
});

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('token'); // Xóa token
    alert('Đã đăng xuất!');
    updateAuthButtons(false); // Cập nhật nút
}

// Cập nhật hiển thị nút đăng nhập/đăng xuất
function updateAuthButtons(isLoggedIn) {
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    updateAuthButtons(!!token); // Cập nhật nút dựa vào trạng thái token
});

// Gắn sự kiện click cho nút
loginBtn.addEventListener('click', login);
logoutBtn.addEventListener('click', logout);


// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Update product display function
document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();

    // Load featured products
    const featuredProducts = products.slice(0, 3);
    const featuredContainer = document.getElementById('featured-products');
    
    if (featuredContainer) {
        featuredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} VNĐ</p>
                <a href="product-detail.html?id=${product.id}" class="view-detail">Xem chi tiết</a>
            `;
            featuredContainer.appendChild(productDiv);
        });
    }

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function updateCartDisplay() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';

        if (cart.length === 0) {
            cartList.innerHTML = '<p>Giỏ hàng trống</p>';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} VNĐ</p>
                </div>
                <button onclick="removeFromCart(${index})">Xóa</button>
            `;
            cartList.appendChild(cartItem);
        });

        cartList.innerHTML += `
            <div class="cart-total">
                <h3>Tổng cộng: ${total.toLocaleString()} VNĐ</h3>
                <button onclick="checkout()">Thanh toán</button>
            </div>
        `;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }

    function checkout() {
        if (confirm('Xác nhận thanh toán?')) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
            alert('Thanh toán thành công!');
        }
    }

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCartDisplay();
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    updateCartCount();
});