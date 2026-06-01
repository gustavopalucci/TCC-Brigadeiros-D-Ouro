/* ============================================================
   BRIGADEIROS D'OURO — script.js
   Lógica completa: Auth, Catálogo, Carrinho, Checkout, Pedidos
   ============================================================ */

'use strict';

/* ============================================================
   DADOS: PRODUTOS
   ============================================================ */
const PRODUCTS = [
  // Clássicos
  {
    id: 1, category: 'classic', emoji: '🍫',
    name: 'Brigadeiro Tradicional',
    desc: 'O clássico irresistível: chocolate ao leite cremoso com granulado belga.',
    weight: '25g', unit: 'por unidade',
    price: 5.50, badge: 'popular', badgeLabel: 'Popular'
  },
  {
    id: 2, category: 'classic', emoji: '🤍',
    name: 'Branco com Coco',
    desc: 'Brigadeiro branco aveludado com flocos de coco fresco ralado.',
    weight: '25g', unit: 'por unidade',
    price: 5.50, badge: null
  },
  {
    id: 3, category: 'classic', emoji: '🍬',
    name: 'Doce de Leite',
    desc: 'Recheio de doce de leite artesanal com cobertura de granulado dourado.',
    weight: '25g', unit: 'por unidade',
    price: 6.00, badge: null
  },
  {
    id: 4, category: 'classic', emoji: '🥜',
    name: 'Amendoim',
    desc: 'Brigadeiro de amendoim torrado com cobertura crocante de granulado.',
    weight: '25g', unit: 'por unidade',
    price: 5.50, badge: null
  },
  // Especiais
  {
    id: 5, category: 'special', emoji: '🍓',
    name: 'Morango com Chocolate',
    desc: 'Brigadeiro de chocolate com pedaços de morango fresco e calda.',
    weight: '30g', unit: 'por unidade',
    price: 7.50, badge: 'especial', badgeLabel: 'Especial'
  },
  {
    id: 6, category: 'special', emoji: '🫐',
    name: 'Mirtilo & Cream Cheese',
    desc: 'Combinação surpreendente de mirtilo com cream cheese artesanal.',
    weight: '30g', unit: 'por unidade',
    price: 8.00, badge: 'novo', badgeLabel: 'Novo'
  },
  {
    id: 7, category: 'special', emoji: '🥥',
    name: 'Maracujá com Coco',
    desc: 'Brigadeiro de maracujá com cobertura de coco tostado e raspas de limão.',
    weight: '30g', unit: 'por unidade',
    price: 7.50, badge: null
  },
  {
    id: 8, category: 'special', emoji: '☕',
    name: 'Café Expresso',
    desc: 'Para os amantes de café: brigadeiro com extrato de café especial.',
    weight: '30g', unit: 'por unidade',
    price: 7.00, badge: 'popular', badgeLabel: 'Popular'
  },
  {
    id: 9, category: 'special', emoji: '🍋',
    name: 'Limão Siciliano',
    desc: 'Brigadeiro branco com raspas de limão siciliano e toque de gengibre.',
    weight: '30g', unit: 'por unidade',
    price: 7.50, badge: null
  },
  // Caixas
  {
    id: 10, category: 'box', emoji: '🎁',
    name: 'Caixa 9 unidades',
    desc: 'Caixa presente com 9 brigadeiros à sua escolha. Embalagem premium com laço.',
    weight: '225g', unit: 'caixa',
    price: 52.00, badge: 'popular', badgeLabel: 'Popular'
  },
  {
    id: 11, category: 'box', emoji: '🎀',
    name: 'Caixa 16 unidades',
    desc: 'Caixa luxo com 16 brigadeiros sortidos. Perfeita para presentes especiais.',
    weight: '400g', unit: 'caixa',
    price: 89.00, badge: null
  },
  {
    id: 12, category: 'box', emoji: '👑',
    name: 'Caixa Premium 25 un.',
    desc: 'Nossa maior caixa: 25 brigadeiros especiais com embalagem exclusiva D\'Ouro.',
    weight: '625g', unit: 'caixa',
    price: 135.00, badge: 'especial', badgeLabel: 'Especial'
  },
  // Sazonais
  {
    id: 13, category: 'seasonal', emoji: '🎄',
    name: 'Panetone de Brigadeiro',
    desc: 'Edição especial de Natal: brigadeiro com frutas cristalizadas e especiarias.',
    weight: '35g', unit: 'por unidade',
    price: 9.00, badge: 'sazonal', badgeLabel: 'Sazonal'
  },
  {
    id: 14, category: 'seasonal', emoji: '🐣',
    name: 'Ovo de Páscoa Recheado',
    desc: 'Ovo de chocolate belga recheado com brigadeiro cremoso. Edição limitada.',
    weight: '150g', unit: 'por unidade',
    price: 45.00, badge: 'sazonal', badgeLabel: 'Sazonal'
  },
  {
    id: 15, category: 'seasonal', emoji: '🍂',
    name: 'Canela & Mel',
    desc: 'Brigadeiro de inverno com canela do Ceilão e mel silvestre orgânico.',
    weight: '30g', unit: 'por unidade',
    price: 8.50, badge: 'novo', badgeLabel: 'Novo'
  }
];

