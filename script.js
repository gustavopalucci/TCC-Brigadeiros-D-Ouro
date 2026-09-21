const WHATSAPP_NUMBER = '5516994057344';

function createWhatsAppUrl(productName, price, flavors = '') {
  const message = [
    'Olá! Gostaria de fazer um pedido na Brigadeiros D\'Ouros.',
    '',
    `Produto: ${productName}`,
    `Preço de referência: ${price}`,
    flavors ? `Sabores disponíveis: ${flavors}` : '',
    '',
    'Gostaria de confirmar a disponibilidade e combinar a entrega.',
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(productName, price, flavors) {
  window.open(createWhatsAppUrl(productName, price, flavors), '_blank', 'noopener,noreferrer');
}

function setupOrderButtons() {
  document.querySelectorAll('.order-button').forEach(button => {
    button.addEventListener('click', () => {
      openWhatsApp(
        button.dataset.order,
        button.dataset.price,
        button.dataset.flavors,
      );
    });
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setCurrentYear() {
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  setupOrderButtons();
  setupMobileMenu();
  setCurrentYear();
});
