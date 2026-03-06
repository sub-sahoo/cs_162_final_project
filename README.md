# cs_162_final_project

## How to View Visualization
Go [here](https://cs162finalproject.vercel.app) to view current state of visualization. 

# Frame Templates

Templates are defined in the `frames` array and rendered sequentially. Each template needs to implement `render(frameData)` and `getDefaultCSS()`.
    - `frameData` is used to configure what needs to be shown in the frame (e.g. text, images, etc.)

## Adding a new template

1. Create `templates/my-template.js`
2. Implement the interface:

```javascript
var MyTemplate = {
    getDefaultCSS: function () {
        return { /* CSS variable defaults */ };
    },
    render: function (frameData) {
        var config = mergeCSS(this.getDefaultCSS(), frameData.config);
        var vars = { '--my-var': config.myVar };
        var style = cssVarsString(vars);
        return '<section class="frame frame-my-template" style="' + style + '">...</section>';
    },
};
TemplateRegistry.register('my-template', MyTemplate);
```

3. Add CSS in `style.css` using `var(--my-var, fallback)`
4. Add `<script src="templates/my-template.js"></script>` to `index.html` (before `sketch.js`)
5. Use in `data/frames.js`: `{ template: 'my-template', ... }`

## Configurable parameters by template

Can add more to these if needed, but wanted to get a reasonable set produced first. Can always just manipulate the raw CSS as well.

| Template    | Config keys                    |
|------------|---------------------------------|
| title      | imageHeight, titleFontSize, subtitleFontSize, attributionFontSize |
| card       | imageMinHeight, textFontSize, textPadding |
| split      | imageWidth, textWidth, textFontSize, placeholderFontSize, imageMinHeight |
| placeholder| titleFontSize, subtitleFontSize |
