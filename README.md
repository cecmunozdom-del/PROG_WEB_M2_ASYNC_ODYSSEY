# Taylor Search

Misión M2 · Async Odyssey — Web Development I.

## Cómo probarlo
Lanza la app y usa el buscador para encontrar la canción (o canciones) de Taylor Swift que coincidan con tu búsqueda. Si no estás familiarizado con su discografía, prueba a escibir palabras genéricas en inglés, como 'Love', 'You', 'My'. La web devolverá todas las canciones cuyo título contenga lo que haya escrito el usuario. Además, si se busca el título de un álbum, devolverá todas las canciones posibles de éste.

## Uso de IA
Al inicio del proyecto, he usado la IA de Gemini para entender mejor tanto la estructura del proyecto como algunos conceptos que no había comprendido del todo del tema 2 (le pedí definiciones y ejemplos de async y await, de export, etc).

A la hora de elegir la API, en lugar de una exclusiva con datos sobre la discografía de Taylor Swift (las que encontré o funcionaban mal o tenían muy pocos datos), Gemini me recomendó utilizar la API de AppleMusic para sacar todos los datos que yo quería (título de la canción, álbum al que pertenece, duración). Debido a esto le pregunté si no podía usar la de Spotify (ya que es lo que yo utilizo para escuchar música y estoy más familiarizada con ello), pero resulta que para usarla se requiere identificación y uso de tokens, dificultando bastante el proceso. Por eso finalmente usé la de Apple, es muchísimo más fácil de usar (se guarda el link en una constante y ya).

También utilicé Gemini para arreglar y decorar la web, ayudándome con cosas más complejas de css que no hubiera sabido hacer o no se me hubieran ocurrido a mí sola. A la hora de realizar el archivo render.js, también me sirvió de ayuda, ya que al pedirle un ejemplo de cómo se haría, vi que usaba innerHTML. Al preguntarle, me explicó que a pesar de que innerHTML da lugar a inyecciones de código y ataque XSS ya que parsea el input directamente a HTML, la alternativa no era mejor. Se podía hacer de otra forma, creando elementos directamente con document.createElement e ir añadiéndoles clases e ids, pero claro, habría que hacer para cada álbum, título, o audio necesitaría muchas líneas de código solo para crear y unir los elementos, por lo que no era rentable.

Para el main.js me dió algunas instrucciones, correcciones, e ideas muy buenas. Sobre todo lo utilicé para que me recordara el orden y el flujo que debía seguir (primero pedir las canciones, luego limpiar esos datos, y luego mostrar las tarjetas con las canciones).

También me ayudó a la hora de hacer el bonus, ya que a pesar de que había investigado cómo funcionaba localStorage para el proyecto anterior, no sabía muy bien cómo hacer el proceso de guardar datos para este.

Hacia la parte final del trabajo, Gemini también me ayudó a corregir los errores que me fui encontrando cuando comencé a probar la app completa por primera vez. Por ejemplo, al aplicar las correcciones que me dió webiArena, me ayudó a entender porqué es mejor usar localStorage.removeItem() que localStorage.clear(), ya que la segunda borra toda la memoria del navegador, no solo la de esta app en concreto con las canciones. Otro ejemplo, webiArena me había bajado bastantes puntos por robustez, así que Gemini me recomendó poner más controles para los datos en varios de los scripts, intentando mejorar mi app en ese aspecto. También me ayudó a gestionar el flujo de el main.js, ya que estaba empeñada en poner los eventos fuera de iniciarApp(), y me dijo cómo podía hacer la función para evitar inyecciones XSS debido a los innerHTML del programa.

Algunos ejemplos de prompts:
"Antes de empezar, dime cómo suele ser la estructura de este tipo de proyectos, y explícame los conceptos básicos sobre async y wait".
"¿Qué diferencia hay entre json y JSON?" (json en minúsculas es un método propio de la respuesta que se devuelve al usar fetch, y JSON hace referencia al propio objeto con sus respectivos métodos).
"Me ha salido este error: ⚠️¡Ups! Algo salió mal: Assignment to constant variable, y no encuentro de dónde proviene" (Era porque había declarado un array como const que sufría más tarde una reasignación).

## Autopsia
1. La primera decisión difícil que tuve que tomar fue qué API utilizar, ya que como he explicado previamente, las APIs hechas por usuarios sobre Taylor Swift no funcionaban bien, o daban muy pocos datos útiles. Fue Gemini quien me dió la idea de hacerlo con la API de AppleMusic, modificando ligeramente el enlace para obtener sólo las canciones de Taylor Swift. También fue el que me corregió cuando quise utilizar la de Spotify, la cual requiere uso de tokens y verificaciones complejas.

2. La segunda decisión difícil fue cómo tratar con los datos brutos que devolvía la API de iTunes, sobre todo pensando en cómo mostrarlos. En concreto me refiero a cómo mostrar la duración de las canciones, ya que se podía hacer de varias maneras, pero la más corta y correcta requería varias transformaciones en muy pocos pasos. Para esto me ayudé de Gemini que me descubrió la función padStart, la cual fue sumamente útil, ya que mi primer instinto para evitar que los segundos menores que diez se vieran con un solo dígito era utilizar ifs básicos, lo cual hubiera generado un código muy largo y básico.
