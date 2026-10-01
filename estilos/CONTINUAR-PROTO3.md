# Continuar con Proto 3 — cierre de sesión, 2026-10-01

Este documento resume lo acordado con Eva y Luis. Leerlo junto con AGENTS.md y estilos/LOG.md. Las decisiones más recientes sustituyen preferencias anteriores contradictorias.

## Proyecto y versiones

Repositorio: https://github.com/lluissuros/tsenoh-prototype

| Versión | URL | Código | Estado |
|---|---|---|---|
| Proto 1 | https://lluissuros.github.io/tsenoh-prototype/v1/ | v1/ | Referencia congelada; no editar |
| Proto 2 | https://lluissuros.github.io/tsenoh-prototype/ | archivos en raíz | Referencia conservada; no rediseñar |
| Proto 3 | https://lluissuros.github.io/tsenoh-prototype/v3/ | v3/ | Versión sobre la que continuar |

Sitio estático HTML/CSS/JS, publicado en GitHub Pages al subir a main. No hay paso de compilación de frontend. v3/index.html utiliza ../data.js y recursos compartidos ../assets/ y ../fonts/. Textos ES/EN: v3/copy.js; lógica: v3/app.js; estilos: v3/styles.css. Productos y fotos provienen del catálogo de tsenoh.com en data.js. Las imágenes del catálogo son URLs de Shopify.

Commits de esta sesión:
- bb8f992801052110837d5002cf4ab10bea59eba7: crea Proto 3; despliegue de Pages confirmado correcto.
- 0ca19598229fa662eb2600beab92c03f41f70f4c: elimina etiquetas 1/1 y círculos de botones + en Proto 3; push confirmado. Comprobar Pages si fuera necesario.
- Al continuar, leer main actual: puede haber cambios posteriores de Luis. No sobrescribirlos.

## Cómo trabajar con Eva

Eva trabaja desde iPhone y no sabe programación ni GitHub. Explicar resultados con palabras sencillas y proporcionar siempre el enlace visible del prototipo. Puede revisar la web en un ordenador antiguo sin instalar Codex.
Luis autorizó explícitamente commits/push directamente a main, sin pull requests. Ya se confirmó permiso push:true de la conexión de Eva. No necesita una nueva confirmación para los cambios acordados. No hacer force push.
Cuando Eva vaya enumerando cambios, anotarlos y esperar a que indique que ha terminado o diga que los apliquemos. Los cuatro cambios pendientes/realizados de abajo ya están autorizados.
No generar más láminas de diseño: rechazó las tres opciones generadas de forma muy clara. Quiere trabajar sobre los prototipos reales y sus fotos.

## Dirección vigente

