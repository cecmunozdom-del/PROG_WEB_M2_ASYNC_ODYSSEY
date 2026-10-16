# Taylor Search

Misión M2 · Async Odyssey — Web Development I.

## Cómo probarlo
Abre el proyecto en tu navegador y usa el buscador para encontrar la canción (o canciones) de Taylor Swift que coincidan con tu búsqueda. Si no estás familiarizado con su discografía, prueba a escibir palabras genéricas en inglés, como 'Love', 'You', 'My'. La web devolverá todas las canciones cuyo título contenga lo que haya escrito el usuario.

Posibles funcionalidades a futuro:
-> Escribir título de un albúm y que devuelve todas las canciones que contiene.
-> Escribir parte de una letra y que devuelva la canción que corresponde.


## Uso de IA
Al inicio del proyecto, he usado la IA de Gemini para entender mejor tanto la estructura del proyecto como algunos conceptos que no había comprendido del todo del tema 2 (le pedí definiciones y ejemplos de async y await, de export, etc).

A la hora de elegir la API, en lugar de una exclusiva con datos sobre la discografía de Taylor Swift (las que encontré o funcionaban mal o tenían muy pocos datos), Gemini me recomendó utilizar la API de AppleMusic para sacar todos los datos que yo quería (título de la canción, álbum al que pertenece, duración). Debido a esto le pregunté si no podía usar la de Spotify (ya que es lo que yo utilizo para escuchar música y estoy más familiarizada con ello), pero resulta que para usarla se requiere identificación y uso de tokens, dificultando bastante el proceso. Por eso finalmente usé la de Apple, es muchísimo más fácil de usar (se guarda el link en una constante y ya).

También utilicé Gemini para arreglar y decorar la web, ayudándome con cosas más complejas de css que no hubiera sabido hacer o no se me hubieran ocurrido a mí sola. A la hora de realizar el archivo render.js, también me sirvió de ayuda, ya que al pedirle un ejemplo de cómo se haría, vi que usaba innerHTML. Al preguntarle, me explicó que a pesar de que innerHTML da lugar a inyecciones de código y ataque XSS ya que parsea el input directamente a HTML, la alternativa no era mejor. Se podía hacer de otra forma, creando elementos directamente con document.createElement e ir añadiéndoles clases e ids, pero claro, habría que hacer para cada álbum, título, o audio necesitaría muchas líneas de código solo para crear y unir los elementos, por lo que no era rentable.

Para el main.js me dió algunas instrucciones, correcciones, e ideas muy buenas. Sobre todo lo utilicé para que me recordara el orden y el flujo que debía seguir (primero pedir las canciones, luego limpiar esos datos, y luego mostrar las tarjetas con las canciones).





## Autopsia
1. 


2. 
