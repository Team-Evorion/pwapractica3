'use strict';
// Código exclusivo del catálogo: no modifica ni sustituye la lógica del carrito.
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu-principal');
    const alternarMenu = document.getElementById('menu-toggle');
    const productos = [...document.querySelectorAll('.producto-card[data-categoria]')];
    const selectores = [...document.querySelectorAll('[data-filtro]')];
    const indicador = document.getElementById('estado-filtro');
    const mensajeVacio = document.getElementById('sin-productos');
    const seccionProductos = document.getElementById('productos');
    const identificadores = new Set(productos.map((item) => item.dataset.categoria));
    const idsProductos = new Set(productos.map((item) => item.dataset.productoId));

    const cerrarNavegacion = () => {
        menu.classList.remove('menu-abierto');
        alternarMenu.setAttribute('aria-expanded', 'false');
        alternarMenu.setAttribute('aria-label', 'Abrir menú de navegación');
        menu.querySelectorAll('details').forEach((item) => { item.open = false; });
    };

    alternarMenu.addEventListener('click', () => {
        const abierto = !menu.classList.contains('menu-abierto');
        menu.classList.toggle('menu-abierto', abierto);
        alternarMenu.setAttribute('aria-expanded', String(abierto));
        alternarMenu.setAttribute('aria-label', abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        if (!abierto) menu.querySelectorAll('details').forEach((item) => { item.open = false; });
    });

    // Mantener abierto solamente un menú desplegable.
    menu.querySelectorAll('details').forEach((desplegable) => {
        desplegable.addEventListener('toggle', () => {
            if (desplegable.open) menu.querySelectorAll('details').forEach((otro) => {
                if (otro !== desplegable) otro.open = false;
            });
        });
    });

    function filtrarProductos(filtro, desplazarse = true) {
        if (filtro !== 'todos' && !identificadores.has(filtro)) return;
        let visibles = 0;
        productos.forEach((tarjeta) => {
            const mostrar = filtro === 'todos' || tarjeta.dataset.categoria === filtro;
            tarjeta.hidden = !mostrar;
            if (mostrar) visibles++;
        });
        selectores.forEach((control) => {
            const activo = control.dataset.filtro === filtro;
            if (control.matches('.categoria-card,.filtro-todos')) control.setAttribute('aria-pressed', String(activo));
            if (control.matches('.filtro-todos')) control.classList.toggle('activo', activo);
            if (control.closest('.nav-submenu')) {
                if (activo) control.setAttribute('aria-current', 'true');
                else control.removeAttribute('aria-current');
            }
        });
        indicador.textContent = filtro === 'todos'
            ? `Mostrando los ${visibles} productos`
            : `Mostrando ${visibles} producto${visibles === 1 ? '' : 's'} en la categoría seleccionada`;
        mensajeVacio.hidden = visibles !== 0;
        if (desplazarse) seccionProductos.scrollIntoView({behavior:'smooth', block:'start'});
    }

    selectores.forEach((control) => {
        control.addEventListener('click', () => {
            filtrarProductos(control.dataset.filtro);
            cerrarNavegacion();
        });
    });

    // #inicio es un marcador fijo al principio del documento, no el encabezado sticky.
    // Volver a Inicio debe llevar a scrollY = 0 incluso tras filtrar o navegar mucho.
    document.querySelectorAll('a[href="#inicio"]').forEach((enlace) => {
        enlace.addEventListener('click', (evento) => {
            evento.preventDefault();
            cerrarNavegacion();
            const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, left: 0, behavior: reducirMovimiento ? 'instant' : 'smooth' });
        });
    });

    document.querySelectorAll('.nav-enlace, .nav-carrito').forEach((enlace) => {
        enlace.addEventListener('click', cerrarNavegacion);
    });
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') cerrarNavegacion();
    });
    document.addEventListener('click', (evento) => {
        if (!evento.target.closest('.navegacion')) cerrarNavegacion();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 860 && menu.classList.contains('menu-abierto')) cerrarNavegacion();
    });

    // Favoritos demostrativos: sólo estado visual, no realizan compras.
    const claveFavoritos = 'adicplayzone_favoritos_catalogo';
    let favoritos = [];
    try {
        const guardado = JSON.parse(localStorage.getItem(claveFavoritos) || '[]');
        if (Array.isArray(guardado)) favoritos = guardado.filter((id) => idsProductos.has(id));
    } catch (_) { favoritos = []; }
    const refrescarFavoritos = () => {
        document.querySelectorAll('.producto-card').forEach((tarjeta) => {
            const boton = tarjeta.querySelector('.favorito');
            if (!boton) return;
            const marcado = favoritos.includes(tarjeta.dataset.productoId);
            boton.setAttribute('aria-pressed', String(marcado));
            boton.setAttribute('aria-label', marcado ? 'Quitar de favoritos' : 'Marcar como favorito');
            boton.textContent = marcado ? '♥' : '♡';
        });
    };
    document.querySelectorAll('.favorito').forEach((boton) => {
        boton.addEventListener('click', () => {
            const id = boton.closest('.producto-card')?.dataset.productoId;
            if (!id) return;
            favoritos = favoritos.includes(id) ? favoritos.filter((actual) => actual !== id) : [...favoritos, id];
            try { localStorage.setItem(claveFavoritos, JSON.stringify(favoritos)); } catch (_) { /* almacenamiento opcional */ }
            refrescarFavoritos();
        });
    });
    refrescarFavoritos();

    // Sustitución accesible si una imagen externa falla o está bloqueada.
    document.querySelectorAll('.producto-imagen img').forEach((imagen) => {
        const fallo = () => {
            const contenedor = imagen.closest('.producto-imagen');
            if (!contenedor || contenedor.classList.contains('sin-imagen')) return;
            const respaldo = document.createElement('span');
            respaldo.className = 'imagen-respaldo';
            respaldo.textContent = 'Imagen no disponible · ADICPLAYZONE';
            contenedor.append(respaldo);
            contenedor.classList.add('sin-imagen');
        };
        imagen.addEventListener('error', fallo);
        if (imagen.complete && imagen.naturalWidth === 0) fallo();
    });
});
