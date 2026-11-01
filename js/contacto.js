'use strict';
// Navegación exclusiva de la página de contacto.
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu-principal');
  const boton = document.getElementById('menu-toggle');
  if (!menu || !boton) return;
  const cerrar = () => {
    menu.classList.remove('menu-abierto');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú de navegación');
  };
  boton.addEventListener('click', () => {
    const abierto = menu.classList.toggle('menu-abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });
  menu.querySelectorAll('a').forEach(enlace => enlace.addEventListener('click', cerrar));
  document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape') cerrar();
  });
  document.addEventListener('click', evento => {
    if (!evento.target.closest('.navegacion')) cerrar();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) cerrar();
  });
});
