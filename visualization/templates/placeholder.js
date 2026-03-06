var PlaceholderTemplate = {
    getDefaultCSS: function () {
        return {
            titleFontSize: '2.5rem',
            subtitleFontSize: '1.1rem',
        };
    },

    render: function (frameData) {
        var config = mergeCSS(this.getDefaultCSS(), frameData.config);
        var vars = {
            '--placeholder-title-font-size': config.titleFontSize,
            '--placeholder-subtitle-font-size': config.subtitleFontSize,
        };
        var style = convertCSSVariablesToString(vars);
        var wage = (frameData.wage != null) ? frameData.wage.toFixed(2) : '0.00';
        return (
            '<section class="frame frame-placeholder" style="' + style + '">' +
            '<div class="frame-content">' +
            '<h1>' + (frameData.title || 'Frame') + '</h1>' +
            '<p>$' + wage + '</p>' +
            '</div>' +
            '</section>'
        );
    },
};

TemplateRegistry.addRenderer('placeholder', PlaceholderTemplate);
