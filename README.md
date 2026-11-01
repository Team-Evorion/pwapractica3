# ⚡ ADICPLAYZONE
### Catálogo de productos tecnológicos y carrito de compras interactivo

**ADICPLAYZONE** es una aplicación web desarrollada como parte de la **Clase Práctica 3 de Programación Web Avanzada** de la **Universidad Bolivariana del Ecuador (UBE)**.

El proyecto consiste en una tienda tecnológica que permite visualizar productos, explorar categorías, agregar artículos a un carrito de compras y generar comprobantes de pedidos simulados.

Se desarrolló utilizando **HTML5, CSS3, JavaScript y PHP**, implementando un diseño moderno, responsive y una identidad visual basada en negro, azul eléctrico y morado.

> **Nota:** ADICPLAYZONE es un proyecto académico. No procesa pagos reales ni realiza transacciones comerciales.

---

## 🚀 Funcionalidades principales

### 🛍️ 1. Catálogo dinámico de productos

- Visualización de imágenes, nombres, descripciones y precios.
- Generación dinámica del catálogo mediante **arreglos PHP y `foreach`**.
- Organización de productos por categorías.
- Filtrado dinámico mediante **JavaScript**, sin recargar la página.
- Resaltado visual de la categoría seleccionada.
- Opción para mostrar todos los productos.
- Botones para agregar artículos al carrito.
- Diseño adaptable a computadoras, tablets y celulares.

### 🛒 2. Carrito de compras interactivo

El carrito permite:

- Agregar productos desde el catálogo.
- Incrementar y disminuir cantidades.
- Eliminar productos individualmente.
- Vaciar el carrito con confirmación previa.
- Buscar artículos por nombre o descripción.
- Mostrar mensajes cuando no se encuentran productos.
- Calcular automáticamente el subtotal.
- Calcular el **IVA del 15 %**.
- Mostrar el total estimado.
- Conservar los productos utilizando **localStorage**.
- Validar los datos almacenados en el navegador.

### 🧾 3. Simulación de compra

El sistema genera un comprobante de pedido simulado con:

- Identificador ficticio del pedido.
- Nombre del cliente.
- Fecha y hora.
- Productos seleccionados.
- Cantidades.
- Precios unitarios.
- Subtotal.
- IVA del 15 %.
- Total estimado.

**Importante:** esta función es exclusivamente académica. No solicita tarjetas bancarias ni procesa pagos.

### 👥 4. Página de contacto y equipo

Se desarrolló una página independiente denominada `contacto.php`, que presenta a los integrantes del equipo mediante tarjetas con una estética tecnológica.

### 📱 5. Diseño responsive

La aplicación se adapta a diferentes tamaños de pantalla:

- Computadoras de escritorio.
- Computadoras portátiles.
- Tablets.
- Teléfonos móviles.

La interfaz incorpora menús adaptables, navegación interactiva, efectos visuales y una distribución flexible de los elementos.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Descripción |
|------------|-------------|
| **HTML5** | Estructura de las páginas web. |
| **CSS3** | Diseño, estilos y animaciones. |
| **JavaScript** | Interactividad, filtros y carrito. |
| **PHP** | Generación dinámica del catálogo y datos de productos. |
| **localStorage** | Persistencia de artículos en el navegador. |
| **XAMPP** | Entorno local con Apache y PHP. |
| **Git** | Control de versiones del proyecto. |
| **GitHub** | Repositorio y colaboración del equipo. |

---

## 📂 Estructura del proyecto

```text
pwapractica3/
│
├── index.php
├── carrito.php
├── contacto.php
├── productos.php
├── logo-adz.jpg
├── LEEME.md
├── README.md
│
├── css/
│   ├── estilos.css
│   ├── estilos_catalogo.css
│   ├── estilos_carrito.css
│   └── contacto.css
│
└── js/
    ├── catalogo.js
    ├── carrito.js
    └── contacto.js
```

### 📄 Descripción de los archivos

| Archivo | Función |
|---------|---------|
| `index.php` | Página principal y catálogo tecnológico. |
| `carrito.php` | Gestión del carrito y simulación de pedidos. |
| `contacto.php` | Presentación del equipo de desarrollo. |
| `productos.php` | Datos compartidos de los productos mediante PHP. |
| `estilos.css` | Estilos generales del proyecto. |
| `estilos_catalogo.css` | Diseño de la página principal y catálogo. |
| `estilos_carrito.css` | Estilos de la página del carrito. |
| `contacto.css` | Diseño de la sección de contacto y equipo. |
| `catalogo.js` | Filtrado de categorías e interacciones del catálogo. |
| `carrito.js` | Operaciones y funcionalidades del carrito. |
| `contacto.js` | Interacciones de la página de contacto. |

---

