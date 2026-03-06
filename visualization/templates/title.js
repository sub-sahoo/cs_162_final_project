var TitleTemplate = {
    getDefaultCSS: function () {
        return {
            imageHeight: '45vh',
            titleFontSize: '100px',
            subtitleFontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
            attributionFontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
        };
    },

    render: function (frameData) {
        var config = mergeCSS(this.getDefaultCSS(), frameData.config);
        var vars = {
            '--title-image-height': config.imageHeight,
            '--title-font-size': config.titleFontSize,
            '--title-subtitle-font-size': config.subtitleFontSize,
            '--title-attribution-font-size': config.attributionFontSize,
        };
        var style = convertCSSVariablesToString(vars);
        var img = frameData.image
            ? '<img class="frame-title-image" src="' + frameData.image + '" alt="">'
            : '';
        return (
            '<section class="frame frame-title" style="' + style + '">' +
            '<div class="frame-content frame-title-content">' +
            img +
            '<div class="frame-title-text">' +
            '<div class="frame-title-left">' +
            '<h1 class="title-main">' + (frameData.title || '') + '</h1>' +
            '<p class="title-subtitle">' + (frameData.subtitle || '') + '</p>' +
            '</div>' +
            '<p class="title-attribution">' + (frameData.attribution || '') + '</p>' +
            '</div>' +
            '</div>' +
            '</section>'
        );
    },
};

TemplateRegistry.addRenderer('title', TitleTemplate);
