document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartList = document.getElementById('cart-list');

  // Lấy danh sách sản phẩm từ API
  fetch('/api/products')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
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

      // Gắn sự kiện thêm vào giỏ hàng
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: parseInt(productId) }),
          })
            .then(response => response.json())
            .then(message => {
              alert(message.message);
              loadCart();
            });
        });
      });
    });

  // Tải danh sách giỏ hàng từ API
  function loadCart() {
    cartList.innerHTML = ''; // Xóa nội dung cũ
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          cartList.innerHTML = '<p>Giỏ hàng trống.</p>';
        } else {
          data.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
              <h4>${product.name}</h4>
              <p>Giá: ${product.price.toLocaleString()} VNĐ</p>
            `;
            cartList.appendChild(cartItem);
          });
        }
      });
  }

  // Gọi loadCart khi tải trang
  loadCart();
});
