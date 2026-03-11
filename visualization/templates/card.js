var CardTemplate = {
    getDefaultCSS: function () {
        return {
            imageMinHeight: '55vh',
            imageMaxHeight: '72vh',
            imageHeight: 'auto',
            imageFit: 'cover',
            imagePosition: 'center',
            textFontSize: '1.15rem',
            textPadding: '1.75rem 2rem',
        };
    },

    render: function (frameData) {
        var config = mergeCSS(this.getDefaultCSS(), frameData.config);
        var vars = {
            '--card-image-min-height': config.imageMinHeight,
            '--card-image-max-height': config.imageMaxHeight,
            '--card-image-height': config.imageHeight,
            '--card-image-fit': config.imageFit,
            '--card-image-position': config.imagePosition,
            '--card-text-font-size': config.textFontSize,
            '--card-text-padding': config.textPadding,
        };
        var style = convertCSSVariablesToString(vars);
        var img = frameData.image
            ? '<img class="frame-card-image" src="' + frameData.image + '" alt="">'
            : '';
        var title = frameData.title
            ? '<h2 class="frame-card-title">' + frameData.title + '</h2>'
            : '';
        var subtitle = frameData.subtitle
            ? '<p class="frame-card-subtitle">' + frameData.subtitle + '</p>'
            : '';
        return (
            '<section class="frame frame-card" style="' + style + '">' +
            '<div class="frame-content frame-card-content">' +
            img +
            '<div class="frame-card-text">' + title + subtitle + (frameData.body || '') + '</div>' +
            '</div>' +
            '</section>'
        );
    },
};

TemplateRegistry.addRenderer('card', CardTemplate);
