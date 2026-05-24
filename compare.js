function generateComparison(
    oldBom,
    newBom,
    oldPh,
    newPh
) {

    const allPartNumbers = new Set([
        ...Object.keys(oldBom),
        ...Object.keys(newBom),
        ...Object.keys(oldPh),
        ...Object.keys(newPh)
    ]);

    const rows = [];

    for (let pn of allPartNumbers) {

        const oldQty = oldBom[pn] || 0;
        const newQty = newBom[pn] || 0;

        const oldMass = oldPh[pn] || 0;
        const newMass = newPh[pn] || 0;

        const oldTotalWeight =
            oldQty * oldMass;

        const newTotalWeight =
            newQty * newMass;

        const weightDiff =
            newTotalWeight - oldTotalWeight;

        rows.push({
            "Part Number": pn,

            "Old Qty": oldQty,
            "New Qty": newQty,

            "Old Mass": oldMass,
            "New Mass": newMass,

            "Old Total Weight":
                oldTotalWeight.toFixed(4),

            "New Total Weight":
                newTotalWeight.toFixed(4),

            "Weight Diff":
                weightDiff.toFixed(4)
        });
    }

    return rows;
}