/* ============================================================
   DADOS: DEPOIMENTOS
   ============================================================ */
const TESTIMONIALS = [
  {
    name: 'Ana Paula S.', initials: 'AP', stars: 5,
    text: 'Encomendei para o casamento da minha filha e foi um sucesso absoluto! Os convidados adoraram e ainda pediram o contato. Qualidade impecável!',
    info: 'Cliente há 3 anos'
  },
  {
    name: 'Carlos Mendes', initials: 'CM', stars: 5,
    text: 'O brigadeiro de café expresso é simplesmente divino. Peço toda semana e nunca decepciona. Entrega sempre no prazo e embalagem linda.',
    info: 'Cliente fiel'
  },
  {
    name: 'Fernanda Lima', initials: 'FL', stars: 5,
    text: 'Presente para minha mãe no aniversário dela. Ela chorou de emoção! A caixa premium é linda e os brigadeiros são os melhores que já comi.',
    info: 'Avaliação verificada'
  },
  {
    name: 'Roberto Alves', initials: 'RA', stars: 5,
    text: 'Trabalho em um escritório e toda semana faço pedido para o pessoal. Virou tradição! O atendimento é excelente e os sabores são únicos.',
    info: 'Pedido recorrente'
  },
  {
    name: 'Juliana Costa', initials: 'JC', stars: 5,
    text: 'Mirtilo com cream cheese é uma experiência gastronômica! Nunca imaginei que brigadeiro poderia ser tão sofisticado. Parabéns pela criatividade!',
    info: 'Cliente há 1 ano'
  },
  {
    name: 'Marcos Oliveira', initials: 'MO', stars: 5,
    text: 'Fiz encomenda para evento corporativo com 200 pessoas. Tudo perfeito: pontualidade, apresentação e sabor. Recomendo sem hesitar!',
    info: 'Evento corporativo'
  }
];

/* ============================================================
   ESTADO DA APLICAÇÃO
   ============================================================ */
let state = {
  user: null,
  cart: [],
  orders: [],
  currentProduct: null,
  detailQty: 1,
  selectedPayment: 'pix',
  catalogFilter: 'all'
};

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  loadState();
  renderProducts('all');
  renderTestimonials();
  initParticles();
  initScrollEvents();
  initRevealObserver();
  duplicateMarquee();
});

function initLoader() {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 700);
  }, 1800);
}

function loadState() {
  try {
    const saved = localStorage.getItem('bdouro_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.user   = parsed.user   || null;
      state.cart   = parsed.cart   || [];
      state.orders = parsed.orders || [];
    }
  } catch (e) { /* ignore */ }
  updateAuthUI();
  updateCartBadge();
}

function saveState() {
  localStorage.setItem('bdouro_state', JSON.stringify({
    user:   state.user,
    cart:   state.cart,
    orders: state.orders
  }));
}

