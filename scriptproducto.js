document.getElementById('file-input').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const errorMessage = document.getElementById('error-message');
  const dataTable = document.getElementById('data-table');
  const deleteButton = document.getElementById('delete-button');

  // Limpiar mensajes y tabla
  errorMessage.style.display = 'none';
  dataTable.style.display = 'none';
  deleteButton.style.display = 'none';
  dataTable.innerHTML = '';

  if (!file) return;

  // Verificar tipo de archivo
  const validExtensions = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  if (!validExtensions.includes(file.type)) {
      errorMessage.style.display = 'block';
      return;
  }

  // Leer el archivo Excel
  const reader = new FileReader();
  reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Tomar la primera hoja
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convertir a JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Mostrar datos en la tabla
      if (jsonData.length > 0) {
          const tableHeader = document.createElement('thead');
          const tableBody = document.createElement('tbody');

          jsonData.forEach((row, index) => {
              const tableRow = document.createElement('tr');
              row.forEach(cell => {
                  const cellElement = document.createElement(index === 0 ? 'th' : 'td');
                  cellElement.textContent = cell;
                  tableRow.appendChild(cellElement);
              });
              if (index === 0) {
                  tableHeader.appendChild(tableRow);
              } else {
                  tableBody.appendChild(tableRow);
              }
          });

          dataTable.appendChild(tableHeader);
          dataTable.appendChild(tableBody);
          dataTable.style.display = 'table';
          deleteButton.style.display = 'block';
      }
  };
  reader.readAsArrayBuffer(file);
});

// Botón de eliminar
document.getElementById('delete-button').addEventListener('click', function () {
  const dataTable = document.getElementById('data-table');
  const deleteButton = document.getElementById('delete-button');

  dataTable.style.display = 'none';
  deleteButton.style.display = 'none';
  dataTable.innerHTML = '';
  document.getElementById('file-input').value = '';
});

document.getElementById('file-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const errorMessage = document.getElementById('error-message');
    const dataTable = document.getElementById('data-table');
    const deleteButton = document.getElementById('delete-button');

    // Limpiar mensajes y tabla
    errorMessage.style.display = 'none';
    dataTable.style.display = 'none';
    deleteButton.style.display = 'none';
    dataTable.innerHTML = '';

    if (!file) return;

    // Verificar tipo de archivo
    const validExtensions = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validExtensions.includes(file.type)) {
        errorMessage.style.display = 'block';
        return;
    }

    // Leer el archivo Excel
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
            localStorage.setItem('uploadedData', JSON.stringify(jsonData));
            renderTable(jsonData);
        }
    };
    reader.readAsArrayBuffer(file);
});

// Función para renderizar la tabla
function renderTable(data) {
    const dataTable = document.getElementById('data-table');
    const deleteButton = document.getElementById('delete-button');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    data.forEach((row, index) => {
        const tableRow = document.createElement('tr');
        row.forEach(cell => {
            const cellElement = document.createElement(index === 0 ? 'th' : 'td');
            cellElement.textContent = cell;
            tableRow.appendChild(cellElement);
        });
        if (index === 0) {
            tableHeader.appendChild(tableRow);
        } else {
            tableBody.appendChild(tableRow);
        }
    });

    dataTable.innerHTML = ''; // Limpiar la tabla antes de renderizar
    dataTable.appendChild(tableHeader);
    dataTable.appendChild(tableBody);
    dataTable.style.display = 'table';
    deleteButton.style.display = 'block';
}

// Cargar datos desde localStorage al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('uploadedData');
    if (savedData) {
        const jsonData = JSON.parse(savedData);
        renderTable(jsonData);
    }
});

// Eliminar los datos almacenados
document.getElementById('delete-button').addEventListener('click', function () {
    localStorage.removeItem('uploadedData');
    const dataTable = document.getElementById('data-table');
    const deleteButton = document.getElementById('delete-button');

    dataTable.style.display = 'none';
    deleteButton.style.display = 'none';
    dataTable.innerHTML = '';
    document.getElementById('file-input').value = '';
});
