// document.getElementById("csvInput").addEventListener("change", function (e) {
async function carregar_HTML() {
  const input = document.getElementById("csvFile");
  const file = input.files[0];
  if (!file) {
    alert("Por favor, selecione um arquivo CSV.");
    return;
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const dados = results.data;
      const container = document.getElementById("formulario");
      container.innerHTML = ""; // limpar

      dados.forEach((linha, index) => {
        // console.log(linha);
        const bloco = `
          <fieldset id="fset2_${index}">
            <legend>Registro ${index + 1}</legend>

            <div class="row mb-1">
              <div class="col-12">
                <div class="form-floating">
                  <input type="text" id="endereco_${index}" class="form-control" value="${linha.endereco}" />
                  <label>Endereço:</label>
                </div>
              </div>
            </div>

            <div class="row mb-1">
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" id="numero_quadra_${index}" class="form-control" value="${linha.numero_quadra}" />
                  <label>Número Quadra:</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <select id="tipo_imovel_${index}" class="form-select">
                    <option value="C" ${linha.tipo_imovel === "C" ? "selected" : ""}>C - Comércio</option>
                    <option value="O" ${linha.tipo_imovel === "O" ? "selected" : ""}>O - Outros</option>
                    <option value="R" ${linha.tipo_imovel === "R" ? "selected" : ""}>R - Residência</option>
                  </select>
                  <label>Tipo de Imóvel:</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" id="numero_imovel_${index}" class="form-control" value="${linha.numero_imovel}" />
                  <label>Número Imóvel:</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" id="identificacao_armadilha_${index}" class="form-control" value="${
          linha.identificacao_armadilha
        }" />
                  <label>Identificação Armadilha:</label>
                </div>
              </div>
            </div>

            <div class="row mb-1">
              <div class="col-12">
                <div class="form-floating">
                  <input type="text" id="localizacao_${index}" class="form-control" value="${linha.localizacao}" />
                  <label>Localização:</label>
                </div>
              </div>
            </div>

            <div class="row mb-1">
              <div class="col-6">
                <div class="form-floating">
                  <input type="date" id="data_${index}" class="form-control" value="${linha.data}" />
                  <label>Data:</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-floating">
                  <input type="time" id="hora_${index}" class="form-control" value="${linha.hora}" />
                  <label>Hora:</label>
                </div>
              </div>
            </div>

            <div class="row mb-1">
              <div class="col-3">
                <div class="form-floating">
                  <input type="number" id="tubito_chave_${index}" class="form-control" value="${linha.tubito_chave}" />
                  <label>Tubito Chave:</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-floating">
                  <input type="text" id="tubito_numero_${index}" class="form-control" value="${linha.tubito_numero}" />
                  <label>Tubito Número:</label>
                </div>
              </div>

              <div class="col-3">
                <div class="form-floating">
                  <input type="text" id="tubito_quantidade_${index}" class="form-control" value="${
          linha.tubito_quantidade
        }" />
                  <label>Tubito Quantidade:</label>
                </div>
              </div>

              <div class="col-3">
                <div class="form-floating">
                  <select id="ocorrencia_${index}" class="form-select">
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
          </fieldset>
          `;
        container.innerHTML += bloco;
      });
    },
  });
  // });
}
