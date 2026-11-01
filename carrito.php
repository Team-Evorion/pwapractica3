<?php
// Datos compartidos por catálogo y carrito: misma fuente de precios e IDs.
require __DIR__ . '/productos.php';

// Mapa indexado por ID para validación autoritativa de precios y datos en el cliente
$catalogoSeguridad = [];
foreach ($productos as $prod) {
    $idLimpio = trim((string)$prod['id']);
    if ($idLimpio !== '') {
        $catalogoSeguridad[$idLimpio] = [
            'id' => $idLimpio,
            'nombre' => (string)$prod['nombre'],
            'descripcion' => (string)$prod['descripcion'],
            'precio' => round((float)$prod['precio'], 2),
            'imagen' => (string)$prod['imagen']
        ];
    }
}

$parametroAgregarInicial = isset($_GET['agregar']) ? trim((string)$_GET['agregar']) : null;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADICPLAYZONE | Carrito de Compras</title>
    <link rel="icon" type="image/jpeg" href="logo-adz.jpg">
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/estilos_carrito.css">
</head>
<body>

   <!-- ENCABEZADO CON EL LOGOTIPO ESTILIZADO DE ADZ -->
    <header class="encabezado">
        <div class="contenedor navegacion">
            <a class="logo" href="index.php" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
                <div style="background: linear-gradient(135deg, #00e5ff, #8b5cf6); padding: 8px 12px; border-radius: 6px; display: grid; place-items: center; box-shadow: 0 0 15px rgba(0, 229, 255, 0.25); clip-path: polygon(12% 0, 100% 0, 100% 80%, 88% 100%, 0 100%, 0 20%);">
                    <span style="font-family: var(--fuente-titulo); font-size: 16px; font-weight: 900; color: #070a12; letter-spacing: 1px;">ADZ</span>
                </div>
                <div style="display: flex; flex-direction: column; line-height: 1.15;">
                    <span style="font-family: var(--fuente-titulo); font-size: 14px; font-weight: 800; color: #f4f7ff; letter-spacing: 1px;">ADIC PLAY ZONE</span>
                    <small style="font-family: var(--fuente-texto); font-size: 9px; color: #9aa4bd; letter-spacing: 1.5px; margin-top: 2px;">TECNOLOGÍA Y MÁS</small>
                </div>
            </a>
            <nav class="menu" aria-label="Navegación del carrito">
                <a href="index.php" class="enlace-volver">← Volver al Catálogo Principal</a>
                <span class="boton boton-pequeno badge-contador" aria-live="polite">
                    🛒 Seleccionados: <strong id="contador-carrito">0</strong>
                </span>
            </nav>
        </div>
    </header>

    <main class="seccion-carrito">
        <div class="contenedor">
            <div class="encabezado-seccion">
                <div>
                    <span class="sobre-titulo">GESTIÓN DE COMPRA</span>
                    <h2>Carrito de <span>Productos</span></h2>
                </div>
                <p>Agrega productos a tu lista y completa el formulario para simular tu pedido.</p>
            </div>

            <div class="carrito-contenedor-grid">
                <!-- LISTA DE PRODUCTOS DISPONIBLES -->
                <section class="lista-carrito" aria-labelledby="titulo-disponibles">
                    <h3 id="titulo-disponibles">Lista de Productos Disponibles</h3>
                    
                    <div class="buscador-wrapper">
                        <label for="input-buscador" class="sr-only">Buscar productos por nombre o descripción</label>
                        <input 
                            type="search" 
                            id="input-buscador" 
                            class="campo-input buscador-input" 
                            placeholder="🔍 Filtrar productos por nombre o descripción..." 
                            aria-label="Filtrar productos por nombre o descripción"
                            autocomplete="off">
                    </div>

                    <div id="mensaje-sin-resultados" class="mensaje-vacio-busqueda oculto" role="status" aria-live="polite">
                        No se encontraron productos
                    </div>
                    
                    <ul class="catalogo-mini lista-sin-estilo" id="lista-catalogo">
                        <?php foreach ($catalogoSeguridad as $producto): ?>
                            <li class="item-carrito" 
                                data-id="<?= htmlspecialchars($producto['id'], ENT_QUOTES, 'UTF-8') ?>"
                                data-nombre="<?= htmlspecialchars($producto['nombre'], ENT_QUOTES, 'UTF-8') ?>"
                                data-descripcion="<?= htmlspecialchars($producto['descripcion'], ENT_QUOTES, 'UTF-8') ?>">
                                <img src="<?= htmlspecialchars($producto['imagen'], ENT_QUOTES, 'UTF-8') ?>" 
                                     alt="<?= htmlspecialchars($producto['nombre'], ENT_QUOTES, 'UTF-8') ?>" 
                                     loading="lazy">
                                <div class="item-info">
                                    <h4><?= htmlspecialchars($producto['nombre'], ENT_QUOTES, 'UTF-8') ?></h4>
                                    <p class="item-desc"><?= htmlspecialchars($producto['descripcion'], ENT_QUOTES, 'UTF-8') ?></p>
                                    <span class="item-precio">$<?= number_format((float)$producto['precio'], 2, '.', '') ?></span>
                                </div>
                                <button type="button" class="btn-agregar-carrito"
                                    data-id="<?= htmlspecialchars($producto['id'], ENT_QUOTES, 'UTF-8') ?>"
                                    aria-label="Agregar <?= htmlspecialchars($producto['nombre'], ENT_QUOTES, 'UTF-8') ?> al carrito">
                                    + Agregar
                                </button>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </section>

                <!-- PANEL DE SELECCIONADOS Y FORMULARIO HTML -->
                <aside class="resumen-carrito" aria-labelledby="titulo-seleccionados">
                    <h3 id="titulo-seleccionados">Productos Seleccionados</h3>
                    
                    <ul id="contenedor-items-seleccionados" class="contenedor-seleccionados lista-sin-estilo" aria-live="polite">
                        <li class="mensaje-carrito-vacio">No has seleccionado productos aún.</li>
                    </ul>

                    <div class="desglose-precios">
                        <div class="desglose-fila">
                            <span>Subtotal:</span>
                            <span id="span-subtotal">$0.00</span>
                        </div>
                        <div class="desglose-fila">
                            <span id="etiqueta-iva-resumen">IVA del 15 %:</span>
                            <span id="span-iva">$0.00</span>
                        </div>
                    </div>

                    <div class="resumen-total">
                        <strong>Total estimado:</strong>
                        <span id="span-total">$0.00</span>
                    </div>

                    <form id="form-compra" class="acciones-carrito" novalidate>
                        <div class="grupo-campo">
                            <label for="nombre-cliente" class="sr-only">Nombre del cliente</label>
                            <input type="text" id="nombre-cliente" class="campo-input" placeholder="Nombre completo del cliente" required maxlength="100" autocomplete="name">
                        </div>
                        <div class="grupo-campo">
                            <label for="correo-cliente" class="sr-only">Correo electrónico</label>
                            <input type="email" id="correo-cliente" class="campo-input" placeholder="Correo electrónico de contacto" required maxlength="120" autocomplete="email">
                        </div>
                        
                        <button type="submit" id="btn-confirmar-compra" class="boton boton-principal btn-submit-compra">
                            Confirmar Simulación <span>→</span>
                        </button>
                        <button type="button" id="btn-vaciar-carrito" class="btn-vaciar">
                            Vaciar Carrito
                        </button>
                    </form>
                </aside>
            </div>
        </div>
    </main>

    <!-- Notificación Flotante (Toast) -->
    <div id="toast" class="toast-notificacion" role="status" aria-live="polite"></div>

    <!-- Modal de Confirmación de Eliminación / Vaciado -->
    <div id="modal-confirmacion" class="modal-fondo" role="dialog" aria-modal="true" aria-labelledby="titulo-modal-confirmacion" aria-describedby="mensaje-modal-confirmacion" aria-hidden="true">
        <div class="modal-caja modal-confirmacion-caja">
            <div class="icono-advertencia" aria-hidden="true">⚠️</div>
            <h3 id="titulo-modal-confirmacion">Confirmar acción</h3>
            <p id="mensaje-modal-confirmacion" class="texto-confirmacion">¿Estás seguro de que deseas vaciar el carrito?</p>
            <div class="modal-acciones-doble">
                <button type="button" id="btn-cancelar-confirmacion" class="btn-modal-secundario">
                    Cancelar
                </button>
                <button type="button" id="btn-aceptar-confirmacion" class="btn-modal-peligro">
                    Sí, vaciar carrito
                </button>
            </div>
        </div>
    </div>

    <!-- Modal de Comprobante de Compra Simulada -->
    <div id="modal-compra" class="modal-fondo" role="dialog" aria-modal="true" aria-labelledby="titulo-comprobante" aria-hidden="true">
        <div class="modal-caja modal-comprobante">
            <div class="comprobante-encabezado">
                <div class="comprobante-marca" style="display: flex; align-items: center; gap: 12px;">
                    <div style="background: linear-gradient(135deg, #00e5ff, #8b5cf6); padding: 8px 12px; border-radius: 6px; display: grid; place-items: center; clip-path: polygon(12% 0, 100% 0, 100% 80%, 88% 100%, 0 100%, 0 20%);">
                        <span style="font-family: var(--fuente-titulo); font-size: 14px; font-weight: 900; color: #070a12;">ADZ</span>
                    </div>
                    <div class="comprobante-marca-texto">
                        <strong style="font-family: var(--fuente-titulo); font-size: 15px; color: #f4f7ff;">ADIC PLAY ZONE</strong>
                        <small style="display: block; font-size: 9px; color: #a855f7; letter-spacing: 1px; font-weight: 700;">COMPROBANTE DE SIMULACIÓN</small>
                    </div>
                </div>
                <span class="badge-estado-simulado" id="titulo-comprobante">Pedido simulado correctamente</span>
            </div>

            <div class="comprobante-meta">
                <div class="meta-item">
                    <span class="meta-etiqueta">Cliente:</span>
                    <strong id="cliente-modal" class="meta-valor"></strong>
                </div>
                <div class="meta-item">
                    <span class="meta-etiqueta">Correo:</span>
                    <span id="correo-modal" class="meta-valor"></span>
                </div>
                <div class="meta-item">
                    <span class="meta-etiqueta">Número de pedido:</span>
                    <strong id="num-orden" class="meta-valor codigo-orden"></strong>
                </div>
                <div class="meta-item">
                    <span class="meta-etiqueta">Fecha y hora:</span>
                    <span id="fecha-orden" class="meta-valor"></span>
                </div>
            </div>

            <div class="comprobante-tabla-contenedor" tabindex="0" aria-label="Detalle de productos simulados">
                <table class="tabla-comprobante">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th class="col-centro">Cant.</th>
                            <th class="col-derecha">P. Unitario</th>
                            <th class="col-derecha">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody id="resumen-modal"></tbody>
                </table>
            </div>

            <div class="comprobante-totales">
                <div class="comprobante-fila-total">
                    <span>Subtotal:</span>
                    <span id="modal-subtotal">$0.00</span>
                </div>
                <div class="comprobante-fila-total">
                    <span id="etiqueta-iva-modal">IVA del 15 %:</span>
                    <span id="modal-iva">$0.00</span>
                </div>
                <div class="comprobante-fila-total fila-total-estimado">
                    <strong>Total estimado:</strong>
                    <strong id="total-modal">$0.00</strong>
                </div>
            </div>

            <p class="nota-simulacion">
                * Comprobante académico de simulación. No corresponde a ningún cobro ni pago real.
            </p>

            <div class="modal-acciones-comprobante">
                <button type="button" id="btn-conservar-carrito" class="btn-modal-secundario">
                    Volver y conservar carrito
                </button>
                <button type="button" id="btn-finalizar-simulacion" class="boton boton-principal btn-cerrar-comprobante">
                    Finalizar y vaciar carrito
                </button>
            </div>
        </div>
    </div>

    <!-- Catálogo autoritativo exportado de forma segura desde PHP para validación cruzada -->
    <script id="adz-catalogo-datos" type="application/json" data-agregar-inicial="<?= $parametroAgregarInicial !== null ? htmlspecialchars($parametroAgregarInicial, ENT_QUOTES, 'UTF-8') : '' ?>">
        <?= json_encode($catalogoSeguridad, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE) ?>
    </script>
    <script src="js/carrito.js"></script>
</body>
</html>