## 💻 Instalación y ejecución local

### Requisitos previos

- Tener instalado **XAMPP**.
- Disponer de un navegador actualizado.
- Tener **Git** instalado para clonar el repositorio.

### Paso 1. Clonar el repositorio

Abre **Git Bash** y ejecuta:

```bash
git clone https://github.com/Team-Evorion/pwapractica3.git
```

También puedes descargar el proyecto como ZIP desde GitHub.

### Paso 2. Ubicar el proyecto

Copia o clona la carpeta `pwapractica3` dentro de:

```text
C:\xampp\htdocs\
```

La ubicación final será:

```text
C:\xampp\htdocs\pwapractica3
```

### Paso 3. Iniciar Apache

1. Abre el panel de control de XAMPP.
2. Inicia el servicio **Apache**.
3. Comprueba que el servidor esté funcionando.

**Nota:** No es necesario iniciar MySQL para esta versión del proyecto, ya que los productos se administran mediante arreglos PHP.

### Paso 4. Abrir ADICPLAYZONE

Ingresa a la dirección:

```text
http://localhost/pwapractica3/index.php
```

La aplicación debería mostrar el catálogo principal.

---

## 🎮 ¿Cómo utilizar ADICPLAYZONE?

1. Ingresa a la página principal.
2. Explora el catálogo tecnológico.
3. Selecciona una categoría para filtrar los productos.
4. Elige el artículo que deseas agregar al carrito.
5. Accede al carrito de compras.
6. Modifica las cantidades o elimina productos.
7. Consulta el subtotal, IVA y total estimado.
8. Realiza una simulación de pedido.
9. Visualiza el comprobante generado.
10. Visita la sección **Contacto** para conocer al equipo.

---

## 👥 Integrantes del proyecto

El proyecto fue desarrollado por los estudiantes:

1. **Jesús Rafael Fernández Pérez**
2. **Jose Andres Merlin Gamboa**
3. **Terry Steven Ponce Farias**
4. **José Alberto Rosado Domínguez**
5. **Elkin Daniel Velastegui Zambrano**
6. **Zahid Joel Zambrano Moreira**

### 🏫 Información académica

**Universidad:** Universidad Bolivariana del Ecuador (UBE)

**Asignatura:** Programación Web Avanzada

**Actividad:** Clase Práctica 3

**Unidad:** Programación BackEnd y FrontEnd

**Año:** 2026

---

## 🎯 Objetivo académico

Aplicar conocimientos de desarrollo web mediante la construcción de una aplicación que integre tecnologías frontend y backend.

El proyecto permite poner en práctica:

- Estructuración de páginas mediante HTML5.
- Diseño visual utilizando CSS3.
- Manipulación del DOM con JavaScript.
- Programación dinámica mediante PHP.
- Manejo de arreglos y estructuras de datos.
- Uso de eventos e interacciones.
- Implementación de un carrito de compras.
- Almacenamiento local de información.
- Organización modular de archivos.
- Diseño responsive y experiencia de usuario.
- Control de versiones mediante Git y GitHub.

---

## 🔒 Consideraciones del proyecto

- El sistema fue desarrollado con fines educativos.
- Los productos utilizan información demostrativa.
- El carrito almacena la selección mediante `localStorage`.
- Los datos del navegador no constituyen un registro de pedidos en un servidor.
- No se procesan pagos reales.
- Las imágenes externas pueden requerir conexión a Internet.
- La aplicación necesita un servidor compatible con PHP.
- **GitHub Pages no ejecuta PHP directamente.**

---

## 🔗 Enlaces del proyecto

### Repositorio GitHub

https://github.com/Team-Evorion/pwapractica3

### 🌐 Sitio web publicado

**Estado:** Pendiente de despliegue en un hosting compatible con PHP.

**URL:** Por agregar cuando se publique la aplicación.

---

## 📌 Posibles mejoras futuras

- Incorporación de una base de datos MySQL.
- Administración dinámica de inventario.
- Registro e inicio de sesión de usuarios.
- Historial de pedidos.
- Panel administrativo.
- Gestión de existencias.
- Integración de servicios adicionales.

Estas funcionalidades se plantean como posibilidades de ampliación y no forman parte de la implementación actual.

---

## 📚 Conclusión

**ADICPLAYZONE** demuestra la integración de **HTML, CSS, JavaScript y PHP** en una aplicación web interactiva.

Su desarrollo permitió aplicar conocimientos de programación frontend y backend, fortalecer la organización del código y trabajar colaborativamente en la construcción de un catálogo tecnológico con carrito de compras.

---

### ⚡ ADICPLAYZONE
**Tecnología, innovación y desarrollo web.**

*Universidad Bolivariana del Ecuador — Programación Web Avanzada — 2026.*
