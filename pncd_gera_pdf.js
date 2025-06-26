// 📌 Variáveis globais
let font;
const size = 10;
const color = PDFLib.rgb(1, 0, 0); // vermelho

// 🔠 Centraliza o texto dentro de uma área delimitada
function posicaoTexto(texto, xInicio, xFim, yInicio, yFim) {
  const larguraTexto = font.widthOfTextAtSize(texto, size);
  const alturaTexto = font.heightAtSize(size);
  const centroX = (xInicio + xFim) / 2;
  const centroY = (yInicio + yFim) / 2;
  return {
    x: centroX - larguraTexto / 2,
    y: centroY - alturaTexto / 2,
  };
}

// 📥 Carrega o arquivo PDF do input
async function carregarPDFdoInput() {
  const fileInput = document.getElementById("pdfFile");
  if (!fileInput.files.length) {
    throw new Error("Nenhum PDF selecionado.");
  }
  const arrayBuffer = await fileInput.files[0].arrayBuffer();
  return await PDFLib.PDFDocument.load(arrayBuffer);
}

// 🧮 Calcula a coordenada Y para a linha da tabela
function getLinhaY(slotIndex) {
  const yTopoPrimeiraLinha = 400;
  const alturaLinha = 20;
  return yTopoPrimeiraLinha - slotIndex * alturaLinha;
}

