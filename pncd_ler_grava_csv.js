// CSV para HTML - Unificado e Modular
let registros = [];
let processados = [];
let indexAtual = 0;

function CSV() {
  const input = document.getElementById("csvInput");
  const file = input.files[0];
  if (!file) {
    alert("Por favor, selecione um arquivo CSV.");
    return;
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      registros = results.data;
      indexAtual = 0;
      exibirRegistroAtual();
    },
  });
}

function exibirRegistroAtual() {
  const container = document.getElementById("formulario");
  container.innerHTML = "";
  if (indexAtual >= registros.length) {
    container.innerHTML = "<p>Todas as armadilhas foram preenchidas.</p>";
    return;
  }
  const linha = registros[indexAtual];
  const index = indexAtual;
  const bloco = `
  <fieldset id="fset2_${index}">
    <legend>Registro ${index + 1}</legend>
    <div class="row mb-1">
      <div class="col-12">
        <div class="form-floating">
          <input type="text" id="endereco" class="form-control" value="${linha.endereco}" />
          <label>Endereço:</label>
        </div>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col-3">
        <div class="form-floating">
          <input type="text" id="numero_quadra" class="form-control" value="${linha.numero_quadra}" />
          <label>Número Quadra:</label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-floating">
          <select id="tipo_imovel" class="form-select">
            <option value="C" ${linha.tipo_imovel === "C" ? "selected" : ""}>C - Comércio</option>
            <option value="O" ${linha.tipo_imovel === "O" ? "selected" : ""}>O - Outros</option>
            <option value="R" ${linha.tipo_imovel === "R" ? "selected" : ""}>R - Residência</option>
          </select>
          <label>Tipo de Imóvel:</label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-floating">
          <input type="text" id="numero_imovel" class="form-control" value="${linha.numero_imovel}" />
          <label>Número Imóvel:</label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-floating">
          <input type="text" id="identificacao_armadilha" class="form-control" value="${
            linha.identificacao_armadilha
          }" />
          <label>Identificação Armadilha:</label>
        </div>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col-12">
        <div class="form-floating">
          <input type="text" id="localizacao" class="form-control" value="${linha.localizacao}" />
          <label>Localização:</label>
        </div>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col-6">
        <div class="form-floating">
          <input type="date" id="data" class="form-control" value="${linha.data || ""}" />
          <label>Data:</label>
        </div>
      </div>
      <div class="col-6">
        <div class="form-floating">
          <input type="time" id="hora" class="form-control" value="${linha.hora || ""}" />
          <label>Hora:</label>
        </div>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col-3">
        <div class="form-floating">
          <input type="number" id="tubito_chave" class="form-control" value="${linha.tubito_chave}" />
          <label>Tubito Chave:</label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-floating">
          <input type="text" id="tubito_numero" class="form-control" value="${linha.tubito_numero}" />
          <label>Tubito Número:</label>
        </div>
      </div>
<div class="col-3">
        <div class="form-floating">
          <input type="text" id="tubito_quantidade" class="form-control" value="${linha.tubito_quantidade}" />
          <label>Tubito Número:</label>
        </div>
      </div>      
      <div class="col-3">
        <div class="form-floating">
          <select id="ocorrencia" class="form-select">
            <option value="" disabled ${linha.ocorrencia === "" ? "selected" : ""}>Selecione</option>
            <option value="1" ${linha.ocorrencia === "1" ? "selected" : ""}>1 - Casa Fechada</option>
            <option value="2" ${linha.ocorrencia === "2" ? "selected" : ""}>2 - Intervalo > 7 dias</option>
            <option value="3" ${linha.ocorrencia === "3" ? "selected" : ""}>3 - Armadilha removida</option>
            <option value="4" ${linha.ocorrencia === "4" ? "selected" : ""}>4 - Armadilha seca</option>
          </select>
          <label>Ocorrência:</label>
        </div>
      </div>
    </div>
    <button class="btn btn-success" onclick="salvarAtual()">Salvar e Próximo</button>
  </fieldset>`;

  container.innerHTML = bloco;
}

function salvarAtual() {
  const dados = {
    ...registros[indexAtual],
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    tubito_chave: document.getElementById("tubito_chave").value,
    tubito_numero: document.getElementById("tubito_numero").value,
    ocorrencia: document.getElementById("ocorrencia").value,
  };

  processados.push(dados);
  registros.splice(indexAtual, 1);
  exibirRegistroAtual();
}

function exportarCSV() {
  const csv = Papa.unparse(processados);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "inspecoes_preenchidas.csv";
  link.click();
}
