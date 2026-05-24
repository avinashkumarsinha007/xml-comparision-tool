function parseBom(xmlText) {

    const parser = new DOMParser();

    const xml = parser.parseFromString(xmlText, "text/xml");

    const bomList = xml.getElementsByTagName("BOM");

    const result = {};

    for (let bom of bomList) {

        const partNumber = bom.getAttribute("PartNumber");

        if (!partNumber) continue;

        const quantity =
            parseFloat(bom.getAttribute("Quantity") || 0);

        if (result[partNumber]) {
            result[partNumber] += quantity;
        } else {
            result[partNumber] = quantity;
        }
    }

    return result;
}

function parsePh(xmlText) {

    const parser = new DOMParser();

    const xml = parser.parseFromString(xmlText, "text/xml");

    const devices =
        xml.getElementsByTagName("ConnectiveDevice");

    const result = {};

    for (let device of devices) {

        const partNumber =
            device.getAttribute("PartNumber");
        
        if (!partNumber) continue;

        const mass =
            parseFloat(device.getAttribute("Mass") || 0);

        result[partNumber] = mass;
    }

    return result;
}