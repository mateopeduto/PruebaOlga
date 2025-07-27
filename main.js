document.getElementById("videoForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const linkInput = document.getElementById("linkInput");
  const status = document.getElementById("status");

  const link = linkInput.value.trim();

  if (fileInput.files.length === 0 && link === "") {
    status.textContent = "Por favor, subí un archivo o pegá un link.";
    return;
  }

  status.textContent = "Subiendo...";

  try {
    const reader = new FileReader();

    reader.onloadend = async function () {
      const fileContent = reader.result.split(',')[1]; // base64 sin encabezado
      const payload = {
        filename: fileInput.files[0]?.name || "",
        mimeType: fileInput.files[0]?.type || "",
        filedata: fileContent || "",
        link: link
      };

      const response = await fetch("https://script.google.com/macros/s/AKfycbw6OHheroH0Wc8GVol3YKQuugZbVghYsQJe9kauDebSsk8RcJWE-EQQnX9yJr2PgMdkng/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.text();
      status.textContent = result;
    };

    if (fileInput.files.length > 0) {
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      // Si no hay archivo, enviamos solo el link
      const response = await fetch("https://script.google.com/macros/s/AKfycbw6OHheroH0Wc8GVol3YKQuugZbVghYsQJe9kauDebSsk8RcJWE-EQQnX9yJr2PgMdkng/exec", {
        method: "POST",
        body: JSON.stringify({ link }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.text();
      status.textContent = result;
    }
  } catch (error) {
    console.error(error);
    status.textContent = "Error al enviar el video.";
  }
});
