
---

Para crear el proyecto de React: npm  create vite@latest nombre 
-->react
-->javascript
-->no experimental
-->si

para entrar en la carpeta que toca: cd nombre
para volver a la anterior: cd..
para correr el proyecto: npm run dev
para cerrarlo: ctrl+c
para instalar las últimas versiones : npm instal react@latest

---

- Para usar CSS Modules escribimos: .module.css en vez de solo css y cambiamos la llamada desde los .jsx
se les llama con: import styles from "./Card.module.css"; en las primeras lineas del componente desde donde lo llamemos.

---
dentro de src - components - 

cada componente .jsx con su estilo en .module.css

se crea en atómico: elementos pequeños ( botones, cards...) , grid si se necesita, App ( fuera de components, este es el lienzo), main.jsx y index.html
Estructura

- index.html
- package.json: dependencias, esta la creamos al final para comprimir.
- public/: imágenes.
- src/:
  - main.jsx: monta React en el DOM (ReactDOM.createRoot).
  - App.jsx: componente raíz; importa Header, Grid, Footer
  - index.css: estilo index
  - App.css: estilo app.
  - assets/: logos y svg.
  - components/
    - Button.jsx (+ Button.module.css)
    - Header.jsx (+ Header.module.css): logotipo y menú.
    - Footer.jsx (+ Footer.module.css).
    - Grid.jsx (+ Grid.module.css): controla vista grid/list y .map de items.
    - Card/: carpeta con el componentes de tarjeta:
      - Card.jsx (+ Card.module.css)
      - CardGallery.jsx (+ CardGallery.module.css): galeria de imágenes con flechas y puntos.
      - CardInfo.jsx` (+ CardInfo.module.css): título, descripción y precio.
      - CardActions.jsx (+ CardActions.module.css): favorito, contador y botón reservar.

- data/
    -items.js: array de objetos con los productos. Aquí ponemos los datos de cada card ( id, nombre, precio , etc).

---

src/
    data/
        items.js

Array de objetos. Cada producto incluye al menos: id, nombre, precio, images (array de imágenes), descripcion.

---

Se usa .map() en el Grid.jsx que ponga tantas cards como items haya

        {items.map((space) => (
          <Card key={space.id} space={space} viewMode={viewMode} />
        ))}

---