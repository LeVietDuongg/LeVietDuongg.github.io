document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');

    function displayProducts(filteredProducts) {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} VNĐ</p>
                <a href="product-detail.html?id=${product.id}" class="view-detail">
                    Xem chi tiết
                </a>
            `;
            productList.appendChild(productDiv);
        });
    }

    categoryFilter.addEventListener('change', (e) => {
        const category = e.target.value;
        const filteredProducts = category ? 
            products.filter(p => p.category === category) : 
            products;
        displayProducts(filteredProducts);
    });

    displayProducts(products);
});