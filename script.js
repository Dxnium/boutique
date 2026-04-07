// Script para index.html (Página principal)
document.addEventListener('DOMContentLoaded', () => {
    let selectedCategory = 'Todo';
    
    // Renderizar productos
    function renderProducts() {
        const grid = document.getElementById('productGrid');
        const filteredProducts = selectedCategory === 'Todo' 
            ? products 
            : products.filter(p => p.category === selectedCategory);
        
        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="product-image"
                    onclick="window.location.href='product-detail.html?id=${product.id}'"
                >
                <div class="product-info">
                    <h3 class="product-name" onclick="window.location.href='product-detail.html?id=${product.id}'">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="handleAddToCart(${product.id})">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Manejar filtro de categorías
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCategory = btn.dataset.category;
            renderProducts();
        });
    });
    
    // Renderizar productos inicialmente
    renderProducts();
});

function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product);
        alert('Producto agregado al carrito');
    }
}
