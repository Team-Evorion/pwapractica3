<?php
require __DIR__ . '/productos.php';
$categorias = [
    ["icono" => "💻", "nombre" => "Laptops y computadoras", "id" => "laptops"],
    ["icono" => "📱", "nombre" => "Celulares y tablets", "id" => "celulares"],
    ["icono" => "🎧", "nombre" => "Audio y sonido", "id" => "audifonos"],
    ["icono" => "⌚", "nombre" => "Smartwatches y wearables", "id" => "smartwatches"],
    ["icono" => "🖱️", "nombre" => "Accesorios tecnológicos", "id" => "accesorios"],
    ["icono" => "🎮", "nombre" => "Gaming y entretenimiento", "id" => "consolas"]
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ADICPLAYZONE: descubre celulares, laptops, audio y accesorios tecnológicos en una tienda de demostración.">
    <meta name="theme-color" content="#080a12">
    <title>ADICPLAYZONE | Tecnología para todos tus momentos</title>
    <link rel="stylesheet" href="css/estilos_catalogo.css">
    <link rel="icon" type="image/jpeg" href="logo-adz.jpg">
    <script src="js/catalogo.js" defer></script>
</head>
<body class="pagina-catalogo">
    <a href="#contenido" class="saltar-contenido">Saltar al contenido</a>
    <div id="inicio" class="ancla-inicio" aria-hidden="true"></div>
    <div class="barra-superior"><p>⚡ Tecnología para todos tus momentos · Descubre tu próximo favorito</p></div>
    <header class="encabezado">
        <div class="contenedor navegacion">
            <a class="logo" href="#inicio" aria-label="ADICPLAYZONE, ir al inicio">
                <img src="logo-adz.jpg" width="52" height="52" alt="" class="logo-imagen">
                <span class="logo-texto">ADIC<span>PLAY</span>ZONE<small>TECNOLOGÍA Y MÁS</small></span>
            </a>
            <button type="button" class="menu-toggle" id="menu-toggle" aria-controls="menu-principal" aria-expanded="false" aria-label="Abrir menú de navegación">
                <span></span><span></span><span></span>
            </button>
            <nav class="menu" id="menu-principal" aria-label="Navegación principal">
                <a href="#inicio" class="nav-enlace">Inicio</a>
                <details class="nav-grupo">
                    <summary>Categorías <span aria-hidden="true">⌄</span></summary>
                    <div class="nav-submenu">
                        <button type="button" data-filtro="todos">Todas las categorías</button>
                        <?php foreach ($categorias as $categoria): ?>
                            <button type="button" data-filtro="<?= htmlspecialchars($categoria['id'], ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($categoria['nombre'], ENT_QUOTES, 'UTF-8') ?></button>
                        <?php endforeach; ?>
                    </div>
                </details>
                <details class="nav-grupo">
                    <summary>Productos <span aria-hidden="true">⌄</span></summary>
                    <div class="nav-submenu">
                        <button type="button" data-filtro="todos">Todos los productos</button>
                        <?php foreach ($categorias as $categoria): ?>
                            <button type="button" data-filtro="<?= htmlspecialchars($categoria['id'], ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($categoria['nombre'], ENT_QUOTES, 'UTF-8') ?></button>
                        <?php endforeach; ?>
                    </div>
                </details>
                <a href="#nosotros" class="nav-enlace">Nosotros</a>
                <a href="contacto.php" class="nav-enlace">Contacto</a>
                <a class="nav-carrito" href="carrito.php" aria-label="Abrir carrito de compras">🛒 <span>Carrito</span></a>
            </nav>
        </div>
    </header>
    <main id="contenido">

        <section class="hero">
            <div class="hero-fondo brillo-uno"></div>
            <div class="hero-fondo brillo-dos"></div>

            <div class="contenedor hero-contenido">
                <div class="hero-texto">
                    <div class="etiqueta etiqueta-superior">
                        <span class="punto punto-luz"></span>
                        TU UNIVERSO TECNOLÓGICO
                    </div>

                    <h1>
                        La tecnología que buscas.<br>
                        <span>El futuro que imaginas.</span>
                    </h1>

                    <p>
                        Explora celulares, laptops, audio, accesorios y
                        entretenimiento digital en un solo lugar.
                        Encuentra tecnología que se adapta a tu vida.
                    </p>

                    <div class="hero-botones hero-acciones">
                        <a class="boton boton-principal" href="#productos">
                            Ver productos <span>→</span>
                        </a>
                        <a class="boton boton-secundario boton-texto" href="carrito.php">
                            Ir al Carrito <span>🛒</span>
                        </a>
                    </div>

                    <div class="hero-datos">
                        <div>
                            <strong>6+</strong>
                            <span>Categorías de tecnología</span>
                        </div>
                        <i></i>
                        <div>
                            <strong>ADZ</strong>
                            <span>Tu espacio digital</span>
                        </div>
                        <i></i>
                        <div>
                            <strong>100%</strong>
                            <span>Pasión por innovar</span>
                        </div>
                    </div>
                </div>

                <div class="hero-visual">
                    <div class="orb orb-grande"></div>
                    <div class="orb orb-pequeno"></div>
                    <div class="anillo anillo-uno"></div>
                    <div class="anillo anillo-dos"></div>

                    <div class="tarjeta-flotante tarjeta-arriba">
                        <span class="tarjeta-icono">✦</span>
                        <span>
                            <b>Tech lifestyle</b>
                            <small>Conecta con lo nuevo</small>
                        </span>
                    </div>

                    <div class="dispositivo">
                        <div class="dispositivo-pantalla">
                            <div class="pantalla-cabecera">
                                <span>ADZ</span>
                                <span>● ● ●</span>
                            </div>

                            <div class="pantalla-centro">
                                <span class="simbolo-az">A</span>
                                <strong>ADICPLAYZONE</strong>
                                <small>TECHNOLOGY · INNOVATION</small>
                            </div>

                            <div class="pantalla-pie">
                                <span>EXPLORE MORE</span>
                                <span>2026 / ADZ</span>
                            </div>
                        </div>
                        <div class="dispositivo-base"></div>
                    </div>

                    <div class="tarjeta-flotante tarjeta-abajo">
                        <span class="mini-icono">⌁</span>
                        <span>
                            <b>Todo conectado</b>
                            <small>Un mundo de posibilidades</small>
                        </span>
                    </div>

                    <span class="decoracion decoracion-uno">✧</span>
                    <span class="decoracion decoracion-dos">＋</span>
                </div>
            </div>

            <div class="hero-pie">
                <span>INNOVACIÓN</span>
                <span class="linea-pie"></span>
                <span>ESTILO</span>
                <span class="linea-pie"></span>
                <span>CONEXIÓN</span>
            </div>
        </section>

        <section class="seccion categorias categorias-seccion" id="categorias">
            <div class="contenedor">
                <div class="encabezado-seccion">
                    <div>
                        <span class="sobre-titulo eyebrow">EXPLORA ADZ</span>
                        <h2>Un mundo de tecnología</h2>
                    </div>
                    <p>
                        Encuentra lo que necesitas para trabajar,
                        estudiar, crear y divertirte.
                    </p>
                </div>

                <div class="categorias-grid">
                    <?php foreach ($categorias as $categoria): ?>
                        <button class="categoria-card" type="button" data-filtro="<?= htmlspecialchars($categoria["id"], ENT_QUOTES, "UTF-8") ?>" aria-pressed="false">
                            <span class="categoria-icono">
                                <?= htmlspecialchars($categoria["icono"]) ?>
                            </span>
                            <span class="categoria-nombre">
                                <?= htmlspecialchars($categoria["nombre"]) ?>
                            </span>
                            <span class="categoria-flecha">↗</span>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <section class="seccion productos productos-seccion" id="productos">
            <div class="contenedor">
                <div class="encabezado-seccion productos-encabezado">
                    <div>
                        <span class="sobre-titulo eyebrow">SELECCIÓN ADZ</span>
                        <h2>Tecnología para tu día a día</h2>
                    </div>
                    <p>
                        Dispositivos y accesorios para acompañarte
                        en cada momento.
                    </p>
                </div>

                <div class="catalogo-filtros" role="group" aria-label="Filtrar por categoría">
                    <button type="button" class="filtro-todos activo" data-filtro="todos" aria-pressed="true">Todos los productos</button>
                    <span id="estado-filtro" role="status" aria-live="polite">Mostrando los 6 productos</span>
                </div>
                <div class="productos-grid" id="catalogo-grid">
                    <?php foreach ($productos as $producto): ?>
                        <article
                            class="producto-card"
                            id="<?= htmlspecialchars($producto['id'], ENT_QUOTES, 'UTF-8') ?>"
                            data-categoria="<?= htmlspecialchars($producto['categoria_id'], ENT_QUOTES, 'UTF-8') ?>"
                            data-producto-id="<?= htmlspecialchars($producto['id'], ENT_QUOTES, 'UTF-8') ?>"
                        >
                            <div class="producto-imagen">
                                <img
                                    src="<?= htmlspecialchars($producto["imagen"]) ?>"
                                    alt="<?= htmlspecialchars($producto["nombre"]) ?>"
                                    loading="lazy"
                                    decoding="async"
                                >

                                <span class="producto-etiqueta">
                                    <?= htmlspecialchars($producto["etiqueta"]) ?>
                                </span>

                                <button
                                    class="favorito"
                                    type="button"
                                    aria-label="Marcar como favorito"
                                    aria-pressed="false"
                                    title="Marcar como favorito"
                                >♡</button>
                            </div>

                            <div class="producto-info">
                                <span class="producto-categoria">
                                    <?= htmlspecialchars($producto["categoria"]) ?>
                                </span>

                                <h3>
                                    <?= htmlspecialchars($producto["nombre"]) ?>
                                </h3>

                                <p class="producto-descripcion">
                                    <?= htmlspecialchars($producto["descripcion"]) ?>
                                </p>

                                <div class="producto-pie">
                                    <div class="producto-precio">
                                        <small>Precio</small>
                                        <strong>
                                            $<?= number_format($producto["precio"], 2) ?>
                                        </strong>
                                    </div>

                                    <!-- El enlace envía únicamente el ID; la lógica del carrito está fuera de este archivo. -->
                                    <a
                                        class="boton-producto producto-boton"
                                        href="carrito.php?agregar=<?= rawurlencode((string)$producto['id']) ?>"
                                        title="Agregar al carrito"
                                        aria-label="Agregar <?= htmlspecialchars($producto["nombre"], ENT_QUOTES, 'UTF-8') ?> al carrito"
                                    ><span aria-hidden="true">🛒</span> <span class="texto-agregar">Agregar</span></a>
                                </div>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>

                <p id="sin-productos" class="sin-productos" role="status" hidden>Actualmente no hay productos disponibles en esta categoría.</p>
                <p class="nota-catalogo nota-precios">
                    Los productos, imágenes y precios son ilustrativos
                    y deben confirmarse antes de publicar la tienda.
                </p>
            </div>
        </section>

        <section class="franja-llamada">
            <div class="contenedor franja-contenido">
                <div>
                    <span class="sobre-titulo eyebrow">TU PRÓXIMO NIVEL EMPIEZA AQUÍ</span>
                    <h2>Conecta con lo que te mueve.</h2>
                    <p>La tecnología adecuada puede transformar tu día.</p>
                </div>

                <a class="boton boton-principal" href="carrito.php">
                    Ir al Carrito de Compras <span>→</span>
                </a>
            </div>
        </section>

        <section class="seccion nosotros nosotros-seccion" id="nosotros">
            <div class="contenedor nosotros-contenido">
                <div class="nosotros-visual nosotros-grafico">
                    <div class="nosotros-cuadro grafico-cuadro">
                        <span class="nosotros-logo">ADZ</span>
                        <strong>TECH<br>UNIVERSE</strong>
                        <small class="nosotros-frase">INNOVATE YOUR EVERYDAY</small>
                    </div>
                    <span class="grafico-brillo"></span>
                </div>

                <div class="nosotros-texto">
                    <span class="sobre-titulo eyebrow">SOMOS ADICPLAYZONE</span>
                    <h2>La tecnología va más allá de una pantalla.</h2>

                    <p>
                        ADICPLAYZONE nace como un espacio para descubrir
                        productos electrónicos y soluciones digitales que
                        acompañan tus ideas, tu entretenimiento y tu vida cotidiana.
                    </p>

                    <p>
                        Desde dispositivos móviles y computadoras hasta audio
                        y accesorios, nuestro objetivo es acercarte a un
                        universo de posibilidades tecnológicas.
                    </p>

                    <a class="boton boton-secundario enlace-flecha" href="contacto.php">
                        Conoce a nuestro equipo <span>→</span>
                    </a>
                </div>
            </div>
        </section>

        <section class="beneficios">
            <div class="contenedor beneficios-grid">
                <div class="beneficio">
                    <span class="beneficio-icono">✦</span>
                    <div>
                        <h3>Variedad tecnológica</h3>
                        <p>Productos para diferentes necesidades.</p>
                    </div>
                </div>

                <div class="beneficio">
                    <span class="beneficio-icono">⌁</span>
                    <div>
                        <h3>Estilo e innovación</h3>
                        <p>Tecnología con una identidad moderna.</p>
                    </div>
                </div>

                <div class="beneficio">
                    <span class="beneficio-icono">◎</span>
                    <div>
                        <h3>Experiencia sencilla</h3>
                        <p>Explora productos en un solo lugar.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footer class="footer">
        <div class="contenedor footer-principal">
            <div class="footer-marca">
                <a class="logo" href="#inicio" aria-label="ADICPLAYZONE, volver al inicio">
                    <img src="logo-adz.jpg" width="52" height="52" alt="" class="logo-imagen">
                    <span class="logo-texto">ADIC<span>PLAY</span>ZONE<small>TECNOLOGÍA Y MÁS</small></span>
                </a>
                <p>Tu universo de tecnología, conexión y entretenimiento.</p>
            </div>
            <div class="footer-columna">
                <h3>Explora</h3>
                <a href="#inicio">Inicio</a>
                <a href="#categorias">Categorías</a>
                <button type="button" data-filtro="todos">Todos los productos</button>
                <a href="carrito.php">Carrito de compras</a>
            </div>
            <div class="footer-columna">
                <h3>ADZ</h3>
                <a href="#nosotros">Sobre nosotros</a>
                <a href="contacto.php">Contacto</a>
                <a href="#productos">Productos destacados</a>
            </div>
            <div class="footer-columna footer-contacto">
                <h3>Contacto y equipo</h3>
                <p>Conoce a las seis personas que forman parte de este proyecto académico.</p>
                <a class="footer-link-equipo" href="contacto.php">Conocer al equipo <span aria-hidden="true">↗</span></a>
            </div>
        </div>
        <div class="footer-inferior">
            <div class="contenedor footer-final-contenido">
                <span>© <?= date('Y') ?> ADICPLAYZONE · Proyecto académico de demostración.</span>
                <a class="volver-arriba" href="#inicio">Volver arriba ↑</a>
            </div>
        </div>
    </footer>
</body>
</html>
