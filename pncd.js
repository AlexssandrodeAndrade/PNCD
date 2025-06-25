// 📌 Variáveis globais
let font; // será preenchida depois
const size = 10;
const color = PDFLib.rgb(1, 0, 0); //red(1,0,0) green(0,1,0)  blue(0,0,1)

// 🔍 Utilitário para pegar valor de um campo HTML
const get = id => document.getElementById(id)?.value || "";

// 🔠 Função para centralizar texto dentro de uma área
//function posicaoTexto(texto, font, size, xInicio, xFim, yInicio, yFim) {
function posicaoTexto(texto, xInicio, xFim, yInicio, yFim) {
  const larguraTexto = font.widthOfTextAtSize(texto, size);
  const alturaTexto = font.heightAtSize(size);

  const centroX = (xInicio + xFim) / 2;
  const centroY = (yInicio + yFim) / 2;

  const xCorrigido = centroX - larguraTexto / 2;
  const yCorrigido = centroY - alturaTexto / 2;

  return { x: xCorrigido, y: yCorrigido };
}

// 📄 Função principal
async function gerarPDF() {
  try {
    const pdfDoc = await carregarPDFdoInput(); // ← lê do input file
    await preencherPDF(pdfDoc); // ← preenche os campos
    const pdfBytes = await pdfDoc.save(); // ← salva o PDF

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (e) {
    console.error("Erro ao gerar PDF:", e);
    alert("Erro ao gerar PDF: " + e.message);
  }
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

// ✏️ Preenche os dados no PDF
async function preencherPDF(pdfDoc) {
  const { StandardFonts } = PDFLib;
  font = await pdfDoc.embedFont(StandardFonts.Helvetica); // define a fonte globalmente

  const firstPage = pdfDoc.getPages()[0];

  // Exemplo com fset1_
  const cidade = get("cidade");
  const localidade = get("localidade");
  const categ_local = get("categ_local");
  const zona = get("zona");
  const semana_epidemiologica = get("semana_epidemiologica");
  const tipo_armadilha = get("tipo_armadilha");
  const endereco = get("endereco");
  const numero_quadra = get("numero_quadra");
  const tipo_imovel = get("tipo_imovel");
  const numero_imovel = get("numero_imovel");
  const identificacao_armadilha = get("identificacao_armadilha");
  const localizacao = get("localizacao");
  const data = get("data");
  const hora = get("hora");
  const tubito_chave = get("tubito_chave");
  const tubito_numero = get("tubito_numero");
  const ocorrencia = get("ocorrencia");

  // const posCidade = posicaoTexto(cidade, 11, 209, 489, 506);
  // firstPage.drawText(cidade, {
  //   x: posCidade.x,
  //   y: posCidade.y,
  //   size,
  //   font,
  //   color,
  // });

  // const posLocalidade = posicaoTexto(localidade, 219, 460, 490, 506);
  // firstPage.drawText(localidade, {
  //   x: posLocalidade.x,
  //   y: posLocalidade.y,
  //   size,
  //   font,
  //   color,
  // });

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

  const posTubitoNumero = posicaoTexto(tubito_numero, 630, 660, 400, 420);
  firstPage.drawText(tubito_numero, { x: posTubitoNumero.x, y: posTubitoNumero.y, size, font, color });

  const posOcorrencia = posicaoTexto(ocorrencia, 660, 685, 400, 420);
  firstPage.drawText(ocorrencia, { x: posOcorrencia.x, y: posOcorrencia.y, size, font, color });

  return pdfDoc;
}
