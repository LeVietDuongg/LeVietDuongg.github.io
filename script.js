const API_URL = 'https://web-production-8e6a.up.railway.app';

// Hàm đăng ký
async function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message || 'Đăng ký thất bại!');
        }
    } catch (err) {
        console.error('Lỗi khi đăng ký:', err);
        alert('Lỗi kết nối!');
    }
}

// Gắn sự kiện đăng ký
document.getElementById('register-btn').addEventListener('click', registerUser);

// Hàm lấy danh sách sản phẩm
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        const products = await response.json();

        const productContainer = document.getElementById('product-list');
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} VNĐ</p>
                <img src="${product.image}" alt="${product.name}">
            `;
            productContainer.appendChild(productDiv);
        });
    } catch (err) {
        console.error('Lỗi khi lấy sản phẩm:', err);
    }
}

// Gọi hàm lấy sản phẩm khi tải trang
document.addEventListener('DOMContentLoaded', fetchProducts);