/* ============================================================
   PARTÍCULAS DO HERO
   ============================================================ */
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 3;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${Math.random() * 0.4 + 0.1};
    `;
    container.appendChild(p);
  }
}

/* ============================================================
   SCROLL EVENTS
   ============================================================ */
function initScrollEvents() {
  const header = document.getElementById('main-header');
  const backTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    backTop.classList.toggle('visible', y > 400);
  });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initRevealObserver() {
  const els = document.querySelectorAll(
    '.about-grid, .product-card, .testimonial-card, .contact-grid, .about-feat, .about-num'
  );
  els.forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ============================================================
   MARQUEE DUPLICAÇÃO
   ============================================================ */
function duplicateMarquee() {
  const inner = document.querySelector('.floating-banner-inner');
  if (!inner) return;
  const clone = inner.cloneNode(true);
  inner.parentNode.appendChild(clone);
}

/* ============================================================
   SCROLL TO SECTION
   ============================================================ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  // Close mobile menu
  document.getElementById('nav-links').classList.remove('open');
}

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

/* ============================================================
   MODAL SYSTEM
   ============================================================ */
function openModal(id) {
  const modal = document.getElementById(id);
  const overlay = document.getElementById('modal-overlay');
  if (!modal) return;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('hidden');
  // Check if any other modal is open
  const anyOpen = document.querySelectorAll('.modal:not(.hidden)').length > 0;
  if (!anyOpen) {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.getElementById('modal-overlay').addEventListener('click', () => {
  document.querySelectorAll('.modal:not(.hidden)').forEach(m => m.classList.add('hidden'));
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
});

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
function showToast(msg, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  const icons = { success: '✅', error: '❌', info: '✨' };
  toast.innerHTML = `<span>${icons[type] || '✨'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ============================================================
   AUTH: LOGIN / CADASTRO
   ============================================================ */
function switchAuthTab(tab) {
  document.getElementById('form-login').classList.toggle('hidden', tab !== 'login');
  document.getElementById('form-register').classList.toggle('hidden', tab !== 'register');
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.innerHTML = isText ? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;

  if (!email || !pass) { showToast('Preencha e-mail e senha.', 'error'); return; }
  if (!isValidEmail(email)) { showToast('E-mail inválido.', 'error'); return; }

  // Load users from localStorage
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === btoa(pass));

  if (!user) { showToast('E-mail ou senha incorretos.', 'error'); return; }

  state.user = { id: user.id, name: user.name, surname: user.surname, email: user.email, phone: user.phone };
  saveState();
  updateAuthUI();
  closeModal('modal-auth');
  showToast(`Bem-vindo(a) de volta, ${user.name}! 🎉`, 'success');
}

function doRegister() {
  const name     = document.getElementById('reg-name').value.trim();
  const surname  = document.getElementById('reg-surname').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const phone    = document.getElementById('reg-phone').value.trim();
  const pass     = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;
  const terms    = document.getElementById('reg-terms').checked;

  if (!name || !surname || !email || !phone || !pass || !confirm) {
    showToast('Preencha todos os campos.', 'error'); return;
  }
  if (!isValidEmail(email)) { showToast('E-mail inválido.', 'error'); return; }
  if (pass.length < 6) { showToast('A senha deve ter pelo menos 6 caracteres.', 'error'); return; }
  if (pass !== confirm) { showToast('As senhas não coincidem.', 'error'); return; }
  if (!terms) { showToast('Aceite os Termos de Uso para continuar.', 'error'); return; }

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    showToast('Este e-mail já está cadastrado.', 'error'); return;
  }

  const newUser = {
    id: Date.now().toString(),
    name, surname, email, phone,
    password: btoa(pass),
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  localStorage.setItem('bdouro_users', JSON.stringify(users));

  state.user = { id: newUser.id, name, surname, email, phone };
  saveState();
  updateAuthUI();
  closeModal('modal-auth');
  showToast(`Conta criada com sucesso! Bem-vindo(a), ${name}! 🍫`, 'success');
}

function doLogout() {
  state.user = null;
  state.cart = [];
  saveState();
  updateAuthUI();
  updateCartBadge();
  document.getElementById('user-dropdown').classList.remove('open');
  showToast('Você saiu da sua conta.', 'info');
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem('bdouro_users') || '[]'); }
  catch (e) { return []; }
}

