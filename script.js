// Product Data
const productsData = [
  {
    id: 1,
    name: 'Vestido Elegante de Verano',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1637690048998-1e41c61c254d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tZW4lMjBkcmVzcyUyMGZhc2hpb258ZW58MXx8fHwxNzc1MjQ2NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Vestidos',
    description: 'Hermoso vestido de verano con diseño fluido, perfecto para cualquier ocasión. Hecho con tela de alta calidad y diseño elegante.',
  },
  {
    id: 2,
    name: 'Bolso de Diseñador',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1761646238279-30de81702a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwaGFuZGJhZyUyMHB1cnNlfGVufDF8fHx8MTc3NTI0NjQ4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accesorios',
    description: 'Bolso elegante y espacioso con múltiples compartimentos. Perfecto para uso diario o ocasiones especiales.',
  },
  {
    id: 3,
    name: 'Tacones Clásicos',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1621996659490-3275b4d0d951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHNob2VzJTIwaGVlbHN8ZW58MXx8fHwxNzc1MjQ2NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Zapatos',
    description: 'Tacones cómodos y elegantes que complementan cualquier atuendo. Disponibles en múltiples tallas y colores.',
  },
  {
    id: 4,
    name: 'Collar de Oro',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1769116416641-e714b71851e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbmVja2xhY2UlMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NzUyNDY0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Joyería',
    description: 'Elegante collar bañado en oro que añade sofisticación a cualquier look. Hipoalergénico y duradero.',
  },
  {
    id: 5,
    name: 'Gafas de Sol Fashion',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1732139637237-a781abbd198c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHN1bmdsYXNzZXMlMjBmYXNoaW9ufGVufDF8fHx8MTc3NTI0NjQ4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accesorios',
    description: 'Gafas de sol modernas con protección UV. Perfectas para días soleados y actividades al aire libre.',
  },
  {
    id: 6,
    name: 'Blusa Casual',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1760552070057-db7adfeddc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB3b21lbiUyMGJsb3VzZXxlbnwxfHx8fDE3NzUyNDY0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Blusas',
    description: 'Blusa cómoda y versátil para uso diario. Fácil de combinar con cualquier prenda.',
  },
];

// Get products
function getProducts() {
  return productsData;
}

// Cart Management
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) return;

  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  
  // Show feedback
  alert(`¡${product.name} agregado al carrito!`);
}

function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCart(updatedCart);
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
  }
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}