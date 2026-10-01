# Registro de estilo

Lo más reciente va arriba. Cada entrada dice qué se decidió, por qué y qué queda pendiente.
Al empezar una sesión nueva sobre la web, lee este archivo y `README.md` primero.

---

## 2026-10-01 — Cierre de sesión y relevo

- Eva pide guardar toda la información para continuar mañana sobre Proto 3. Se crea estilos/CONTINUAR-PROTO3.md con versiones/enlaces, decisiones vigentes, assets existentes, descripción de adjuntos no disponibles, cambios aplicados, tres cambios pendientes y validación realizada.
- Se actualizan AGENTS.md y README para que el siguiente agente lea el relevo primero.
- Corrección respecto al mensaje anterior: Eva vio un aviso de la interfaz que pedía nueva tarea con entorno de archivos. No está confirmado que pueda adjuntar en esta conversación; disponer del conector GitHub no garantiza acceso a adjuntos. El siguiente agente debe comprobar las capacidades del nuevo entorno.
- Las imágenes pegadas NO se han archivado como ficheros: solo se conserva su descripción y uso autorizado. No afirmar que están guardadas.
- Proto 1 y Proto 2 se conservan. Proto 3 es la base aprobada y recibe todos los cambios futuros.
- Este commit solo documenta; no modifica la web.

---

## 2026-10-01 — Proto 3: simplificar etiquetas de tienda

- Eva autoriza aplicar sus cuatro cambios: luna fotográfica, mármol lila en cartel y fibras, mármol rosa en cabecera/franja clara bajo cinta inclinada, y eliminar etiquetas 1/1 y círculos de añadir.
- Aplicado: se retiran los indicadores 1/1 de tienda y carrusel de piezas únicas. Se conservan los estados de agotado. El botón + sigue funcionando, negro y sin círculo de fondo, con área táctil de 44px y foco de teclado.
- Bloqueados los cambios de imágenes: las imágenes pegadas en el chat se ven, pero no hay archivos/IDs descargables accesibles con las herramientas de esta sesión. El repositorio solo contiene mármoles provisionales generados. Se solicitan los tres originales como archivos o ZIP; no se sustituyen por imágenes distintas.
- Se permanece en esta conversación; no hace falta iniciar otra tarea.
- Validación: sintaxis JS y renderizado de catálogo en ES/EN; sin navegador visual disponible.

---

## 2026-10-01 — Proto 3: fusión solicitada por Eva

- Eva descarta las láminas generadas y la exploración de grano, filtros vintage y texturas. Se vuelve al código y los recursos reales de Proto 1 y Proto 2.
- Nueva versión independiente en /v3/; / conserva Proto 2 y /v1/ permanece intacta.
- Logo original, portada de ovejas, pinceladas flotantes e intro rosa del Proto 2. La estrella de intro se sustituye por una luna pequeña que se llena.
- DIN para textos y controles; Bodoni Moda del Proto 1 para títulos principales. Sin Permanent Marker.
- Marcos alternos de arco y rectángulo redondeado, estrellas gráficas del mapa del Proto 1, fotos agotadas en gris y desenfoque al pasar el cursor en ordenador.
- Piezas únicas inmediatamente después de la fase lunar. Se conservan recomendación lunar, bandas móviles, círculo de texto, fibras, newsletter y estrellas negras junto a la foto existente.
- Sin naranja ni azul marino. Negro, rosa y lavanda; controles y precios en rosa. Sin mármol generado mientras Eva revisa la fusión.
- Solo fotos existentes, sin fotos inventadas. Luna final recolocada.
- Pendiente: originales utilizables de luna real y mármoles compartidos en el chat, foto de Eva e iconos de fibras definitivos; aclarar signo zodiacal/constelación antes de añadir ese dato.
- Luis autorizó commits directos a main sin PR; escritura confirmada.
- Validación: sintaxis JS, recursos relativos, IDs, traducciones e inicialización simulada en ES/EN con catálogo completo. No hay navegador de pruebas disponible.

---

## 2026-10-01 — Acceso de Eva al repo

- Lluis invitó a Eva (`evavianamoreno`) como colaboradora con permiso `write`. La invitación caduca el 2026-10-08.
- `main` no tiene protecciones. Un push o una PR fusionada en `main` publica la web en GitHub Pages en 1–2 minutos.
- Eva quiere hacer cambios desde el móvil con un agente (Codex u otro). Codex en la nube suele abrir una PR; Eva la fusiona desde la app de GitHub.
- Pendiente: comprobar que el conector de GitHub de Codex ve este repo (el repo es de Lluis, no de Eva).

