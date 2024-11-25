document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const contactButton = document.querySelector(".contact-button");
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".close-btn");
    const validationBox = document.querySelector(".validation-box");
    const errorMessages = form.querySelectorAll(".error-message");

    // Función para validar el formato del correo
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Función para actualizar la caja de validación
    function updateValidationBox() {
        validationBox.style.display = "none"; // Inicialmente oculta la caja
        
        // Solo muestra la caja si hay errores
        const hasErrors = nameInput.value.trim() === "" || !validateEmail(emailInput.value) || messageInput.value.trim() === "";
        
        if (hasErrors) {
            validationBox.style.display = "block"; // Mostrar la caja de validación si hay errores
            
            validationBox.innerHTML = `
                <ul>
                    <li data-rule="name"><span class="icon">✘</span> Debe ponerse un nombre</li>
                    <li data-rule="email"><span class="icon">✘</span> El correo debe ser válido</li>
                    <li data-rule="message"><span class="icon">✘</span> Debe contener un mensaje</li>
                </ul>
            `;
        }
    
        const rules = [
            {
                field: nameInput,
                isValid: nameInput.value.trim() !== "",
                rule: "name",
                successMsg: "Nombre válido.",
            },
            {
                field: emailInput,
                isValid: validateEmail(emailInput.value),
                rule: "email",
                successMsg: "Correo válido.",
            },
            {
                field: messageInput,
                isValid: messageInput.value.trim() !== "",
                rule: "message",
                successMsg: "Mensaje válido.",
            },
        ];
    
        rules.forEach(({ field, isValid, rule, successMsg }) => {
            const listItem = validationBox.querySelector(`[data-rule="${rule}"]`);
            const icon = listItem.querySelector(".icon");

            if (isValid) {
                icon.textContent = "✔";
                icon.style.color = "green"; // Color verde para validez
                listItem.style.color = "green"; // Color verde en el texto
                listItem.textContent = successMsg;
            } else {
                icon.textContent = "✘";
                icon.style.color = "red"; // Color rojo para error
                listItem.style.color = "red"; // Color rojo en el texto
                listItem.textContent = `✘ ${listItem.textContent}`; // Añadir el icono al inicio
            }
        });
    }

    // Mostrar error debajo de un campo
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = "block";
        input.classList.add("error");
    }

    // Validación del formulario
    function validateForm() {
        let isValid = true;

        // Resetear errores visuales
        errorMessages.forEach((error) => {
            error.style.display = "none";
        });

        // Validación de nombre
        if (nameInput.value.trim() === "") {
            isValid = false;
            showError(nameInput, "Este campo es obligatorio.");
        }

        // Validación de correo
        if (!validateEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, "Por favor ingresa un correo electrónico válido.");
        }

        // Validación de mensaje
        if (messageInput.value.trim() === "") {
            isValid = false;
            showError(messageInput, "Este campo es obligatorio.");
        }

        // Actualizar caja de validación
        updateValidationBox();

        return isValid;
    }

    // Función para abrir el modal
    contactButton.addEventListener("click", function () {
        modal.classList.add("show");
    });

    // Función para cerrar el modal
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Cerrar el modal si se hace clic fuera de la caja de formulario
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Enviar el formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        if (validateForm()) {
            alert("Formulario enviado correctamente");
            modal.classList.remove("show");
            form.reset(); // Limpiar los campos del formulario
            updateValidationBox(); // Reiniciar caja de validación
        } else {
            alert("Por favor corrige los errores en el formulario.");
        }
    });

    // Eventos para validar dinámicamente
    [nameInput, emailInput, messageInput].forEach((input) => {
        input.addEventListener("input", updateValidationBox);
    });

    // Inicializar validación
    updateValidationBox();
});
