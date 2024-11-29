// Đường dẫn API
const API_URL = 'https://web-production-8e6a.up.railway.app';

// Hàm đăng ký người dùng
async function registerUser() {
    const username = document.getElementById('username').value.trim(); // Loại bỏ khoảng trắng
    const password = document.getElementById('password').value;

    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
    if (!username || !password) {
        alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
        return;
    }

    try {
        // Gửi yêu cầu đăng ký tới API
        const response = await fetch(`${API_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Gửi dữ liệu ở dạng JSON
        });

        // Xử lý phản hồi từ API
        const result = await response.json();
        if (response.ok) {
            alert(result.message || 'Đăng ký thành công!');
        } else {
            alert(result.message || 'Đăng ký thất bại!'); // Hiển thị thông báo lỗi từ API
        }
    } catch (err) {
        console.error('Lỗi kết nối hoặc xử lý:', err);
        alert('Không thể kết nối tới server. Vui lòng thử lại sau.');
    }
}

// Gắn sự kiện vào nút đăng ký
document.getElementById('register-btn').addEventListener('click', registerUser);
// Hàm lấy danh sách sản phẩm
async function fetchProducts() {
    try {
        // Gửi yêu cầu lấy sản phẩm từ API
        const response = await fetch(`${API_URL}/api/products`);

        // Chuyển đổi phản hồi sang JSON
        const products = await response.json();

        // Kiểm tra xem dữ liệu nhận được có phải là một danh sách không
        if (!Array.isArray(products)) {
            throw new Error('Dữ liệu sản phẩm không hợp lệ!');
        }

        // Hiển thị danh sách sản phẩm
        const productContainer = document.getElementById('product-list');
        productContainer.innerHTML = ''; // Xóa nội dung cũ

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${Number(product.price).toLocaleString()} VNĐ</p>
                <img src="${product.image}" alt="${product.name}" style="max-width: 200px;">
            `;
            productContainer.appendChild(productDiv);
        });
    } catch (err) {
        console.error('Lỗi khi lấy sản phẩm:', err);
        alert('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
    }
}

// Gọi hàm lấy sản phẩm khi trang được tải
document.addEventListener('DOMContentLoaded', fetchProducts);
