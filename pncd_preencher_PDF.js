let font; // será preenchida depois
const size = 10;
const color = PDFLib.rgb(1, 0, 0); //red(1,0,0) green(0,1,0)  blue(0,0,1)

async function preencherPDFPorIndice(pdfDoc, index) {
  const { StandardFonts } = PDFLib;
  font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const firstPage = pdfDoc.getPages()[0];

  const get = id => document.getElementById(id)?.value || "";

  // Campos
  const cidade = get("cidade");
  const localidade = get("localidade");
  const categ_local = get("categ_local");
  const zona = get("zona");
  const semana_epidemiologica = get("semana_epidemiologica");
  const tipo_armadilha = get("tipo_armadilha");

  // Coordenadas e inserções (ajuste conforme layout do seu PDF)
  const posCidade = posicaoTexto(cidade, 11, 209, 489, 506);
  firstPage.drawText(cidade, { x: posCidade.x, y: posCidade.y, size, font, color });

  const posLocalidade = posicaoTexto(localidade, 220, 460, 489, 506);
  firstPage.drawText(localidade, { x: posLocalidade.x, y: posLocalidade.y, size, font, color });

  const posCategLocal = posicaoTexto(categ_local, 470, 517, 490, 507);
  firstPage.drawText(categ_local, { x: posCategLocal.x, y: posCategLocal.y, size, font, color });

  const posZona = posicaoTexto(zona, 530, 585, 490, 507);
  firstPage.drawText(zona, { x: posZona.x, y: posZona.y, size, font, color });

  const posSemana = posicaoTexto(semana_epidemiologica, 597, 651, 490, 508);
  firstPage.drawText(semana_epidemiologica, { x: posSemana.x, y: posSemana.y, size, font, color });

  const posTipoArmadilha = posicaoTexto(tipo_armadilha, 700, 740, 490, 508);
  firstPage.drawText(tipo_armadilha, { x: posTipoArmadilha.x, y: posTipoArmadilha.y, size, font, color });

  // Utilitário para pegar valor com sufixo
  const getCampo = campo => document.getElementById(`${campo}_${index}`)?.value || "";

  // Campos
  const endereco = getCampo("endereco");
  const numero_quadra = getCampo("numero_quadra");
  const tipo_imovel = getCampo("tipo_imovel");
  const numero_imovel = getCampo("numero_imovel");
  const identificacao_armadilha = getCampo("identificacao_armadilha");
  const localizacao = getCampo("localizacao");
  const data = getCampo("data");
  const hora = getCampo("hora");
  const tubito_chave = getCampo("tubito_chave");
  const tubito_numero = getCampo("tubito_numero");
  const ocorrencia = getCampo("ocorrencia");

  // Coordenadas e inserções (ajuste conforme layout do seu PDF)

  const posEndereco = posicaoTexto(endereco, 11, 180, 400, 420);
  firstPage.drawText(endereco, { x: posEndereco.x, y: posEndereco.y, size, font, color });

  const posNumeroQuadra = posicaoTexto(numero_quadra, 180, 212, 400, 420);
  firstPage.drawText(numero_quadra, { x: posNumeroQuadra.x, y: posNumeroQuadra.y, size, font, color });

  const posTipoImovel = posicaoTexto(tipo_imovel, 212, 245, 400, 420);
  firstPage.drawText(tipo_imovel, { x: posTipoImovel.x, y: posTipoImovel.y, size, font, color });

  const posNumeroImovel = posicaoTexto(numero_imovel, 245, 277, 400, 420);
  firstPage.drawText(numero_imovel, { x: posNumeroImovel.x, y: posNumeroImovel.y, size, font, color });

  const posIdentArmadilha = posicaoTexto(identificacao_armadilha, 277, 310, 400, 420);
  firstPage.drawText(identificacao_armadilha, { x: posIdentArmadilha.x, y: posIdentArmadilha.y, size, font, color });

  const posHora = posicaoTexto(hora, 310, 358, 400, 420);
  firstPage.drawText(hora, { x: posHora.x, y: posHora.y, size, font, color });

  const posData = posicaoTexto(data, 358, 430, 400, 420);
  firstPage.drawText(data, { x: posData.x, y: posData.y, size, font, color });

  const posLocalizacao = posicaoTexto(localizacao, 430, 605, 400, 420);
  firstPage.drawText(localizacao, { x: posLocalizacao.x, y: posLocalizacao.y, size, font, color });

  const posTubitoChave = posicaoTexto(tubito_chave, 605, 630, 400, 420);
  firstPage.drawText(tubito_chave, { x: posTubitoChave.x, y: posTubitoChave.y, size, font, color });

  const posTubitoNumero = posicaoTexto(tubito_numero, 632, 660, 400, 420);
  firstPage.drawText(tubito_numero, { x: posTubitoNumero.x, y: posTubitoNumero.y, size, font, color });

  const posOcorrencia = posicaoTexto(ocorrencia, 660, 685, 400, 420);
  firstPage.drawText(ocorrencia, { x: posOcorrencia.x, y: posOcorrencia.y, size, font, color });

  return pdfDoc;
}

async function gerarPDFComRegistro(index) {
  const pdfDoc = await carregarPDFdoInput();
  await preencherPDFPorIndice(pdfDoc, index);
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

// 📥 Carrega o PDF do input do usuário
async function carregarPDFdoInput() {
  const fileInput = document.getElementById("pdfFile");
  if (!fileInput.files.length) {
    throw new Error("Nenhum arquivo PDF foi selecionado.");
  }

  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();
  return await PDFLib.PDFDocument.load(arrayBuffer);
}

function posicaoTexto(texto, xInicio, xFim, yInicio, yFim) {
  const larguraTexto = font.widthOfTextAtSize(texto, size);
  const alturaTexto = font.heightAtSize(size);

  const centroX = (xInicio + xFim) / 2;
  const centroY = (yInicio + yFim) / 2;

  const xCorrigido = centroX - larguraTexto / 2;
  const yCorrigido = centroY - alturaTexto / 2;

  return { x: xCorrigido, y: yCorrigido };
}

async function gerarPDF() {
  const total = document.querySelectorAll("fieldset[id^='fset2_']").length;
  const registrosPorPDF = 14;
  const totalPDFs = Math.ceil(total / registrosPorPDF);

  for (let i = 0; i < totalPDFs; i++) {
    const inicio = i * registrosPorPDF;
    const fim = Math.min(inicio + registrosPorPDF, total);

    const pdfDoc = await carregarPDFdoInput();
    const firstPage = pdfDoc.getPages()[0];
    const { StandardFonts } = PDFLib;
    font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (let j = inicio; j < fim; j++) {
      await preencherPDFPorIndice(pdfDoc, j, j % registrosPorPDF); // novo índice de posição
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }
}
