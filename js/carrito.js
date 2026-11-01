/**
 * Módulo de Carrito de Compras - ADICPLAYZONE
 * Programación Web Avanzada
 */
(() => {
    'use strict';

    // Constantes centralizadas del módulo
    const CLAVE_STORAGE = 'adz_carrito';
    const PORCENTAJE_IVA = 0.15;
    const CANTIDAD_MAXIMA_POR_PRODUCTO = 99;

    // Estado interno del módulo
    let catalogoMaestro = {};
    let carrito = [];
    let timeoutToast = null;
    let accionConfirmacionPendiente = null;
    let ultimoElementoEnfocado = null;

    /**
     * Redondea de forma segura a 2 decimales evitando errores de coma flotante
     */
    function redondearMoneda(valor) {
        const numero = Number(valor);
        if (!Number.isFinite(numero) || Number.isNaN(numero)) {
            return 0;
        }
        return Math.round((numero + Number.EPSILON) * 100) / 100;
    }

    /**
     * Formatea un número como moneda en USD ($0.00)
     */
    function formatearMoneda(valor) {
        return '$' + redondearMoneda(valor).toFixed(2);
    }

    /**
     * Normaliza cadenas de texto para búsquedas insensibles a mayúsculas y tildes
     */
    function normalizarTexto(texto) {
        return String(texto || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    /**
     * Sincroniza las etiquetas del porcentaje de IVA usando la constante centralizada
     */
    function actualizarEtiquetasIva() {
        const porcentajeEntero = Math.round(PORCENTAJE_IVA * 100);
        const textoEtiqueta = `IVA del ${porcentajeEntero} %:`;
        const etiquetaResumen = document.getElementById('etiqueta-iva-resumen');
        const etiquetaModal = document.getElementById('etiqueta-iva-modal');

        if (etiquetaResumen) etiquetaResumen.textContent = textoEtiqueta;
        if (etiquetaModal) etiquetaModal.textContent = textoEtiqueta;
    }

    /**
     * Carga el catálogo autoritativo desde el JSON de PHP o desde el DOM como respaldo
     */
    function cargarCatalogoMaestro() {
        const scriptDatos = document.getElementById('adz-catalogo-datos');
        if (scriptDatos && scriptDatos.textContent) {
            try {
                const datos = JSON.parse(scriptDatos.textContent);
                if (datos && typeof datos === 'object') {
                    catalogoMaestro = {};
                    Object.keys(datos).forEach((clave) => {
                        const prod = datos[clave];
                        const precioValido = redondearMoneda(prod?.precio);
                        if (prod && typeof prod.id === 'string' && precioValido > 0) {
                            catalogoMaestro[prod.id.trim()] = {
                                id: prod.id.trim(),
                                nombre: String(prod.nombre || '').trim(),
                                descripcion: String(prod.descripcion || '').trim(),
                                precio: precioValido,
                                imagen: String(prod.imagen || '').trim()
                            };
                        }
                    });
                    if (Object.keys(catalogoMaestro).length > 0) {
                        return;
                    }
                }
            } catch (error) {
                console.warn('No se pudo parsear el JSON del catálogo, usando respaldo DOM.', error);
            }
        }

        // Respaldo DOM si no se encontró el bloque JSON
        document.querySelectorAll('.item-carrito[data-id]').forEach((elemento) => {
            const id = (elemento.getAttribute('data-id') || '').trim();
            const nombre = (elemento.getAttribute('data-nombre') || '').trim();
            const descripcion = (elemento.getAttribute('data-descripcion') || '').trim();
            const precioTexto = elemento.querySelector('.item-precio')?.textContent.replace(/[^0-9.]/g, '') || '0';
            const imagen = (elemento.querySelector('img')?.getAttribute('src') || '').trim();
            const precio = redondearMoneda(parseFloat(precioTexto));

            if (id && precio > 0) {
                catalogoMaestro[id] = { id, nombre, descripcion, precio, imagen };
            }
        });
    }

    /**
     * Verifica si un identificador existe en el catálogo oficial
     */
    function obtenerProductoValido(id) {
        if (typeof id !== 'string') return null;
        const clave = id.trim();
        if (!clave) return null;

        return Object.prototype.hasOwnProperty.call(catalogoMaestro, clave)
            ? catalogoMaestro[clave]
            : null;
    }

    /**
     * Sanea y deduplica un arreglo de registros contra el catálogo oficial
     * Nunca confía en precios ni nombres almacenados en localStorage
     */
    function sanearListaRegistros(listaCruda) {
        if (!Array.isArray(listaCruda)) return [];

        const mapaUnico = new Map();

        listaCruda.forEach((registro) => {
            if (!registro || typeof registro !== 'object') return;

            const idCandidato = typeof registro.id === 'string' || typeof registro.id === 'number'
                ? String(registro.id).trim()
                : '';
            const productoOficial = obtenerProductoValido(idCandidato);
            if (!productoOficial) return;

            const cantidadNumero = Number(registro.cantidad);
            if (!Number.isFinite(cantidadNumero) || Number.isNaN(cantidadNumero)) return;

            const cantidadEntera = Math.trunc(cantidadNumero);
            if (cantidadEntera <= 0) return;

            const cantidadSegura = Math.min(cantidadEntera, CANTIDAD_MAXIMA_POR_PRODUCTO);

            if (mapaUnico.has(productoOficial.id)) {
                const existente = mapaUnico.get(productoOficial.id);
                existente.cantidad = Math.min(
                    existente.cantidad + cantidadSegura,
                    CANTIDAD_MAXIMA_POR_PRODUCTO
                );
            } else {
                mapaUnico.set(productoOficial.id, {
                    id: productoOficial.id,
                    nombre: productoOficial.nombre,
                    precio: redondearMoneda(productoOficial.precio),
                    imagen: productoOficial.imagen,
                    cantidad: cantidadSegura
                });
            }
        });

        return Array.from(mapaUnico.values());
    }

    /**
     * Recupera y valida la información de localStorage sin romper la página ante datos corruptos
     */
    function cargarCarritoDesdeStorage() {
        try {
            const texto = localStorage.getItem(CLAVE_STORAGE);
            if (!texto) {
                carrito = [];
                return;
            }
            const datosCrudos = JSON.parse(texto);
            if (!Array.isArray(datosCrudos)) {
                localStorage.removeItem(CLAVE_STORAGE);
                carrito = [];
                return;
            }
            carrito = sanearListaRegistros(datosCrudos);
            guardarCarritoEnStorage();
        } catch (error) {
            console.warn('Datos corruptos detectados en localStorage. Se restableció el carrito.', error);
            try {
                localStorage.removeItem(CLAVE_STORAGE);
            } catch (_) {
                // Ignorar si el almacenamiento está bloqueado
            }
            carrito = [];
        }
    }

    /**
     * Re-sincroniza el carrito en memoria con los precios oficiales del catálogo
     */
    function sincronizarCarritoConCatalogo() {
        carrito = sanearListaRegistros(carrito);
    }

    /**
     * Guarda el carrito saneado en localStorage
     */
    function guardarCarritoEnStorage() {
        try {
            sincronizarCarritoConCatalogo();
            localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito));
        } catch (error) {
            console.error('No fue posible guardar en localStorage:', error);
        }
    }

    /**
     * Muestra notificación flotante (Toast)
     */
    function mostrarToast(mensaje, esError = false) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = String(mensaje || '');
        toast.classList.toggle('toast-error', Boolean(esError));
        toast.classList.add('activo');

        clearTimeout(timeoutToast);
        timeoutToast = setTimeout(() => {
            toast.classList.remove('activo');
        }, 3000);
    }

    /**
     * Agrega un producto validando su identificador y evitando filas duplicadas
     */
    function agregarAlCarrito(idProducto) {
        const productoOficial = obtenerProductoValido(String(idProducto || ''));
        if (!productoOficial) {
            mostrarToast('⚠️ Identificador de producto inválido o inexistente.', true);
            return false;
        }

        sincronizarCarritoConCatalogo();

        const itemExistente = carrito.find((item) => item.id === productoOficial.id);
        if (itemExistente) {
            if (itemExistente.cantidad >= CANTIDAD_MAXIMA_POR_PRODUCTO) {
                mostrarToast(`⚠️ Máximo permitido (${CANTIDAD_MAXIMA_POR_PRODUCTO}) alcanzado para ${productoOficial.nombre}.`, true);
                return false;
            }
            itemExistente.cantidad += 1;
            itemExistente.precio = redondearMoneda(productoOficial.precio);
            itemExistente.nombre = productoOficial.nombre;
            itemExistente.imagen = productoOficial.imagen;
        } else {
            carrito.push({
                id: productoOficial.id,
                nombre: productoOficial.nombre,
                precio: redondearMoneda(productoOficial.precio),
                imagen: productoOficial.imagen,
                cantidad: 1
            });
        }

        guardarCarritoEnStorage();
        renderizarCarrito();
        mostrarToast(`✓ ${productoOficial.nombre} agregado al carrito`);
        return true;
    }

    /**
     * Incrementa o disminuye la cantidad de un producto
     */
    function cambiarCantidad(idProducto, delta) {
        sincronizarCarritoConCatalogo();
        const item = carrito.find((prod) => prod.id === idProducto);
        if (!item) return;

        const cambio = Number.parseInt(delta, 10);
        if (!Number.isFinite(cambio) || cambio === 0) return;

        const nuevaCantidad = item.cantidad + cambio;

        if (nuevaCantidad <= 0) {
            solicitarConfirmacionEliminarItem(item.id);
            return;
        }

        if (nuevaCantidad > CANTIDAD_MAXIMA_POR_PRODUCTO) {
            mostrarToast(`⚠️ Máximo ${CANTIDAD_MAXIMA_POR_PRODUCTO} unidades por producto.`, true);
            return;
        }

        item.cantidad = nuevaCantidad;
        guardarCarritoEnStorage();
        renderizarCarrito();
    }

    /**
     * Solicita confirmación antes de eliminar un producto individual
     */
    function solicitarConfirmacionEliminarItem(idProducto) {
        const item = carrito.find((prod) => prod.id === idProducto);
        if (!item) return;

        abrirModalConfirmacion({
            titulo: 'Eliminar producto',
            mensaje: `¿Estás seguro de que deseas eliminar "${item.nombre}" del carrito?`,
            textoAceptar: 'Sí, eliminar',
            alConfirmar: () => {
                carrito = carrito.filter((prod) => prod.id !== idProducto);
                guardarCarritoEnStorage();
                renderizarCarrito();
                mostrarToast(`🗑️ ${item.nombre} eliminado del carrito`);
            }
        });
    }

    /**
     * Solicita confirmación antes de vaciar todo el carrito con el texto exacto requerido
     */
    function solicitarConfirmacionVaciarCarrito() {
        if (carrito.length === 0) {
            mostrarToast('ℹ️ El carrito ya está vacío.');
            return;
        }

        abrirModalConfirmacion({
            titulo: 'Vaciar carrito',
            mensaje: '¿Estás seguro de que deseas vaciar el carrito?',
            textoAceptar: 'Sí, vaciar carrito',
            alConfirmar: () => {
                carrito = [];
                guardarCarritoEnStorage();
                renderizarCarrito();
                mostrarToast('🗑️ Carrito vaciado correctamente');
            }
        });
    }

    /**
     * Abre el modal de confirmación accesible
     */
    function abrirModalConfirmacion({ titulo, mensaje, textoAceptar, alConfirmar }) {
        const modal = document.getElementById('modal-confirmacion');
        const elTitulo = document.getElementById('titulo-modal-confirmacion');
        const elMensaje = document.getElementById('mensaje-modal-confirmacion');
        const btnAceptar = document.getElementById('btn-aceptar-confirmacion');
        const btnCancelar = document.getElementById('btn-cancelar-confirmacion');

        if (!modal || !elTitulo || !elMensaje || !btnAceptar || !btnCancelar) return;

        ultimoElementoEnfocado = document.activeElement;
        elTitulo.textContent = titulo;
        elMensaje.textContent = mensaje;
        btnCancelar.textContent = 'Cancelar';
        btnAceptar.textContent = textoAceptar;
        accionConfirmacionPendiente = typeof alConfirmar === 'function' ? alConfirmar : null;

        modal.classList.add('activo');
        modal.setAttribute('aria-hidden', 'false');
        btnCancelar.focus();
    }

    /**
     * Cierra el modal de confirmación sin perder datos
     */
    function cerrarModalConfirmacion() {
        const modal = document.getElementById('modal-confirmacion');
        if (!modal) return;

        modal.classList.remove('activo');
        modal.setAttribute('aria-hidden', 'true');
        accionConfirmacionPendiente = null;

        if (ultimoElementoEnfocado && typeof ultimoElementoEnfocado.focus === 'function') {
            ultimoElementoEnfocado.focus();
        }
    }

    /**
     * Calcula Subtotal, IVA del 15 % y Total Estimado con precios oficiales
     */
    function calcularTotalesCarrito() {
        sincronizarCarritoConCatalogo();

        let acumuladorSubtotal = 0;
        let totalUnidades = 0;

        carrito.forEach((item) => {
            const productoOficial = obtenerProductoValido(item.id);
            if (!productoOficial) return;

            const precioUnitario = redondearMoneda(productoOficial.precio);
            const cantidad = Number.isInteger(item.cantidad) && item.cantidad > 0 ? item.cantidad : 0;

            acumuladorSubtotal += redondearMoneda(precioUnitario * cantidad);
            totalUnidades += cantidad;
        });

        const subtotal = redondearMoneda(acumuladorSubtotal);
        const iva = redondearMoneda(subtotal * PORCENTAJE_IVA);
        const total = redondearMoneda(subtotal + iva);

        return { subtotal, iva, total, totalUnidades };
    }

    /**
     * Renderiza el carrito en el DOM utilizando creación segura de nodos (sin innerHTML inseguro)
     */
    function renderizarCarrito() {
        const contenedor = document.getElementById('contenedor-items-seleccionados');
        const spanSubtotal = document.getElementById('span-subtotal');
        const spanIva = document.getElementById('span-iva');
        const spanTotal = document.getElementById('span-total');
        const contadorBadge = document.getElementById('contador-carrito');
        const btnVaciar = document.getElementById('btn-vaciar-carrito');
        const btnConfirmar = document.getElementById('btn-confirmar-compra');

        const { subtotal, iva, total, totalUnidades } = calcularTotalesCarrito();

        if (contadorBadge) {
            contadorBadge.textContent = String(totalUnidades);
        }

        if (btnVaciar) {
            btnVaciar.disabled = carrito.length === 0;
        }
        if (btnConfirmar) {
            btnConfirmar.disabled = carrito.length === 0;
        }

        if (!contenedor) return;
        contenedor.replaceChildren();

        if (carrito.length === 0) {
            const liVacio = document.createElement('li');
            liVacio.className = 'mensaje-carrito-vacio';
            liVacio.textContent = 'No has seleccionado productos aún.';
            contenedor.appendChild(liVacio);

            if (spanSubtotal) spanSubtotal.textContent = '$0.00';
            if (spanIva) spanIva.textContent = '$0.00';
            if (spanTotal) spanTotal.textContent = '$0.00';
            return;
        }

        const fragmento = document.createDocumentFragment();

        carrito.forEach((item) => {
            const subtotalItem = redondearMoneda(item.precio * item.cantidad);

            const li = document.createElement('li');
            li.className = 'fila-seleccionado';

            const divIzq = document.createElement('div');
            divIzq.className = 'fila-seleccionado-izq';

            const img = document.createElement('img');
            img.className = 'mini-img-carrito';
            img.src = item.imagen;
            img.alt = item.nombre;

            const divInfo = document.createElement('div');
            divInfo.className = 'fila-seleccionado-info';

            const strongNombre = document.createElement('strong');
            strongNombre.textContent = item.nombre;

            const smallDetalle = document.createElement('small');
            smallDetalle.textContent = `${formatearMoneda(item.precio)} c/u · Subtotal: ${formatearMoneda(subtotalItem)}`;

            divInfo.appendChild(strongNombre);
            divInfo.appendChild(smallDetalle);
            divIzq.appendChild(img);
            divIzq.appendChild(divInfo);

            const divControles = document.createElement('div');
            divControles.className = 'controles-cantidad';

            const btnMenos = document.createElement('button');
            btnMenos.type = 'button';
            btnMenos.className = 'btn-cant';
            btnMenos.textContent = '−';
            btnMenos.setAttribute('aria-label', `Disminuir cantidad de ${item.nombre}`);
            btnMenos.addEventListener('click', () => cambiarCantidad(item.id, -1));

            const spanCantidad = document.createElement('span');
            spanCantidad.className = 'cantidad-valor';
            spanCantidad.textContent = String(item.cantidad);

            const btnMas = document.createElement('button');
            btnMas.type = 'button';
            btnMas.className = 'btn-cant';
            btnMas.textContent = '+';
            btnMas.setAttribute('aria-label', `Aumentar cantidad de ${item.nombre}`);
            btnMas.addEventListener('click', () => cambiarCantidad(item.id, 1));

            const btnEliminar = document.createElement('button');
            btnEliminar.type = 'button';
            btnEliminar.className = 'btn-eliminar';
            btnEliminar.title = 'Eliminar producto';
            btnEliminar.textContent = '✕';
            btnEliminar.setAttribute('aria-label', `Eliminar ${item.nombre} del carrito`);
            btnEliminar.addEventListener('click', () => solicitarConfirmacionEliminarItem(item.id));

            divControles.appendChild(btnMenos);
            divControles.appendChild(spanCantidad);
            divControles.appendChild(btnMas);
            divControles.appendChild(btnEliminar);

            li.appendChild(divIzq);
            li.appendChild(divControles);
            fragmento.appendChild(li);
        });

        contenedor.appendChild(fragmento);

        if (spanSubtotal) spanSubtotal.textContent = formatearMoneda(subtotal);
        if (spanIva) spanIva.textContent = formatearMoneda(iva);
        if (spanTotal) spanTotal.textContent = formatearMoneda(total);
    }

    /**
     * Genera un número de pedido ficticio de exactamente 12 dígitos numéricos
     */
    function generarNumeroPedido12Digitos() {
        let codigo = String(Math.floor(1 + Math.random() * 9));
        for (let i = 0; i < 11; i += 1) {
            codigo += String(Math.floor(Math.random() * 10));
        }
        return codigo;
    }

    /**
     * Obtiene la fecha y hora actual formateada
     */
    function obtenerFechaHoraActual() {
        const ahora = new Date();
        return ahora.toLocaleString('es-EC', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    /**
     * Genera y muestra el comprobante simulado sin vaciar prematuramente el carrito
     */
    function procesarSimulacionCompra(evento) {
        evento.preventDefault();

        sincronizarCarritoConCatalogo();
        renderizarCarrito();

        if (carrito.length === 0) {
            mostrarToast('⚠️ Agrega al menos un producto válido antes de simular el pedido.', true);
            return;
        }

        const inputNombre = document.getElementById('nombre-cliente');
        const inputCorreo = document.getElementById('correo-cliente');

        const nombreCliente = (inputNombre?.value || '').trim();
        const correoCliente = (inputCorreo?.value || '').trim();
        const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        inputNombre?.classList.remove('input-error');
        inputCorreo?.classList.remove('input-error');

        if (nombreCliente.length < 3) {
            inputNombre?.classList.add('input-error');
            inputNombre?.focus();
            mostrarToast('⚠️ Por favor, ingresa el nombre del cliente (mínimo 3 caracteres).', true);
            return;
        }

        if (!patronCorreo.test(correoCliente)) {
            inputCorreo?.classList.add('input-error');
            inputCorreo?.focus();
            mostrarToast('⚠️ Por favor, ingresa un correo electrónico válido.', true);
            return;
        }

        const { subtotal, iva, total } = calcularTotalesCarrito();

        document.getElementById('cliente-modal').textContent = nombreCliente;
        document.getElementById('correo-modal').textContent = correoCliente;
        document.getElementById('num-orden').textContent = generarNumeroPedido12Digitos();
        document.getElementById('fecha-orden').textContent = obtenerFechaHoraActual();

        const tbodyResumen = document.getElementById('resumen-modal');
        tbodyResumen.replaceChildren();

        carrito.forEach((item) => {
            const tr = document.createElement('tr');

            const tdNombre = document.createElement('td');
            tdNombre.textContent = item.nombre;

            const tdCantidad = document.createElement('td');
            tdCantidad.className = 'col-centro';
            tdCantidad.textContent = String(item.cantidad);

            const tdUnitario = document.createElement('td');
            tdUnitario.className = 'col-derecha';
            tdUnitario.textContent = formatearMoneda(item.precio);

            const tdSubtotal = document.createElement('td');
            tdSubtotal.className = 'col-derecha';
            tdSubtotal.textContent = formatearMoneda(redondearMoneda(item.precio * item.cantidad));

            tr.appendChild(tdNombre);
            tr.appendChild(tdCantidad);
            tr.appendChild(tdUnitario);
            tr.appendChild(tdSubtotal);
            tbodyResumen.appendChild(tr);
        });

        document.getElementById('modal-subtotal').textContent = formatearMoneda(subtotal);
        document.getElementById('modal-iva').textContent = formatearMoneda(iva);
        document.getElementById('total-modal').textContent = formatearMoneda(total);

        ultimoElementoEnfocado = document.activeElement;
        const modalCompra = document.getElementById('modal-compra');
        modalCompra.classList.add('activo');
        modalCompra.setAttribute('aria-hidden', 'false');

        const btnFinalizar = document.getElementById('btn-finalizar-simulacion');
        if (btnFinalizar) btnFinalizar.focus();
    }

    /**
     * Cierra el comprobante manteniendo intactos los productos del carrito
     */
    function cerrarComprobanteConservandoCarrito() {
        const modalCompra = document.getElementById('modal-compra');
        if (!modalCompra) return;

        modalCompra.classList.remove('activo');
        modalCompra.setAttribute('aria-hidden', 'true');

        if (ultimoElementoEnfocado && typeof ultimoElementoEnfocado.focus === 'function') {
            ultimoElementoEnfocado.focus();
        }
    }

    /**
     * Finaliza la simulación y limpia el carrito una vez que el usuario ya revisó su comprobante
     */
    function finalizarSimulacionYLimpiar() {
        const modalCompra = document.getElementById('modal-compra');
        const formCompra = document.getElementById('form-compra');

        carrito = [];
        guardarCarritoEnStorage();
        renderizarCarrito();

        if (formCompra) formCompra.reset();
        if (modalCompra) {
            modalCompra.classList.remove('activo');
            modalCompra.setAttribute('aria-hidden', 'true');
        }

        mostrarToast('✓ Pedido simulado finalizado correctamente');
    }

    /**
     * Filtra los productos disponibles por nombre y descripción sin afectar el carrito
     */
    function filtrarCatalogo(terminoBusqueda) {
        const termino = normalizarTexto(terminoBusqueda);
        const tarjetas = document.querySelectorAll('#lista-catalogo .item-carrito');
        const cartelSinResultados = document.getElementById('mensaje-sin-resultados');

        let coincidencias = 0;

        tarjetas.forEach((tarjeta) => {
            const nombre = tarjeta.getAttribute('data-nombre') || '';
            const descripcion = tarjeta.getAttribute('data-descripcion') || '';
            const textoCombinado = normalizarTexto(`${nombre} ${descripcion}`);

            const coincide = termino === '' || textoCombinado.includes(termino);
            tarjeta.classList.toggle('oculto', !coincide);

            if (coincide) {
                coincidencias += 1;
            }
        });

        if (cartelSinResultados) {
            cartelSinResultados.classList.toggle('oculto', coincidencias > 0);
        }
    }

    /**
     * Procesa el parámetro ?agregar= recibido por URL, validando el ID y limpiando la URL
     */
    function procesarParametroUrlAgregar() {
        const urlActual = new URL(window.location.href);
        if (!urlActual.searchParams.has('agregar')) return;

        const idRecibido = (urlActual.searchParams.get('agregar') || '').trim();

        // Limpiar únicamente el parámetro 'agregar' conservando otros parámetros si existieran
        urlActual.searchParams.delete('agregar');
        const nuevaBusqueda = urlActual.searchParams.toString();
        const urlLimpia = urlActual.pathname + (nuevaBusqueda ? `?${nuevaBusqueda}` : '') + urlActual.hash;
        window.history.replaceState({}, document.title, urlLimpia);

        if (!idRecibido) {
            mostrarToast('⚠️ No se especificó un identificador de producto en el enlace.', true);
            return;
        }

        const productoValido = obtenerProductoValido(idRecibido);
        if (!productoValido) {
            mostrarToast(`⚠️ El identificador "${idRecibido}" no corresponde a ningún producto válido.`, true);
            return;
        }

        agregarAlCarrito(productoValido.id);
    }

    /**
     * Mantiene el foco del teclado dentro del modal activo (Accesibilidad)
     */
    function gestionarFocoEnModal(evento, modalActivo) {
        if (evento.key !== 'Tab' || !modalActivo) return;

        const elementosEnfocables = modalActivo.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (elementosEnfocables.length === 0) return;

        const primero = elementosEnfocables[0];
        const ultimo = elementosEnfocables[elementosEnfocables.length - 1];

        if (evento.shiftKey && document.activeElement === primero) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault();
            primero.focus();
        }
    }

    /**
     * Inicialización general del módulo
     */
    document.addEventListener('DOMContentLoaded', () => {
        actualizarEtiquetasIva();
        cargarCatalogoMaestro();
        cargarCarritoDesdeStorage();
        renderizarCarrito();

        // Botones de agregar producto del catálogo
        document.querySelectorAll('.btn-agregar-carrito').forEach((boton) => {
            boton.addEventListener('click', () => {
                const id = boton.getAttribute('data-id');
                agregarAlCarrito(id);
            });
        });

        // Buscador en tiempo real (eventos input y search)
        const inputBuscador = document.getElementById('input-buscador');
        if (inputBuscador) {
            const manejarBusqueda = (e) => filtrarCatalogo(e.target.value);
            inputBuscador.addEventListener('input', manejarBusqueda);
            inputBuscador.addEventListener('search', manejarBusqueda);
        }

        // Botón para vaciar carrito
        const btnVaciar = document.getElementById('btn-vaciar-carrito');
        if (btnVaciar) {
            btnVaciar.addEventListener('click', solicitarConfirmacionVaciarCarrito);
        }

        // Controles del modal de confirmación
        const btnCancelarConfirmacion = document.getElementById('btn-cancelar-confirmacion');
        const btnAceptarConfirmacion = document.getElementById('btn-aceptar-confirmacion');
        const modalConfirmacion = document.getElementById('modal-confirmacion');

        if (btnCancelarConfirmacion) {
            btnCancelarConfirmacion.addEventListener('click', cerrarModalConfirmacion);
        }
        if (btnAceptarConfirmacion) {
            btnAceptarConfirmacion.addEventListener('click', () => {
                const accion = accionConfirmacionPendiente;
                cerrarModalConfirmacion();
                if (typeof accion === 'function') {
                    accion();
                }
            });
        }
        if (modalConfirmacion) {
            modalConfirmacion.addEventListener('click', (e) => {
                if (e.target === modalConfirmacion) cerrarModalConfirmacion();
            });
        }

        // Formulario y comprobante de compra simulada
        const formCompra = document.getElementById('form-compra');
        if (formCompra) {
            formCompra.addEventListener('submit', procesarSimulacionCompra);
        }

        const btnConservarCarrito = document.getElementById('btn-conservar-carrito');
        const btnFinalizarSimulacion = document.getElementById('btn-finalizar-simulacion');
        const modalCompra = document.getElementById('modal-compra');

        if (btnConservarCarrito) {
            btnConservarCarrito.addEventListener('click', cerrarComprobanteConservandoCarrito);
        }
        if (btnFinalizarSimulacion) {
            btnFinalizarSimulacion.addEventListener('click', finalizarSimulacionYLimpiar);
        }
        if (modalCompra) {
            modalCompra.addEventListener('click', (e) => {
                if (e.target === modalCompra) cerrarComprobanteConservandoCarrito();
            });
        }

        // Navegación por teclado (Escape y Focus Trap)
        document.addEventListener('keydown', (e) => {
            if (modalConfirmacion?.classList.contains('activo')) {
                if (e.key === 'Escape') {
                    cerrarModalConfirmacion();
                } else {
                    gestionarFocoEnModal(e, modalConfirmacion);
                }
            } else if (modalCompra?.classList.contains('activo')) {
                if (e.key === 'Escape') {
                    cerrarComprobanteConservandoCarrito();
                } else {
                    gestionarFocoEnModal(e, modalCompra);
                }
            }
        });

        // Procesar parámetro ?agregar= al iniciar
        procesarParametroUrlAgregar();
    });
})();