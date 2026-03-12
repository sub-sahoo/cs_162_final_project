var ToggleTemplate = {
    getDefaultCSS: function () {
        return {
            textFontSize: '1.15rem',
            textPadding: '1.75rem 2rem',
        };
    },

    render: function (frameData) {
        var config = mergeCSS(this.getDefaultCSS(), frameData.config);
        var vars = {
            '--toggle-text-font-size': config.textFontSize,
            '--toggle-text-padding': config.textPadding,
        };
        var style = convertCSSVariablesToString(vars);

        var question = frameData.title || frameData.question || '';
        var subtitle = frameData.subtitle ? '<p class="frame-card-subtitle">' + frameData.subtitle + '</p>' : '';
        var optionA = frameData.toggleOptionA || 'Factor applied';
        var optionB = frameData.toggleOptionB || 'Actual';
        var factorKey = frameData.factorKey || 'NE';

        var html =
            '<section class="frame frame-toggle frame-card" style="' + style + '" data-factor-key="' + factorKey + '">' +
            '<div class="frame-content frame-card-content">' +
            '<div class="frame-toggle-text">' +
            (question ? '<h2 class="frame-card-title frame-toggle-question">' + question + '</h2>' : '') +
            '<p class="frame-toggle-label">Select:</p>' +
            '<div class="frame-toggle-buttons">' +
            '<button type="button" class="frame-toggle-btn frame-toggle-btn-factor" data-value="factor" aria-pressed="true">' + optionA + '</button>' +
            '<button type="button" class="frame-toggle-btn frame-toggle-btn-actual" data-value="actual" aria-pressed="false">' + optionB + '</button>' +
            '</div>' + subtitle
            '</div>' +
            '</div>'
            '</section>';

        return html;
    },
};

TemplateRegistry.addRenderer('toggle', ToggleTemplate);
