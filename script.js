

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
