# Proyecto-Final-de-E-commerce
# Compu-Soft 💻🛒

Un sitio web dinámico e interactivo de e-commerce dedicado a la simulación de venta de computadoras. El proyecto consume datos de una API REST de manera asíncrona para renderizar el catálogo de productos y cuenta con un sistema funcional de carrito de compras que persiste mediante `localStorage`.

Este desarrollo se enfoca especialmente en aplicar **etiquetas semánticas**, **estilos responsivos** y **estándares de accesibilidad web (WCAG)**.

## 📂 Estructura de Carpetas

El proyecto mantiene una arquitectura limpia y modular para separar las responsabilidades de diseño, lógica y maquetación:

Compu-Soft/
├── css/
│   └── styles.css          # Estilos e implementación de diseño responsivo
├── js/
│   └── mi_script.js        # Lógica del carrito, persistencia y Fetch de la API
├── img/
│   ├── logo.png            # Logotipo de la cabecera
│   ├── notebook.png        # Placeholder/Imagen por defecto para el catálogo
│   ├── armado_pc.jpg       # Imagen de la sección de servicios o armada
│   ├── perisfericos.jpg    # Imagen promocional de componentes/periféricos
│   ├── sala_gamer.webp     # Imagen de ambientación o banners
│   ├── persona1.webp       # Avatar para la sección de testimonios/reseñas 1
│   ├── persona2.webp       # Avatar para la sección de testimonios/reseñas 2
│   └── persona3.jpg        # Avatar para la sección de testimonios/reseñas 3
├── video/
│   └── presentacion.mp4    # Video institucional/demostrativo del index
├── computadoras.html       # Vista del catálogo y pasarela del carrito
├── index.html              # Landing page principal y formulario de contacto
└── README.md               # Manual técnico y pasos de despliegue

💻 Instalación y Ejecución Local
Al ser una aplicación web estática (Frontend nativo), no requiere de pasos complejos de compilación o instalación de dependencias de Node.js.

Requisitos previos
Un navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).

Opcional: Un editor de código como Visual Studio Code con la extensión Live Server instalada.

Pasos para ejecutar:
Clonar el repositorio o descargar el código:

Bash
git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
Abrir el proyecto:
Ingresá a la carpeta raíz del proyecto mediante tu editor de código o explorador de archivos.

Lanzar la aplicación:

Opción recomendada: Si usás VS Code, hacé clic derecho sobre index.html y seleccioná Open with Live Server. Esto montará un servidor local en http://127.0.0.1:5500/, lo cual previene restricciones de CORS y asegura que los scripts asíncronos funcionen de manera idéntica a producción.

Opción directa: Hacé doble clic sobre el archivo index.html para abrirlo directamente en el navegador.

🌐 Variables de Entorno: Este proyecto no requiere de variables de entorno (.env) en el entorno local, debido a que consume endpoints públicos y los formularios se procesan directamente del lado del cliente a través de servicios externos integrados.

🔌 Endpoints de la API REST
La aplicación interactúa asíncronamente con un servicio externo que provee la información en formato JSON.

URL Base / Endpoint Principal: https://api.jsonbin.io/v3/b/672fcb26acd3cb34a8a5f8e5

Método HTTP: GET

Estructura de la Respuesta Esperada:
El objeto debe contener una colección indexada de productos (laptops) bajo la propiedad contenedora, incluyendo: id (numérico), title (nombre comercial), description (especificaciones técnicas), price (valor monetario), e image (URL de la fotografía del producto).

🧪 Pruebas y Validación (QA)
Para comprobar el correcto funcionamiento y la robustez del sistema, se pueden realizar las siguientes validaciones manuales:

Flujo de Persistencia del Carrito:

Dirigite a computadoras.html y añadí un producto al carrito.

Recargá la página (F5) o cerrá el navegador; al regresar, el contador del menú y la lista del carrito deben mantener los elementos previamente guardados mediante localStorage.

Manejo de Errores y Timeout (Simulación):

Podés abrir las herramientas de desarrollo del navegador (F12), ir a la pestaña Network (Red) y cambiar el estado a Offline.

Al intentar recargar los productos, el sistema activará el AbortController o el bloque de captura de errores, inyectando visualmente un bloque accesible con el rol alert y la opción de "Reintentar cargar".

Auditoría de Accesibilidad (Lighthouse):

Desde la pestaña Lighthouse de las DevTools, ejecutá un análisis enfocado en Accessibility. El proyecto valida una correcta estructuración gracias al uso de roles ARIA y contrastes mínimos requeridos por la guía WCAG.

## 🚀 Despliegue en GitHub Pages

Dado que es un proyecto frontend puro (estático), su publicación en **GitHub Pages** es directa y rápida. Seguí estos pasos:

1. **Subí tu código a GitHub:**
   Asegurate de tener todos tus archivos actualizados en tu repositorio principal (rama `main` o `master`).

2. **Configurá las Pages:**
   * Entrá a tu repositorio en GitHub.
   * Ve a la pestaña **Settings** (Configuración) en el menú superior.
   * En la barra lateral izquierda, navegá hasta la sección **Pages**.

3. **Elegí la rama de despliegue:**
   * En el apartado *Build and deployment*, bajo la opción *Source*, seleccioná **Deploy from a branch**.
   * En *Branch*, seleccioná tu rama principal (`main`) y elegí la carpeta raíz (`/root`).
   * Hacé clic en **Save** (Guardar).

4. **¡Listo!**
   GitHub tardará un par de minutos en procesar el sitio. Verás un recuadro arriba con la URL pública (ej: `https://tu-usuario.github.io/tu-repositorio/`).

---

## 🛠️ Buenas Prácticas de Build y Pre-Despliegue

Antes de subir cambios definitivos a producción, es fundamental optimizar los recursos para mejorar la velocidad de carga (SEO) y la experiencia de usuario:

### 1. Rutas Relativas Limpias
* Revisá que los enlaces internos (`href="computadoras.html"`) y las llamadas a scripts o estilos (`src="js/mi_script.js"`, `href="css/styles.css"`) utilicen **rutas relativas**. 
* *Evitá* barras diagonales iniciales absolutas como `/css/styles.css` o rutas locales del disco (`D:/...`), ya que GitHub Pages corre bajo una subruta de tu usuario y rompería los enlaces.

### 2. Optimización de Imágenes y Multimedia
* **Compresión:** Pasa tus imágenes (`.png`, `.jpg`) por herramientas como [TinyPNG](https://tinypng.com/) antes de subirlas para reducir drásticamente su peso sin perder calidad visual.
* **Formatos Modernos:** De ser posible, convertí las imágenes pesadas a formatos web modernos como `.webp`.

### 3. Minificación (Opcional pero Recomendado)
* Para entornos de producción reales, pasar tus archivos CSS (`styles.css`) y JavaScript (`mi_script.js`) por un minificador (como *Minifier* o extensiones de VS Code) reduce el tamaño de transferencia eliminando espacios en blanco y comentarios innecesarios.

### 4. Auditoría de Accesibilidad
* Ejecutá la herramienta **Lighthouse** en las herramientas de desarrollo de tu navegador (F12) tras el despliegue para asegurarte de que tu puntuación de accesibilidad cumpla con los estándares propuestos gracias al uso correcto de tags semánticos y atributos `aria-*`.

---
🔧 **Desarrollado con HTML5, CSS3 (Flexbox/Grid), JavaScript Vanilla y SweetAlert2.**