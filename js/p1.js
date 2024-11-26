// Imágenes y descripciones
const imagenes = [
    { src: 'https://via.placeholder.com/300', descripcion: 'Descripción del Proyecto 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { src: 'https://via.placeholder.com/200', descripcion: 'Descripción del Proyecto 2: Sed cursus ante dapibus diam, ut gravida felis tincidunt.' },
    { src: 'https://via.placeholder.com/100', descripcion: 'Descripción del Proyecto 3: Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' }
];

let indiceActual = 0;  // Índice de la imagen actual

// Función para cambiar la imagen y el texto
function cambiarImagen(direccion) {
    indiceActual += direccion;

    // Si se sale del rango, volvemos al inicio o al final
    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    } else if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }

    // Actualizar la imagen
    document.getElementById('imagen-proyecto').src = imagenes[indiceActual].src;

    // Actualizar la descripción del proyecto
    document.getElementById('descripcion-texto').innerText = imagenes[indiceActual].descripcion;
}