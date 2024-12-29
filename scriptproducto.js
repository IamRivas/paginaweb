
const GITHUB_OWNER = "IamRivas"; // Sustituir por tu usuario de GitHub
const GITHUB_REPO = "fjaphlshgownj"; // Sustituir por tu repositorio
const BRANCH = "main"; // Sustituir si usas otra rama


async function uploadFileToGitHub(file) {
  const reader = new FileReader();

  reader.onload = async function (event) {
    const fileContent = btoa(event.target.result); // Convierte el archivo a Base64
    const filePath = `archivos/${Date.now()}_${file.name}`; // Crea un nombre único

    try {
      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Subiendo archivo ${file.name}`,
          content: fileContent,
          branch: BRANCH,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Archivo subido correctamente: ${result.content.html_url}`);
        console.log(result);
      } else {
        const error = await response.json();
        alert(`Error al subir archivo: ${error.message}`);
      }
    } catch (err) {
      console.error('Error al subir archivo:', err);
    }
  };

  reader.readAsBinaryString(file);
}

// Evento para manejar la subida
document.getElementById('file-input').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) uploadFileToGitHub(file);
});
