var SplitTemplate = {
    getDefaultCSS: function () {
        return {
            imageWidth: '60%',
            textWidth: '40%',
            textFontSize: '2.5rem',
            placeholderFontSize: '0.95rem',
            imageMinHeight: '60vh',
        };
    },

    render: function (frameData) {
        var config = mergeCSS(this.getDefaultCSS(), frameData.config);
        var vars = {
            '--split-image-width': config.imageWidth,
            '--split-text-width': config.textWidth,
            '--split-text-font-size': config.textFontSize,
            '--split-placeholder-font-size': config.placeholderFontSize,
            '--split-image-min-height': config.imageMinHeight,
        };
        var style = convertCSSVariablesToString(vars);
        var leftContent = frameData.image
            ? '<img class="frame-split-image" src="' + frameData.image + '" alt="">'
            : '<div class="frame-split-placeholder">' + (frameData.placeholderText || 'Image placeholder') + '</div>';
        return (
            '<section class="frame frame-split" style="' + style + '">' +
            '<div class="frame-content frame-split-content">' +
            '<div class="frame-split-left">' + leftContent + '</div>' +
            '<div class="frame-split-right">' +
            '<p class="frame-split-text">' + (frameData.body || '') + '</p>' +
            '</div>' +
            '</div>' +
            '</section>'
        );
    },
};

TemplateRegistry.addRenderer('split', SplitTemplate);
