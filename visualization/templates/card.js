var CardTemplate = {
    getDefaultCSS: function () {
        return {
            imageMinHeight: '55vh',
            textFontSize: '1.15rem',
            textPadding: '1.75rem 2rem',
        };
    },

    render: function (frameData) {
        var config = mergeCSS(this.getDefaultCSS(), frameData.config);
        var vars = {
            '--card-image-min-height': config.imageMinHeight,
            '--card-text-font-size': config.textFontSize,
            '--card-text-padding': config.textPadding,
        };
        var style = convertCSSVariablesToString(vars);
        var img = frameData.image
            ? '<img class="frame-card-image" src="' + frameData.image + '" alt="">'
            : '';
        return (
            '<section class="frame frame-card" style="' + style + '">' +
            '<div class="frame-content frame-card-content">' +
            img +
            '<p class="frame-card-text">' + (frameData.body || '') + '</p>' +
            '</div>' +
            '</section>'
        );
    },
};

TemplateRegistry.addRenderer('card', CardTemplate);
