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

async function carregarPDFdoInput() {
  const fileInput = document.getElementById("pdfFile");
  if (!fileInput.files.length) {
    throw new Error("Nenhum arquivo PDF foi selecionado.");
  }

  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();
  return await PDFLib.PDFDocument.load(arrayBuffer);
}

async function preencherPDF(pdfDoc) {
  const { rgb, StandardFonts } = PDFLib;
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const color = rgb(0, 1, 0); //red(1,0,0) green(0,1,0)  blue(0,0,1)
  const size = 10;

  const get = id => document.getElementById(id)?.value || "";

  const firstPage = pdfDoc.getPages()[0];

  // Obter valores fieldset 1 fset1_
  if (1 === 1) {
    // const A = ".A";
    // const B = ".B";
    // const C = ".C";
    // const D = ".D";

    // const A = ".";
    // const B = ".";
    // const C = ".";
    // const D = ".";

    // const A = "+";
    // const B = "+";
    // const C = "+";
    // const D = "+";

    const A = "!";
    const B = "!";
    const C = "!";
    const D = "!";

    const pos_a = { x: 471, y: 507 };
    const pos_b = { x: 517, y: 507 };
    const pos_c = { x: 471, y: 491 };
    const pos_d = { x: 517, y: 491 };

    firstPage.drawText(A, {
      x: pos_a.x,
      y: pos_a.y,
      size,
      font,
      color,
    });

    firstPage.drawText(B, {
      x: pos_b.x,
      y: pos_b.y,
      size,
      font,
      color,
    });

    firstPage.drawText(C, {
      x: pos_c.x,
      y: pos_c.y,
      size,
      font,
      color,
    });

    firstPage.drawText(D, {
      x: pos_d.x,
      y: pos_d.y,
      size,
      font,
      color,
    });
  }
  return pdfDoc;
}