Fusionar Proto 1 y Proto 2 usando lo que ya existe. No inventar fotos, logo, composiciones ajenas ni textos definitivos.
- Logo original manuscrito de Eva siempre: assets/logo-tsenoh.png, utilizado con máscara CSS.
- DIN como fuente de textos/controles. D-DIN local en fonts/d-din-400.woff2 y d-din-700.woff2.
- Se puede combinar con Bodoni Moda, la serifa del Proto 1, en títulos principales. No Permanent Marker ni letra manual para textos como Desliza/Hecho despacio.
- Intro rosa del Proto 2, logo que se desvela y pequeña luna debajo que se llena. No pantalla negra ni estrella como indicador de intro.
- Mantener foto original de ovejas, logo blanco, Good Textile Goods y Ven a ver. Le encanta en móvil cómo flotan los trazos de luna/estrellas alrededor de la oveja; conservarlo y comprobar móvil/ordenador.
- Formas de fotos del Proto 1: alternar arcos con rectángulos de esquinas redondeadas. Sin bordes ondulados/rasgados ni cinta adhesiva.
- Le gustan círculos con texto que gira, bandas inclinadas móviles y estrellas diminutas discretas que brillan.
- Mantener fase lunar con porcentaje iluminado, halo y recomendación breve según fase. No inventar datos zodiacales: falta aclarar si quiere signo zodiacal o constelación astronómica antes de añadirlos. El cálculo actual de fase es una aproximación por ciclo sinódico.
- Mantener One of a Kind cerca del inicio y Cada pieza tiene nombre de estrella / Compra por estrellas. En esa sección prefiere el mapa y estrellas gráficas del Proto 1.
- Fotos agotadas en gris/desaturadas, efecto de movimiento/desenfoque al pasar cursor en ordenador.
- Mantener fibras, presentación de Eva, newsletter y footer. Textos todavía provisionales, se revisarán después. Los iconos de fibras también siguen provisionales.
- Presentación de Eva: conservar dos estrellas manuales negras arriba a la derecha y movimiento. La foto actual viene de un producto (havanna-yara), NO es una foto confirmada de Eva. Ella enviará la suya.
- Luna al final recolocada en Proto 3 para evitar solaparse con logo.
- Combinar estrellas gráficas y manuales: industrial y artesano deben convivir; conservar los trazos de Eva. Referencias nuevas descritas abajo no están subidas como assets.
- Sin naranja ni azul marino. Sí le gusta el morado/azul del banner superior con letras rosas. Secciones oscuras en negro, rosa y lavanda en el resto. Precios rosas.
- IMPORTANTE: tras rechazar las láminas pidió olvidar el tratamiento global de grano/vintage/texturas y volver a los prototipos. No aplicar filtros vintage, apagado general, ruido o textura de papel. Más tarde pidió explícitamente recuperar SUS marmolados rosa y lila en zonas concretas: eso sí está autorizado y pendiente. No confundir ambas instrucciones.

## Cuatro últimos cambios: estado y siguiente acción

Eva dijo «aplica todos estos cambios al Proto 3». NO afirmar que están todos terminados.

1. PENDIENTE: usar su fotografía de luna llena real en la sección de fase de hoy, oscurecida según fase con halo. Mantener su imagen base; no sustituir por una luna generada ni cualquier foto de internet. Conservar la mini luna animada de intro y trazos decorativos aparte.
2. PENDIENTE: colocar SU marmolado lila en .poster__marble (recuadro detrás de las fotos de Tejidos que crecen bajo la luna...) y en .fibres (Fibras que respiran).
3. PENDIENTE: colocar SU marmolado rosa en .nav (barra clara con el logo Tsenoh!, debajo del banner superior) y en la franja clara bajo .ribbon, antes de Compra por estrellas. Esta segunda zona se señaló con captura, no es la sección negra completa ni el banner morado. Inspeccionar DOM/espaciado para aplicarlo solo a esa franja; el margen de la cinta deja ver el fondo del contenedor.
4. APLICADO: quitar las etiquetas 1/1 de tienda y carrusel de piezas únicas; conservar agotados. Botón + negro sin círculo ni fondo azul, funcional, área táctil 44px y foco de teclado. CSS text-shadow blanco suave para legibilidad sobre foto. No eliminar función de añadir a bolsa.

## Imágenes compartidas en el chat: inventario y limitación

En esta sesión se pudieron VER imágenes pegadas en la conversación, pero no se obtuvieron archivos descargables, IDs ni rutas para incorporarlas al repo. NO se guardaron sus píxeles. Este resumen preserva la intención, no los archivos. Eva debe adjuntar los tres originales en una tarea que permita archivos o subirlos al repo. Antes de prometer que se pueden usar, comprobar herramientas y acceso real.

Las tres prioritarias:
- Luna llena: imagen frontal gris con cráteres, disco casi completo centrado sobre fondo blanco; aproximadamente 680×678 px en la vista del chat.
- Print Marble rosa: vetas fluidas rosa coral claro y blanco, textura de marmolado; aproximadamente 736×999 px.
- Marble lilac: mismo lenguaje de vetas amplias blanco/lavanda suave, aproximadamente 1376×1805 px.

Cuando estén disponibles, guardarlas con nombres claros, por ejemplo assets/eva/moon-full.png, assets/eva/marble-pink.jpg, assets/eva/marble-lilac.jpg. Conservar originales bajo estilos/referencias/ si se crean versiones optimizadas. Evitar modificar assets/marble-*.jpg compartidos de manera que cambie Proto 2.
Los actuales assets/marble-lilac.jpg y assets/marble-pink.jpg fueron GENERADOS por el script antiguo y NO son los originales que Eva pidió. No reutilizarlos pretendiendo que son sus imágenes.

