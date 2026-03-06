/**
 * Base utilities for frame templates.
 * All templates implement: render(frameData), getDefaultConfig(), [getConfigSchema()]
 */

function mergeCSS(defaultCSS, newCSS) {
    if (!newCSS || typeof newCSS !== 'object') {
        return Object.assign({}, defaultCSS);
    }
    
    const mergedCSS = Object.assign({}, defaultCSS);
    for (const cssKey in newCSS) {
        if (Object.prototype.hasOwnProperty.call(newCSS, cssKey) && newCSS[cssKey] !== undefined) {
            mergedCSS[cssKey] = newCSS[cssKey];
        }
    }
    return mergedCSS;
}

function convertCSSVariablesToString(vars) {
    return Object.keys(vars)
        .map(function (k) { return k + ':' + vars[k]; })
        .join(';');
}
