document.getElementById("videoForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const fileInput = document.getElementById("fileInput");
      const linkInput = document.getElementById("linkInput");
      const status = document.getElementById("status");

      const formData = new FormData();

      if (fileInput.files.length > 0) {
        formData.append("file", fileInput.files[0]);
      }

      const link = linkInput.value.trim();
      if (link !== "") {
        formData.append("link", link);
      }

      if (formData.has("file") || formData.has("link")) {
        status.textContent = "Subiendo...";
        try {
          const response = await fetch("URL_DEL_GOOGLE_APPS_SCRIPT", {
            method: "POST",
            body: formData
          });

          const result = await response.text();
          status.textContent = result || "Subida completada.";
        } catch (error) {
          console.error(error);
          status.textContent = "Error al enviar el video.";
        }
      } else {
        status.textContent = "Por favor, subí un archivo o pegá un link.";
      }
    });