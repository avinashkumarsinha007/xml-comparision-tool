document.getElementById("compareBtn")
    .addEventListener("click", compareFiles);

async function compareFiles() {

    const oldBomFile = document.getElementById("oldBom").files[0];
    const newBomFile = document.getElementById("newBom").files[0];
    const oldPhFile = document.getElementById("oldPh").files[0];
    const newPhFile = document.getElementById("newPh").files[0];

    const oldBomXml = await readFile(oldBomFile);
    const newBomXml = await readFile(newBomFile);
    const oldPhXml = await readFile(oldPhFile);
    const newPhXml = await readFile(newPhFile);

    const oldBomData = parseBom(oldBomXml);
    const newBomData = parseBom(newBomXml);

    const oldPhData = parsePh(oldPhXml);
    const newPhData = parsePh(newPhXml);

    const result = generateComparison(
        oldBomData,
        newBomData,
        oldPhData,
        newPhData
    );

    exportExcel(result);
}

function readFile(file) {
    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = e => resolve(e.target.result);

        reader.onerror = reject;

        reader.readAsText(file);
    });
}