function updateAuthUI() {
  const btnLogin  = document.getElementById('btn-login-nav');
  const userMenu  = document.getElementById('user-menu');
  const nameDisp  = document.getElementById('user-name-display');
  if (state.user) {
    btnLogin.classList.add('hidden');
    userMenu.classList.remove('hidden');
    nameDisp.textContent = state.user.name;
  } else {
    btnLogin.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
}

function toggleUserDropdown() {
  document.getElementById('user-dropdown').classList.toggle('open');
  // Add open style
  const dd = document.getElementById('user-dropdown');
  if (dd.classList.contains('open')) {
    dd.style.display = 'block';
  } else {
    dd.style.display = '';
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================================
   CATÁLOGO: RENDERIZAÇÃO E FILTROS
   ============================================================ */
function renderProducts(filter) {
  const grid = document.getElementById('products-grid');
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" onclick="openProductDetail(${p.id})">
      <div class="product-img">
        <span>${p.emoji}</span>
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badgeLabel}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-meta">⚖️ ${p.weight} &nbsp;|&nbsp; 📦 ${p.unit}</div>
      </div>
      <div class="product-footer">
        <div class="product-price">
          R$ ${p.price.toFixed(2).replace('.', ',')}
          <small>${p.unit}</small>
        </div>
        <button class="btn-add-cart" onclick="event.stopPropagation(); quickAddToCart(${p.id})" title="Adicionar ao carrinho">
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Re-observe new cards
  setTimeout(() => {
    document.querySelectorAll('.product-card.reveal:not(.visible)').forEach(el => {
      revealObserverInstance && revealObserverInstance.observe(el);
    });
    // Trigger reveal for visible ones
    document.querySelectorAll('.product-card.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  }, 50);
}

let revealObserverInstance = null;
function initRevealObserver() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealObserverInstance = obs;
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function filterCatalog(filter, btn) {
  state.catalogFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(filter);
}

/* ============================================================
   PRODUTO: DETALHE
   ============================================================ */
function openProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  state.currentProduct = p;
  state.detailQty = 1;

  document.getElementById('product-detail-emoji').textContent = p.emoji;
  document.getElementById('product-detail-name').textContent  = p.name;
  document.getElementById('product-detail-desc').textContent  = p.desc;
  document.getElementById('product-detail-weight').textContent = `⚖️ ${p.weight}`;
  document.getElementById('product-detail-unit').textContent   = `📦 ${p.unit}`;
  document.getElementById('product-detail-price').textContent  = `R$ ${p.price.toFixed(2).replace('.', ',')}`;
  document.getElementById('detail-qty').textContent = '1';

  const badge = document.getElementById('product-detail-badge');
  if (p.badge) {
    badge.className = `product-badge badge-${p.badge}`;
    badge.textContent = p.badgeLabel;
  } else {
    badge.className = 'product-badge';
    badge.textContent = '';
  }

  openModal('modal-product');
}

function changeDetailQty(delta) {
  state.detailQty = Math.max(1, state.detailQty + delta);
  document.getElementById('detail-qty').textContent = state.detailQty;
}

function addDetailToCart() {
  if (!state.currentProduct) return;
  addToCart(state.currentProduct.id, state.detailQty);
  closeModal('modal-product');
}

/* ============================================================
   CARRINHO
   ============================================================ */
function quickAddToCart(id) {
  addToCart(id, 1);
}

function addToCart(id, qty = 1) {
  if (!state.user) {
    showToast('Faça login para adicionar ao carrinho! 😊', 'info');
    openModal('modal-auth');
    return;
  }
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ id, qty, name: product.name, price: product.price, emoji: product.emoji });
  }
  saveState();
  updateCartBadge();
  showToast(`${product.emoji} ${product.name} adicionado ao carrinho!`, 'success');
  animateCartBadge();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  saveState();
  updateCartBadge();
  renderCartItems();
}

function changeCartQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveState();
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const total = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function animateCartBadge() {
  const badge = document.getElementById('cart-badge');
  badge.style.animation = 'none';
  void badge.offsetWidth;
  badge.style.animation = 'pop 0.3s cubic-bezier(0.34,1.56,0.64,1)';
}

function openCart() {
  renderCartItems();
  openModal('modal-cart');
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const totalEl   = document.getElementById('cart-total');
  const shippingEl = document.getElementById('cart-shipping-val');

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Seu carrinho está vazio.<br>Adicione alguns brigadeiros deliciosos!</p>
      </div>`;
    totalEl.textContent = 'R$ 0,00';
    shippingEl.textContent = 'A calcular';
    return;
  }

  const subtotal = cartSubtotal();
  const shipping = subtotal > 0 ? 8.00 : 0;

  container.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        <div class="cart-item-qty">
          <button onclick="changeCartQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeCartQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remover">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  `).join('');

  totalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  shippingEl.textContent = `R$ ${shipping.toFixed(2).replace('.', ',')}`;
}

