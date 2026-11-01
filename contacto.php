<?php
// Página de presentación del equipo: no utiliza datos personales de contacto inventados.
$integrantes = [
    ['nombre' => 'Jesús Rafael Fernández Pérez', 'iniciales' => 'JF'],
    ['nombre' => 'Jose Andres Merlin Gamboa', 'iniciales' => 'JM'],
    ['nombre' => 'Terry Steven Ponce Farias', 'iniciales' => 'TP'],
    ['nombre' => 'José Alberto Rosado Domínguez', 'iniciales' => 'JR'],
    ['nombre' => 'Elkin Daniel Velastegui Zambrano', 'iniciales' => 'EV'],
    ['nombre' => 'Zahid Joel Zambrano Moreira', 'iniciales' => 'ZZ'],
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Conoce a los seis integrantes detrás de ADICPLAYZONE, un proyecto académico de Programación Web Avanzada.">
    <meta name="theme-color" content="#080a12">
    <title>Contacto y equipo | ADICPLAYZONE</title>
    <link rel="icon" type="image/jpeg" href="logo-adz.jpg">
    <link rel="stylesheet" href="css/estilos_catalogo.css">
    <link rel="stylesheet" href="css/contacto.css">
    <script src="js/contacto.js" defer></script>
</head>
<body class="pagina-catalogo pagina-contacto">
    <a class="saltar-contenido" href="#contenido">Saltar al contenido</a>
    <div class="barra-superior"><p>✦ ADICPLAYZONE · PERSONAS QUE HACEN POSIBLE LAS IDEAS</p></div>
    <header class="encabezado">
        <div class="contenedor navegacion">
            <a class="logo" href="index.php#inicio" aria-label="Volver al inicio de ADICPLAYZONE">
                <img class="logo-imagen" src="logo-adz.jpg" alt="" width="52" height="52">
                <span class="logo-texto">ADIC<span>PLAY</span>ZONE<small>TECNOLOGÍA Y MÁS</small></span>
            </a>
            <button type="button" class="menu-toggle" id="menu-toggle" aria-controls="menu-principal" aria-expanded="false" aria-label="Abrir menú de navegación">
                <span></span><span></span><span></span>
            </button>
            <nav class="menu" id="menu-principal" aria-label="Navegación principal">
                <a href="index.php#inicio" class="nav-enlace">Inicio</a>
                <a href="index.php#categorias" class="nav-enlace">Categorías</a>
                <a href="index.php#productos" class="nav-enlace">Productos</a>
                <a href="index.php#nosotros" class="nav-enlace">Nosotros</a>
                <a href="contacto.php" class="nav-enlace contacto-activo" aria-current="page">Contacto y equipo</a>
                <a href="carrito.php" class="nav-carrito" aria-label="Abrir carrito de compras">🛒 <span>Carrito</span></a>
            </nav>
        </div>
    </header>
    <main id="contenido">
        <section class="equipo-hero" aria-labelledby="titulo-equipo">
            <div class="equipo-halo equipo-halo-azul" aria-hidden="true"></div>
            <div class="equipo-halo equipo-halo-morado" aria-hidden="true"></div>
            <div class="contenedor equipo-hero-grid">
                <div class="equipo-hero-copy">
                    <p class="equipo-eyebrow"><span class="equipo-punto" aria-hidden="true"></span> DETRÁS DE ADICPLAYZONE</p>
                    <h1 id="titulo-equipo">La tecnología conecta.<br><span>Las personas crean.</span></h1>
                    <p class="equipo-hero-descripcion">Detrás de cada página, cada idea y cada detalle hay un equipo trabajando en conjunto. Conoce a las personas que forman parte de ADICPLAYZONE.</p>
                    <div class="equipo-acciones">
                        <a class="boton boton-principal" href="#integrantes">Conocer a los integrantes <span aria-hidden="true">↓</span></a>
                        <a class="boton boton-secundario" href="index.php">Explorar la tienda <span aria-hidden="true">↗</span></a>
                    </div>
                    <div class="equipo-leyenda"><span>PROYECTO ACADÉMICO</span><span aria-hidden="true">◆</span><span>PROGRAMACIÓN WEB AVANZADA</span></div>
                </div>
                <div class="equipo-hero-arte" aria-hidden="true">
                    <div class="equipo-orbita equipo-orbita-externa"></div>
                    <div class="equipo-orbita equipo-orbita-interna"></div>
                    <div class="equipo-centro">
                        <span class="equipo-centro-sigla">ADZ</span>
                        <span class="equipo-centro-linea"></span>
                        <span>THE TEAM</span>
                    </div>
                    <div class="equipo-satelite satelite-uno">CREATIVIDAD <span>✦</span></div>
                    <div class="equipo-satelite satelite-dos"><span>◈</span> COLABORACIÓN</div>
                    <div class="equipo-satelite satelite-tres">TECNOLOGÍA <span>↗</span></div>
                    <div class="equipo-numero"><strong>06</strong><span>INTEGRANTES</span></div>
                </div>
            </div>
        </section>
        <section class="equipo-integrantes" id="integrantes" aria-labelledby="titulo-integrantes">
            <div class="contenedor">
                <div class="equipo-titulo-fila">
                    <div>
                        <span class="sobre-titulo">CONOCE A QUIENES ESTÁN DETRÁS</span>
                        <h2 id="titulo-integrantes">Un proyecto.<br><span>Seis integrantes.</span></h2>
                    </div>
                    <p>Cada integrante forma parte de la construcción de esta experiencia académica. Los nombres aparecen en el orden indicado por el equipo.</p>
                </div>
                <div class="equipo-tarjetas">
                    <?php foreach ($integrantes as $indice => $integrante): ?>
                        <article class="equipo-tarjeta">
                            <div class="tarjeta-superior"><span>ADZ / EQUIPO</span><span><?= str_pad((string)($indice + 1), 2, '0', STR_PAD_LEFT) ?> — 06</span></div>
                            <div class="tarjeta-avatar" aria-hidden="true"><span><?= htmlspecialchars($integrante['iniciales'], ENT_QUOTES, 'UTF-8') ?></span></div>
                            <div class="tarjeta-identidad">
                                <span class="tarjeta-puesto">INTEGRANTE <?= str_pad((string)($indice + 1), 2, '0', STR_PAD_LEFT) ?></span>
                                <h3><?= htmlspecialchars($integrante['nombre'], ENT_QUOTES, 'UTF-8') ?></h3>
                            </div>
                            <div class="tarjeta-pie"><span>ADICPLAYZONE</span><span aria-hidden="true">✳</span></div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
        <section class="equipo-conectar" aria-labelledby="titulo-contacto">
            <div class="contenedor">
                <div class="conectar-panel">
                    <div class="conectar-deco" aria-hidden="true">✦</div>
                    <div>
                        <span class="sobre-titulo">CONTACTO · EQUIPO ACADÉMICO</span>
                        <h2 id="titulo-contacto">¿Quieres conocer más <span>del proyecto?</span></h2>
                        <p>ADICPLAYZONE es una demostración universitaria. Esta sección presenta a sus integrantes; no se publican correos ni números de contacto que no hayan sido proporcionados.</p>
                    </div>
                    <div class="conectar-acciones">
                        <a class="boton boton-principal" href="#integrantes">Ver integrantes <span aria-hidden="true">↑</span></a>
                        <a class="boton boton-secundario" href="index.php#productos">Volver al catálogo <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footer class="footer footer-equipo">
        <div class="contenedor equipo-footer-interior">
            <div class="equipo-footer-marca"><strong>ADIC<span>PLAY</span>ZONE</strong><p>Diseñado como proyecto académico de Programación Web Avanzada.</p></div>
            <nav aria-label="Enlaces al pie de página">
                <a href="index.php#inicio">Inicio</a>
                <a href="index.php#productos">Productos</a>
                <a href="contacto.php" aria-current="page">Contacto y equipo</a>
                <a href="carrito.php">Carrito</a>
            </nav>
        </div>
        <div class="footer-inferior"><div class="contenedor equipo-footer-inferior"><span>© <?= date('Y') ?> ADICPLAYZONE · Proyecto académico.</span><a href="#contenido">Volver arriba ↑</a></div></div>
    </footer>
</body>
</html>