async function preencherPDFPorIndiceDireto(pdfDoc, pagina, index, slotIndex) {
  const { StandardFonts } = PDFLib;
  if (!font) font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const get = id => document.getElementById(id)?.value || "";
  const getCampo = campo => document.getElementById(`${campo}_${index}`)?.value || "";

  // Cabeçalho (apenas 1x por página)
  if (slotIndex === 0) {
    const cidade = get("cidade");
    const localidade = get("localidade");
    const categ_local = get("categ_local");
    const zona = get("zona");
    const semana_epidemiologica = get("semana_epidemiologica");
    const tipo_armadilha = get("tipo_armadilha");

    const posCidade = posicaoTexto(cidade, 11, 209, 489, 506);
    pagina.drawText(cidade, { x: posCidade.x, y: posCidade.y, size, font, color });

    const posLocalidade = posicaoTexto(localidade, 220, 460, 489, 506);
    pagina.drawText(localidade, { x: posLocalidade.x, y: posLocalidade.y, size, font, color });

    const posCategLocal = posicaoTexto(categ_local, 470, 517, 490, 507);
    pagina.drawText(categ_local, { x: posCategLocal.x, y: posCategLocal.y, size, font, color });

    const posZona = posicaoTexto(zona, 530, 585, 490, 507);
    pagina.drawText(zona, { x: posZona.x, y: posZona.y, size, font, color });

    const posSemana = posicaoTexto(semana_epidemiologica, 597, 651, 490, 508);
    pagina.drawText(semana_epidemiologica, { x: posSemana.x, y: posSemana.y, size, font, color });

    const posTipoArmadilha = posicaoTexto(tipo_armadilha, 700, 740, 490, 508);
    pagina.drawText(tipo_armadilha, { x: posTipoArmadilha.x, y: posTipoArmadilha.y, size, font, color });
  }

  const y = getLinhaY(slotIndex);

  const campos = [
    { nome: "endereco", xIni: 11, xFim: 180 },
    { nome: "numero_quadra", xIni: 180, xFim: 212 },
    { nome: "tipo_imovel", xIni: 212, xFim: 245 },
    { nome: "numero_imovel", xIni: 245, xFim: 277 },
    { nome: "identificacao_armadilha", xIni: 277, xFim: 310 },
    { nome: "hora", xIni: 310, xFim: 358 },
    { nome: "data", xIni: 358, xFim: 430 },
    { nome: "localizacao", xIni: 430, xFim: 605 },
    { nome: "tubito_chave", xIni: 605, xFim: 630 },
    { nome: "tubito_numero", xIni: 632, xFim: 660 },
    { nome: "ocorrencia", xIni: 660, xFim: 685 },
  ];

  for (const campo of campos) {
    let valor = getCampo(campo.nome);

    if (campo.nome === "data" && valor.includes("-")) {
      const partes = valor.split("-");
      valor = `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    if (campo.nome === "tubito_numero") {
      const qtd = document.getElementById(`tubito_quantidade_${index}`)?.value?.trim();

      if (qtd > 1) valor += `/${qtd}`;
    }

    let x, yTexto;
    if (campo.nome === "endereco" || campo.nome === "localizacao") {
      x = campo.xIni + 2;
      yTexto = y + 3;
    } else {
      const pos = posicaoTexto(valor, campo.xIni, campo.xFim, y, y + 15);
      x = pos.x;
      yTexto = pos.y;
    }

    pagina.drawText(valor, { x, y: yTexto, size, font, color });
  }
}

function preencherTotaisNaPagina(pdfDoc, pagina, i, fim) {
  let quarteiroes = new Set();
  let totalImoveis = 0;
  let totalPositivas = 0;
  let totalTubitos = 0;

  for (let j = i; j < fim; j++) {
    const quadra = document.getElementById(`numero_quadra_${j}`)?.value;
    const chave = document.getElementById(`tubito_chave_${j}`)?.value?.trim();
    const numero = document.getElementById(`tubito_numero_${j}`)?.value?.trim();
    const quantidade = document.getElementById(`tubito_quantidade_${j}`)?.value?.trim();

    if (quadra) quarteiroes.add(quadra);
    totalImoveis++;

    if (chave && numero && quantidade) {
      totalPositivas++;
    }

    if (quantidade && !isNaN(quantidade)) {
      totalTubitos += parseInt(quantidade);
    }
  }

  // Coordenadas com base nos 4 pontos delimitadores
  const camposTotais = [
    { valor: quarteiroes.size, xIni: 123, xFim: 165, yIni: 103, yFim: 132 }, // Total de quarteirões
    { valor: totalImoveis, xIni: 123, xFim: 165, yIni: 74, yFim: 103 }, // Total de Imóveis
    { valor: totalImoveis, xIni: 285, xFim: 328, yIni: 103, yFim: 132 }, // Total de armadilhas inspecionadas
    { valor: totalPositivas, xIni: 285, xFim: 328, yIni: 74, yFim: 103 }, // Total de armadilhas positivas
    { valor: totalTubitos, xIni: 449, xFim: 491, yIni: 103, yFim: 132 }, // Total de tubitos/palhetas
  ];

  for (const campo of camposTotais) {
    const pos = posicaoTexto(String(campo.valor), campo.xIni, campo.xFim, campo.yIni, campo.yFim);
    pagina.drawText(String(campo.valor), {
      x: pos.x,
      y: pos.y,
      size: 10,
      font,
      color: PDFLib.rgb(1, 0, 0),
    });
  }
}

async function gerar_PDF() {
  const fileInput = document.getElementById("pdfFile");
  if (!fileInput.files.length) {
    alert("Por favor, selecione um arquivo PDF.");
    return;
  }

  const total = document.querySelectorAll("fieldset[id^='fset2_']").length;
  const porPagina = 14;

  const arrayBufferOriginal = await fileInput.files[0].arrayBuffer();
  const modeloBase = await PDFLib.PDFDocument.load(arrayBufferOriginal);
  const pdfFinal = await PDFLib.PDFDocument.create();
  font = await pdfFinal.embedFont(PDFLib.StandardFonts.Helvetica);

  for (let i = 0; i < total; i += porPagina) {
    const fim = Math.min(i + porPagina, total);
    const [paginaNova] = await pdfFinal.copyPages(modeloBase, [0]);
    pdfFinal.addPage(paginaNova);

    for (let j = i; j < fim; j++) {
      await preencherPDFPorIndiceDireto(pdfFinal, paginaNova, j, j - i);
    }
    preencherTotaisNaPagina(pdfFinal, paginaNova, i, fim);
  }

  const pdfBytes = await pdfFinal.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}
