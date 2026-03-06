/**
 * Template directory (factory). Maps template names to renderer implementations.
 */

var TemplateRegistry = {
    templateNameToRendererMap: {},

    addRenderer: function (templateName, renderer) {
        this.templateNameToRendererMap[templateName] = renderer;
    },

    getRenderer: function (name) {
        return this.templateNameToRendererMap[name] || this.templateNameToRendererMap['placeholder'];
    },
};
