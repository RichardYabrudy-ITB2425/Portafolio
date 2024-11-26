document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el elemento 'hamburger-icon' existe antes de agregar el event listener
    const menuHamburguesa = document.getElementById('hamburger-icon');
    const menu = document.getElementById('menu');  // Cambié esto de .menu a #menu (ID)
    const contactButton = document.getElementById("contact-form-button");
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".close-btn");

    // Función para abrir el menú
    if (menuHamburguesa && menu) {
        menuHamburguesa.addEventListener('click', () => {
            menu.classList.toggle('show'); // Mostrar u ocultar el menú
        });
    } else {
        console.warn("El elemento 'hamburger-icon' o 'menu' no se encontró.");
    }

    // Funcionalidad del modal
    if (contactButton && modal) {
        contactButton.addEventListener("click", () => {
            modal.classList.add("show");
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.remove("show");
            }
        });
    }

    // Función de validación para el formulario
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const validationBox = document.querySelector(".validation-box");

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const updateValidationBox = () => {
        const errors = [];

        if (nameInput.value.trim() === "") {
            errors.push("✘ Debe ponerse un nombre");
        }
        if (!validateEmail(emailInput.value)) {
            errors.push("✘ El correo debe ser válido");
        }
        if (messageInput.value.trim() === "") {
            errors.push("✘ Debe contener un mensaje");
        }

        if (errors.length > 0 && validationBox) {
            validationBox.style.display = "block";
            validationBox.innerHTML = `<ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
        } else if (validationBox) {
            validationBox.style.display = "none";
        }
    };

    const validateForm = () => {
        let isValid = true;
        clearErrors(); // Limpiar errores anteriores

        if (nameInput.value.trim() === "") {
            isValid = false;
            showError(nameInput, "Este campo es obligatorio.");
        }
        if (!validateEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, "Por favor ingresa un correo electrónico válido.");
        }
        if (messageInput.value.trim() === "") {
            isValid = false;
            showError(messageInput, "Este campo es obligatorio.");
        }

        updateValidationBox();
        return isValid;
    };

    const showError = (input, message) => {
        let errorElement = document.getElementById(`${input.id}-error`);
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.id = `${input.id}-error`;
            errorElement.classList.add("error-message");
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.display = "block";
    };

    const clearErrors = () => {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.style.display = "none";
        });
    };

    // Cerrar el modal al hacer clic en el botón "Cancelar"
    const cancelBtn = document.querySelector(".cancel-btn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            modal.classList.remove("show");
            form.reset();
            clearErrors();
            updateValidationBox();
        });
    }

    // Validación en tiempo real
    [nameInput, emailInput, messageInput].forEach((input) => {
        input.addEventListener("input", () => {
            clearErrors();
            updateValidationBox();
        });
    });

    // Enviar el formulario
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (validateForm()) {
                alert("Formulario enviado correctamente");
                modal.classList.remove("show");
                form.reset();
                updateValidationBox();
            } else {
                alert("Por favor corrige los errores en el formulario.");
            }
        });
    }

    // Inicializar validación
    updateValidationBox();

    // Cerrar el menú cuando se haga clic en un enlace dentro del menú
    const enlacesMenu = document.querySelectorAll('.menu a');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            menu.classList.remove('show'); // Cerrar el menú al hacer clic en un enlace
        });
    });

    // Manejo de la pantalla de carga
    const loadingScreen = document.getElementById("loading-screen");
    const proyectosLinks = document.querySelectorAll('a[href="lp.html"]'); // Seleccionamos todos los enlaces que llevan a "lp.html"

    // Verificar si los elementos están presentes
    if (loadingScreen && proyectosLinks.length > 0) {
        console.log("Elementos 'loading-screen' y enlaces a proyectos encontrados.");

        proyectosLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // Prevenir redirección inmediata
                console.log("Clic activado. Mostrando la pantalla de carga...");
                loadingScreen.style.display = "flex"; // Mostrar la pantalla de carga
                document.body.style.overflow = "hidden"; // Evitar desplazamiento
                document.body.style.position = "fixed"; // Fijar la posición de la página

                setTimeout(() => {
                    console.log("Redirigiendo a:", link.href);
                    window.location.href = link.href; // Redirigir después de 3 segundos
                }, 3000); // 3 segundos para ver el gif

                // Restaurar la página después de la redirección
                window.addEventListener('beforeunload', () => {
                    document.body.style.overflow = "auto"; // Restaurar el desplazamiento
                    document.body.style.position = "relative"; // Restaurar la posición
                });
            });
        });
    } else {
        console.error("El elemento 'loading-screen' o enlaces a proyectos no se encontraron en el DOM.", {
            loadingScreen,
            proyectosLinks
        });
    }
});