---

## 2026-10-01 — v2: primera versión con el estilo de Eva

Sesión con Lluis y Eva (la propietaria de la marca). Eva explicó su estilo a partir de las imágenes de `referencias/`.

### Lo que dijo Eva

- **Logo:** el "Tsenoh!" escrito a mano por ella. Se mantiene siempre.
- **Tipografía habitual:** DIN.
- **Combinación con escritura a mano:** brochazos o rotulador encima de las imágenes, como la luna y las estrellas. Esos trazos se pueden usar tal cual; casi funcionan como logo.
- **Cartel favorito:** *Celebrate Autumn! Pop-Up Store*. "Casi podrías partir de este cartel para configurar estilísticamente la web."
- **Fondo marmoleado:** le encanta. Tiene el original; mientras tanto se puede generar uno parecido.
- **Collage:** le fascina y lo usa mucho. Le gustaría que la web funcionara como un collage.
- **Recursos:** estrellas pequeñas gráficas (las finas, de muchas puntas) y recursos hechos a mano.
- **Lo que no quiere:** la v1 es demasiado comercial; casi todas las fotos son de ropa. Eva tiene fotos más artísticas y ambientales que pasará más adelante.
- **Banner:** la foto de las ovejas de tsenoh.com, al principio de la web, a pantalla completa.

### Lo que se hizo en la v2

- La v2 está en la raíz (`/`). La v1 original está congelada en `/v1/`. Cada versión enlaza a la otra desde la etiqueta de abajo a la izquierda.
- **Logo:** `assets/logo-tsenoh.png` (del repo `tsenoh-headless`). Se usa como máscara CSS, así toma cualquier color: blanco sobre las ovejas, negro en el menú, rosa en el pie.
- **DIN:** D-DIN de Datto (licencia SIL OFL, libre). Está en `fonts/`. Si Eva tiene una licencia de DIN Pro o DIN 2014, se cambia en el `@font-face` de `styles.css`.
- **Escritura a mano:** "Permanent Marker" (Google Fonts) para notas cortas y la firma. Es una aproximación; lo ideal es usar la letra de Eva escaneada.
- **Trazos a pincel:** recortados de `pinceladas-blancas-sobre-negro.jpg`, `estrellas-negras-bufandas.jpg` y `rotulador-harvest-moon.jpg` con `tools/build-assets.py`. Están en `assets/brush/`.
- **Mármol:** generado por código (`marble-lilac.jpg`, `marble-pink.jpg`) a partir de los colores del cartel. Cuando llegue el escaneo de Eva, sustituye estos archivos.
- **Estrella gráfica:** la estrella fina de 8 puntas del cartel, dibujada en SVG (`#spark` en `index.html`).
- **Collage:** papel rasgado en los recortes (borde generado en `app.js`, función `torn`), piezas un poco giradas, cinta adhesiva en las piezas únicas, sombras suaves.
- **Sección "cartel":** reproduce la composición del cartel de otoño: título DIN naranja que pisa el mármol lila, círculo con texto alrededor (la fase lunar real de esta noche), recortes de fotos encima, estrellas blancas y una nota a mano.
- **Paleta** (en `:root` de `styles.css`):
  - rosa papel `#fbd0d7`
  - naranja `#f26b3a`
  - azul eléctrico `#3a2bd8`
  - lila `#b3a2f1`
  - magenta `#ec1a92`
  - noche `#1e2547` (sale del cielo de la foto de las ovejas)
  - crema `#fbf6f0`

### Pendiente

- [ ] Eva pasa el mármol original escaneado.
- [ ] Eva pasa los trazos a mano originales en PNG (los de ahora salen de capturas de Instagram).
- [ ] Eva pasa fotos ambientales y artísticas para sustituir las fotos de producto del collage y de "Hola, soy Eva".
- [ ] Decidir si la escritura a mano de los títulos usa la letra de Eva escaneada en lugar de Permanent Marker.
- [ ] Confirmar la DIN: ¿D-DIN libre o una licencia de DIN comercial?
- [ ] Revisar qué secciones de la v1 sobran o cambian ahora que la web es menos comercial.