Otras referencias enviadas solo en el chat:
- Paleta antigua: coral RGB 246,152,151; rosa claro 253,211,226; rosa intenso 239,96,163; rosa 242,116,155; rosa suave 247,174,184; frambuesa 233,69,112. Son referencias, no asignaciones definitivas a secciones. Al principio pidió más brillo, después exploró tonos apagados y finalmente descartó ese tratamiento global; partir de Proto 3 aprobado.
- Estrella rosa de muchas puntas sobre naranja (naranja solo referencia, no color autorizado), cartel PRAIA con soles repetidos, estrella negra de ocho puntas largas. Le gusta mezclar formas gráficas con sus estrellas manuales; en lugar de soles, usar estrellas.
- Fable Dust: tipografía con serifa orgánica y tinta irregular; referencia de carácter, NO fuente aprobada. La decisión final es DIN + Bodoni del Proto 1.
- Fotografías vintage cálidas (persona con coco, objetos textiles, collage de danza y ojo blanco dibujado sobre foto): referencias de tratamiento, NO fotografías de Eva ni fotos finales para publicar. La exploración vintage posterior fue descartada.
- Captura de .nav y de la franja bajo .ribbon: identifica áreas del marmolado rosa.

Mensaje que Eva vio al adjuntar: «Los archivos no están disponibles para esta tarea en la nube. Inicia una nueva tarea con un entorno en la nube». No se pudo verificar ni activar ese entorno mediante las herramientas disponibles. El agente explicó inicialmente que estaba en la nube de forma demasiado general, luego aclaró la diferencia entre acceso a GitHub y entorno de archivos. No volver a prometer que abrir Safari soluciona este aviso. Una nueva tarea con archivos puede ser necesaria según la interfaz; comprobar allí. No pedir contraseñas ni tokens.

## Recursos reales ya en el repositorio

- Logo y ovejas: assets/logo-tsenoh.png, assets/ovejas-1200.jpg, assets/ovejas-2400.jpg.
- Pinceladas: assets/brush/moon.png, moon-marker.png, star-big.png, star-small.png, star-tiny.png, star-ink.png, star-ink-small.png. Recortes provisionales de referencias; Eva enviará originales limpios.
- Referencias previas de Luis/Eva: estilos/referencias/ contiene los carteles y dibujos enumerados en estilos/README.md. Consultar esa lista; no confundirla con los adjuntos nuevos sin archivo.
- Fuentes locales: fonts/ y su licencia OFL.txt.
- Productos/fotos y precios: data.js. Checkout va al Shopify real. Envío gratis desde 150 € sigue siendo provisional a confirmar. Newsletter y avisos de reposición actualmente simulan confirmación, NO hay integración de envío real.
- Texto de footer antiguo decía stock live: data.js es snapshot generado, no consulta en tiempo real. No afirmar que stock esté siempre actualizado.

## Validación y forma de continuar

Esta sesión tuvo herramientas GitHub para lectura y escritura, pero no shell, archivos adjuntos descargables ni navegador. Se verificó sintaxis JS, rutas e IDs, traducciones e inicialización con DOM simulado en español/inglés. Catálogo: 30 productos, 10 agotados en snapshot; botones añadir y etiquetas agotado conservados. NO se hizo prueba visual de navegador.
En un entorno completo, ejecutar/verificar la página en móvil y escritorio, intro y reduced-motion, filtros, ficha de producto, añadir/quitar bolsa, círculos de texto y lectura sobre mármoles. No dar por probado lo que no se haya comprobado.
Leer main de nuevo antes de editar. Aplicar las imágenes autorizadas cuando sus archivos sean accesibles, actualizar este resumen y LOG, hacer commit/push sin fuerza y verificar publicación. Entregar siempre https://lluissuros.github.io/tsenoh-prototype/v3/ a Eva.
