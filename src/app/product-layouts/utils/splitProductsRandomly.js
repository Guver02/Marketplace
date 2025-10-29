function splitProductsRandomly(products) {
    const layouts = [1, 2, 3, 4, 6, 8];
    const sections = [];

    let i = 0;
    let previousSize = 0;
    let previousChunk = null;

    while (i < products.length) {
        const remaining = products.length - i;

        // Filtramos layouts que no sobrepasen la cantidad restante
        let validLayouts = layouts.filter((size) => size <= remaining);

        // Excluir el tamaño anterior si hay más de una opción válida
        if (validLayouts.length > 1) {
            validLayouts = validLayouts.filter((size) => size !== previousSize);
        }

        // Elegimos uno aleatorio de los que sí caben
        const randomLayoutSize = validLayouts[Math.floor(Math.random() * validLayouts.length)];
        const chunk = products.slice(i, i + randomLayoutSize);

        // Evitar chunks idénticos consecutivos
        if (previousChunk && arraysEqual(chunk, previousChunk)) {
            // Forzamos un layout diferente si es posible
            const alternativeLayouts = validLayouts.filter(size => size !== randomLayoutSize);
            if (alternativeLayouts.length > 0) {
                const altSize = alternativeLayouts[Math.floor(Math.random() * alternativeLayouts.length)];
                const altChunk = products.slice(i, i + altSize);
                if (!arraysEqual(altChunk, previousChunk)) {
                    sections.push(altChunk);
                    previousChunk = altChunk;
                    previousSize = altSize;
                    i += altSize;
                    continue;
                }
            }
        }

        sections.push(chunk);
        previousChunk = chunk;
        previousSize = randomLayoutSize;
        i += randomLayoutSize;
    }

    return sections;
}

// Helper para comparar dos arrays
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
}

export { splitProductsRandomly };
