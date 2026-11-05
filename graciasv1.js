document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el formulario por su atributo action
  const contactForm = document.querySelector('form[action="https://formspree.io/f/xppprejk"]');

  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Evita la recarga nativa de la página

      const form = event.target;
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');

      // Bloquea el botón para evitar múltiples envíos accidentales
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
      }

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert("¡Gracias por tu mensaje! Tu solicitud ha sido enviada correctamente.");
          form.reset(); // Resetea todos los inputs, textarea y checkboxes del formulario
        } else {
          alert("Ocurrió un problema al enviar la solicitud. Por favor, intenta de nuevo.");
        }
      } catch (error) {
        alert("Error de conexión. Verifica tu red e intenta nuevamente.");
      } finally {
        // Restablece el estado del botón
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Solicitar Contacto";
        }
      }
    });
  }
});