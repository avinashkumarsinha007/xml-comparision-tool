function exportExcel(data) {

    const worksheet =
        XLSX.utils.json_to_sheet(data);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Comparison"
    );

    // Get range
    const range =
        XLSX.utils.decode_range(worksheet["!ref"]);

    // Find Weight Diff column index
    const headers = data.length
        ? Object.keys(data[0])
        : [];

    const diffColIndex =
        headers.indexOf("Weight Diff");

    // Highlight rows
    for (
        let row = 1;
        row <= data.length;
        row++
    ) {

        const cellAddress =
            XLSX.utils.encode_cell({
                r: row,
                c: diffColIndex
            });

        const cell = worksheet[cellAddress];

        if (
            cell &&
            parseFloat(cell.v) !== 0
        ) {

            cell.s = {
                fill: {
                    fgColor: {
                        rgb: "FFFF00"
                    }
                }
            };
        }
    }

    // Auto width
    worksheet["!cols"] = headers.map(
        header => ({
            wch: Math.max(header.length, 20)
        })
    );

    XLSX.writeFile(
        workbook,
        "comparison-result.xlsx"
    );
}