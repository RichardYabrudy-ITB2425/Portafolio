document.addEventListener("DOMContentLoaded", function() {
    let countdown = 5;  // Empezamos con 5 segundos
    const countdownElement = document.getElementById('countdown'); // Elemento del número de la cuenta regresiva
    const redirectButton = document.getElementById('redirect-button'); // Botón de redirección

    // Función para actualizar la cuenta regresiva
    const updateCountdown = () => {
        countdown--;
        if (countdown > 0) {
            countdownElement.textContent = countdown;
        } else {
            // Si llega a 0, redirigimos
            window.location.href = 'lp.html'; // La URL de destino
        }
    };

    // Establecemos la cuenta regresiva
    const interval = setInterval(updateCountdown, 1000); // Actualizamos cada 1 segundo

    // Cambiar el texto del botón cuando se termine la cuenta regresiva
    setTimeout(() => {
        redirectButton.textContent = "Haz clic aquí si no has sido redirigido"; // Cambio de texto después de la cuenta regresiva
        redirectButton.onclick = function() {
            window.location.href = 'lp.html'; // Redirigir al hacer clic
        };
    }, 5000); // Después de 5 segundos, cambiamos el texto del botón
});
