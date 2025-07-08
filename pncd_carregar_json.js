async function carregar_JSON() {
  const input = document.getElementById("jsonFile");
  const file = input.files[0];
  if (!file) {
    alert("Por favor, selecione um arquivo JSON.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const dados = JSON.parse(event.target.result);
    const inspecao = dados.inspecao;
    const armadilhas = dados.armadilhas;

    const container = document.getElementById("formulario");
    container.innerHTML = ""; // limpar

    // Cabeçalho
    const fset1 = `
      <fieldset id="fset1">
        <legend><h3>Informações da Inspeção</h3></legend>

        <div class="row mb-1">
          <div class="col-4">
            <div class="form-floating">
              <input type="text" id="cidade" name="cidade" class="form-control" placeholder="Municipio:" value="${
                inspecao.cidade
              }" />
              <label for="cidade">Municipio:</label>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating">
              <input type="text" id="localidade" name="localidade" class="form-control" placeholder="Código e nome da localidade:" value="${
                inspecao.localidade
              }" />
              <label for="localidade">Código e nome da localidade:</label>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating">
              <input type="text" id="categ_local" name="categ_local" class="form-control" placeholder="Categ. Local:" value="${
                inspecao.categ_local
              }" />
              <label for="categ_local">Categ. Local:</label>
            </div>
          </div>
        </div>

        <div class="row mb-1">
          <div class="col-4">
            <div class="form-floating">
              <input type="text" id="zona" name="zona" class="form-control" placeholder="Zona:" value="${
                inspecao.zona
              }" />
              <label for="zona">Zona:</label>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating">
              <input type="text" id="semana_epidemiologica" name="semana_epidemiologica" class="form-control" placeholder="Semana Epidemiologica:" value="${
                inspecao.semana_epidemiologica
              }" />
              <label for="semana_epidemiologica">Semana Epidemiologica:</label>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating">
              <select id="tipo_armadilha" class="form-select">
                <option value="" ${inspecao.tipo_armadilha === "" ? "selected" : ""}>Selecione</option>
                <option value="1" ${inspecao.tipo_armadilha === "1" ? "selected" : ""}>1 - Ovitramapa</option>
                <option value="2" ${inspecao.tipo_armadilha === "2" ? "selected" : ""}>2 - Larvitramapa</option>
              </select>
              <label for="tipo_armadilha">Tipo de Armadilha:</label>
            </div>
          </div>
        </div>
      </fieldset>
    `;

    container.innerHTML += fset1;

    // Corpo (mesmo padrão do CSV)
    armadilhas.forEach((linha, index) => {
      const bloco = `
        <fieldset id="fset2_${index}">
          <legend>Registro ${index + 1}</legend>

          <div class="row mb-1">
            <div class="col-12">
              <div class="form-floating">
                <input type="text" id="endereco_${index}" class="form-control" value="${linha.endereco}" />
                <label for="endereco_${index}">Endereço:</label>
              </div>
            </div>
          </div>

          <div class="row mb-1">
            <div class="col-3">
              <div class="form-floating">
                <input type="text" id="numero_quadra_${index}" class="form-control" value="${linha.numero_quadra}" />
                <label for="numero_quadra_${index}">Número Quadra:</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <select id="tipo_imovel_${index}" class="form-select">
                  <option value="C" ${linha.tipo_imovel === "C" ? "selected" : ""}>C - Comércio</option>
                  <option value="O" ${linha.tipo_imovel === "O" ? "selected" : ""}>O - Outros</option>
                  <option value="R" ${linha.tipo_imovel === "R" ? "selected" : ""}>R - Residência</option>
                </select>
                <label for="tipo_imovel_${index}">Tipo de Imóvel:</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" id="numero_imovel_${index}" class="form-control" value="${linha.numero_imovel}" />
                <label for="numero_imovel_${index}">Número Imóvel:</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" id="identificacao_armadilha_${index}" class="form-control" value="${
        linha.identificacao_armadilha
      }" />
                <label for="identificacao_armadilha_${index}">Identificação Armadilha:</label>
              </div>
            </div>
          </div>

          <div class="row mb-1">
            <div class="col-12">
              <div class="form-floating">
                <input type="text" id="localizacao_${index}" class="form-control" value="${linha.localizacao}" />
                <label for="localizacao_${index}">Localização:</label>
              </div>
            </div>
          </div>

          <div class="row mb-1">
            <div class="col-6">
              <div class="form-floating">
                <input type="date" id="data_${index}" class="form-control" value="${linha.data}" />
                <label for="data_${index}">Data:</label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-floating">
                <input type="time" id="hora_${index}" class="form-control" value="${linha.hora}" />
                <label for="hora_${index}">Hora:</label>
              </div>
            </div>
          </div>

          <div class="row mb-1">
            <div class="col-3">
              <div class="form-floating">
                <input type="number" id="tubito_chave_${index}" class="form-control" value="${linha.tubito_chave}" />
                <label for="tubito_chave_${index}">Tubito Chave:</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" id="tubito_numero_${index}" class="form-control" value="${linha.tubito_numero}" />
                <label for="tubito_numero_${index}">Tubito Número:</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" id="tubito_quantidade_${index}" class="form-control" value="${
        linha.tubito_quantidade
      }" />
                <label for="tubito_quantidade_${index}">Tubito Quantidade:</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <select id="ocorrencia_${index}" class="form-select">
                  <option value="" ${linha.ocorrencia === "" ? "selected" : ""}>Selecione</option>
                  <option value="1" ${linha.ocorrencia === "1" ? "selected" : ""}>1 - Casa Fechada</option>
                  <option value="2" ${linha.ocorrencia === "2" ? "selected" : ""}>2 - Intervalo > 7 dias</option>
                  <option value="3" ${linha.ocorrencia === "3" ? "selected" : ""}>3 - Armadilha removida</option>
                  <option value="4" ${linha.ocorrencia === "4" ? "selected" : ""}>4 - Armadilha seca</option>
                </select>
                <label for="ocorrencia_${index}">Ocorrência:</label>
              </div>
            </div>
          </div>
        </fieldset>
      `;
      container.innerHTML += bloco;
    });

    // ✅ Habilitar botão PDF (se quiser)
    //document.getElementById("btnGerarPDF").disabled = false;
  };

  reader.readAsText(file);
}
