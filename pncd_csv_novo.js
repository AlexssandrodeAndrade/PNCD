let registros = []; // ← registros do CSV original
let processados = []; // ← registros preenchidos
let indexAtual = 0; // ← controle da posição atual

function carregarCSV(file) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      registros = results.data;
      indexAtual = 0;
      exibirFormulario(registros[indexAtual]);
    },
  });
}

function exibirFormulario(registro) {
  // popula os campos HTML com os dados de `registro`
}

function salvarRegistro() {
  const preenchido = {
    ...registros[indexAtual],
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    // outros campos preenchidos...
  };

  processados.push(preenchido);
  registros.splice(indexAtual, 1); // remove o da fila

  if (registros.length > 0) {
    exibirFormulario(registros[indexAtual]);
  } else {
    alert("Todas as inspeções foram preenchidas!");
  }
}

function exportarCSV() {
  const csv = Papa.unparse(processados);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "inspecoes_preenchidas.csv";
  link.click();
}
