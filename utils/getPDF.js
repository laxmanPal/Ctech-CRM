const puppeteer = require("puppeteer");
const ejs = require("ejs");

exports.generatePDF = async (res, template, data , pdfName) => {
    const compiledTemplate = ejs.render(template, data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(compiledTemplate);
    // await page.setDefaultNavigationTimeout(60000);

    const pdf = await page.pdf({
      format: "letter",
      printBackground: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${pdfName}.pdf`
    );
    res.send(pdf);
  };