function cartSubtotal() {
  return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

/* ============================================================
   CHECKOUT
   ============================================================ */
function goToCheckout() {
  if (!state.user) {
    showToast('Faça login para finalizar o pedido!', 'info');
    openModal('modal-auth');
    return;
  }
  if (state.cart.length === 0) {
    showToast('Seu carrinho está vazio!', 'error');
    return;
  }
  closeModal('modal-cart');
  renderCheckoutSummary();
  openModal('modal-checkout');
}

function renderCheckoutSummary() {
  const list     = document.getElementById('checkout-items-list');
  const subtotal = cartSubtotal();
  const shipping = 8.00;
  const total    = subtotal + shipping;

  list.innerHTML = state.cart.map(item => `
    <div class="checkout-item">
      <span class="checkout-item-emoji">${item.emoji}</span>
      <span class="checkout-item-name">${item.name} × ${item.qty}</span>
      <span class="checkout-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
    </div>
  `).join('');

  document.getElementById('summary-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('summary-shipping').textContent = `R$ ${shipping.toFixed(2).replace('.', ',')}`;
  document.getElementById('summary-total').textContent    = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function selectPayment(method) {
  state.selectedPayment = method;
  document.getElementById('card-fields').classList.toggle('hidden', method !== 'card');
  document.getElementById('cash-fields').classList.toggle('hidden', method !== 'cash');
}

function lookupCep() {
  const cep = document.getElementById('checkout-cep').value.replace(/\D/g, '');
  if (cep.length !== 8) { showToast('CEP inválido.', 'error'); return; }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json())
    .then(data => {
      if (data.erro) { showToast('CEP não encontrado.', 'error'); return; }
      document.getElementById('checkout-street').value       = data.logradouro || '';
      document.getElementById('checkout-neighborhood').value = data.bairro     || '';
      document.getElementById('checkout-city').value         = data.localidade || '';
      document.getElementById('checkout-number').focus();
      showToast('Endereço preenchido! ✅', 'success');
    })
    .catch(() => showToast('Erro ao buscar CEP. Preencha manualmente.', 'error'));
}

function placeOrder() {
  const street = document.getElementById('checkout-street').value.trim();
  const number = document.getElementById('checkout-number').value.trim();
  const city   = document.getElementById('checkout-city').value.trim();

  if (!street || !number || !city) {
    showToast('Preencha o endereço de entrega completo.', 'error'); return;
  }

  if (state.selectedPayment === 'card') {
    const cardNum  = document.getElementById('card-number').value.trim();
    const cardName = document.getElementById('card-name').value.trim();
    const expiry   = document.getElementById('card-expiry').value.trim();
    const cvv      = document.getElementById('card-cvv').value.trim();
    if (!cardNum || !cardName || !expiry || !cvv) {
      showToast('Preencha os dados do cartão.', 'error'); return;
    }
  }

  const subtotal = cartSubtotal();
  const shipping = 8.00;
  const total    = subtotal + shipping;

  const order = {
    id: 'BD' + Date.now().toString().slice(-6),
    userId: state.user.id,
    items: [...state.cart],
    address: {
      street: document.getElementById('checkout-street').value,
      number: document.getElementById('checkout-number').value,
      neighborhood: document.getElementById('checkout-neighborhood').value,
      city: document.getElementById('checkout-city').value,
      complement: document.getElementById('checkout-complement').value,
      cep: document.getElementById('checkout-cep').value
    },
    payment: state.selectedPayment,
    obs: document.getElementById('checkout-obs').value,
    subtotal, shipping, total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  state.orders.unshift(order);
  state.cart = [];
  saveState();
  updateCartBadge();

  // Show success
  document.getElementById('order-number-display').textContent = `Pedido #${order.id}`;
  document.getElementById('success-msg').textContent =
    `Recebemos seu pedido no valor de R$ ${total.toFixed(2).replace('.', ',')}. Em breve você receberá uma confirmação!`;

  closeModal('modal-checkout');
  openModal('modal-success');
}

/* ============================================================
   MEUS PEDIDOS
   ============================================================ */
function openOrders() {
  document.getElementById('user-dropdown').style.display = '';
  renderOrders();
  openModal('modal-orders');
}

function renderOrders() {
  const list = document.getElementById('orders-list');
  const userOrders = state.orders.filter(o => o.userId === state.user?.id);

  if (userOrders.length === 0) {
    list.innerHTML = `
      <div class="orders-empty">
        <div class="empty-icon">📦</div>
        <p>Você ainda não fez nenhum pedido.<br>Que tal experimentar nossos brigadeiros?</p>
        <button class="btn-primary" style="margin-top:1rem" onclick="closeModal('modal-orders'); scrollToSection('catalog')">
          Ver Cardápio
        </button>
      </div>`;
    return;
  }

  const statusMap = {
    pending:    { label: 'Aguardando',  cls: 'status-pending' },
    confirmed:  { label: 'Confirmado',  cls: 'status-confirmed' },
    delivering: { label: 'Em entrega',  cls: 'status-delivering' },
    delivered:  { label: 'Entregue',    cls: 'status-delivered' }
  };

  list.innerHTML = userOrders.map(order => {
    const st = statusMap[order.status] || statusMap.pending;
    const date = new Date(order.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    const itemsPreview = order.items.map(i => `${i.emoji} ${i.name} ×${i.qty}`).join(' &nbsp;|&nbsp; ');
    return `
      <div class="order-card">
        <div class="order-card-header">
          <div>
            <div class="order-id">Pedido #${order.id}</div>
            <div class="order-date">${date}</div>
          </div>
          <span class="order-status ${st.cls}">${st.label}</span>
        </div>
        <div class="order-items-preview">${itemsPreview}</div>
        <div class="order-total">Total: R$ ${order.total.toFixed(2).replace('.', ',')}</div>
      </div>`;
  }).join('');
}

/* ============================================================
   DEPOIMENTOS
   ============================================================ */
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card reveal">
      <div class="stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initials}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-info">${t.info}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   CONTATO
   ============================================================ */
function sendContact() {
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('Preencha todos os campos do formulário.', 'error'); return;
  }
  if (!isValidEmail(email)) { showToast('E-mail inválido.', 'error'); return; }

  // Simulate sending
  showToast('Mensagem enviada com sucesso! Responderemos em breve. 💛', 'success', 5000);
  document.getElementById('contact-name').value    = '';
  document.getElementById('contact-email').value   = '';
  document.getElementById('contact-subject').value = '';
  document.getElementById('contact-message').value = '';
}

/* ============================================================
   MÁSCARAS DE INPUT
   ============================================================ */
function maskPhone(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) {
    v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (v.length > 6) {
    v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else if (v.length > 2) {
    v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  } else {
    v = v.replace(/^(\d*)$/, '($1');
  }
  input.value = v;
}

function maskCep(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 8);
  if (v.length > 5) v = v.replace(/^(\d{5})(\d{0,3})$/, '$1-$2');
  input.value = v;
}

function maskCard(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 16);
  v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
  input.value = v;
}

function maskExpiry(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,2})$/, '$1/$2');
  input.value = v;
}

/* ============================================================
   KEYBOARD & ACCESSIBILITY
   ============================================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal:not(.hidden)').forEach(m => m.classList.add('hidden'));
    document.getElementById('modal-overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// Close user dropdown when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.getElementById('user-menu');
  const dd   = document.getElementById('user-dropdown');
  if (menu && !menu.contains(e.target)) {
    dd.style.display = '';
  }
});
