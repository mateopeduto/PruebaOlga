document.getElementById("videoForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const linkInput = document.getElementById("linkInput");
  const status = document.getElementById("status");

  const link = linkInput.value.trim();
  status.textContent = "Subiendo...";

  try {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onloadend = async function () {
        const base64Data = reader.result.split(',')[1]; // Removemos encabezado data:...

        const payload = {
          filename: file.name,
          mimeType: file.type,
          filedata: base64Data,
          link: link
        };

        const response = await fetch("https://script.google.com/macros/s/AKfycbyytYhyFxe6em4DUjlOkxF-5gVe9Nkub4WAfVSPHgRKEA--RW_V1D9T3h3d8M_uZiHKMw/exec", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await response.text();
        status.textContent = result;
      };

      reader.readAsDataURL(file);
    } else if (link !== "") {
      const payload = { link };
      const response = await fetch("https://script.google.com/macros/s/AKfycbyytYhyFxe6em4DUjlOkxF-5gVe9Nkub4WAfVSPHgRKEA--RW_V1D9T3h3d8M_uZiHKMw/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.text();
      status.textContent = result;
    } else {
      status.textContent = "Por favor, subí un archivo o pegá un link.";
    }
  } catch (error) {
    console.error(error);
    status.textContent = "❌ Error al enviar el video.";
  }
});
