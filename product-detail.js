document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const product = products.find(p => p.id === productId);
    
    if (product) {
        document.getElementById('main-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = 
            `${product.price.toLocaleString()} VNĐ`;
        document.getElementById('product-description').textContent = 
            product.description;

        document.getElementById('add-to-cart').addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            for (let i = 0; i < quantity; i++) {
                addToCart(product.id);
            }
            alert('Đã thêm vào giỏ hàng!');
        });
    }
});