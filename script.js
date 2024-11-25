document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {"id": 1, "name": "Áo thun nam", "price": 120000, "image": "https://th.bing.com/th/id/OIP._cFXyvl6CYFMo1QRizPoSgHaKs?rs=1&pid=ImgDetMain"},
        {"id": 2, "name": "Quần jeans nữ", "price": 350000, "image": "https://cf.shopee.vn/file/a7624da479e934e6776218d26135f4d0"},
        {"id": 3, "name": "Giày thể thao", "price": 600000, "image": "https://salt.tikicdn.com/ts/tmp/72/99/3d/6b8c1b6cc9094dc866dcbefab72fc9cc.jpg"},
        {"id": 4, "name": "Túi xách", "price": 450000, "image": "https://thuthuatnhanh.com/wp-content/uploads/2022/05/Mau-tui-xach-nu-dep-gia-re.jpg"}
    ];
  
    const productList = document.getElementById('product-list');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function updateCart() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        
        if (cart.length === 0) {
            cartList.innerHTML = '<p>Giỏ hàng trống.</p>';
            return;
        }
  
        let totalPrice = 0;
        
        cart.forEach((product, index) => {
            totalPrice += product.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h4>${product.name}</h4>
                <p>Giá: ${product.price.toLocaleString()} VNĐ</p>
                <button class="remove-from-cart" data-index="${index}">Xóa</button>
            `;
            cartList.appendChild(cartItem);
        });
  
        // Thêm tổng tiền và nút thanh toán
        const totalDiv = document.createElement('div');
        totalDiv.className = 'cart-total';
        totalDiv.innerHTML = `
            <h3>Tổng tiền: ${totalPrice.toLocaleString()} VNĐ</h3>
            <button id="checkout-btn" class="checkout-btn">Thanh toán</button>
        `;
        cartList.appendChild(totalDiv);
  
        // Thêm sự kiện cho nút xóa
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });
  
        // Thêm sự kiện cho nút thanh toán
        document.getElementById('checkout-btn').addEventListener('click', () => {
            if(confirm('Xác nhận thanh toán?')) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
                alert('Thanh toán thành công!');
            }
        });
    }
  
    // Hiển thị sản phẩm
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Giá: ${product.price.toLocaleString()} VNĐ</p>
            <img src="${product.image}" alt="${product.name}">
            <button class="add-to-cart" data-id="${product.id}">Thêm vào giỏ hàng</button>
        `;
        productList.appendChild(productDiv);
    });
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
                alert('Thêm vào giỏ hàng thành công!');
            }
        });
    });
  
    updateCart();
  });