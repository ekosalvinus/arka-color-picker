# Color Picker JS

A lightweight, customizable color picker component for web applications.

## Installation

```bash
npm install color-picker-js
```

or using yarn:

```bash
yarn add color-picker-js
```

## Features

- Simple and lightweight color picker
- Multiple color format support (HEX, RGB, HSL)
- Customizable UI
- Easy to embed in any website
- No dependencies

## Usage

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>Color Picker Example</title>
  <link rel="stylesheet" href="node_modules/color-picker-js/dist/color-picker.css">
</head>
<body>
  <div id="color-picker"></div>

  <script src="node_modules/color-picker-js/dist/color-picker.min.js"></script>
  <script>
    const colorPicker = new ColorPicker({
      container: '#color-picker',
      color: '#ff0000',
      onChange: function(color) {
        console.log('Color changed:', color);
      }
    });
  </script>
</body>
</html>
```

### Using with module bundlers

```javascript
import ColorPicker from 'color-picker-js';
import 'color-picker-js/dist/color-picker.css';

const colorPicker = new ColorPicker({
  container: '#color-picker',
  color: '#ff0000',
  onChange: function(color) {
    console.log('Color changed:', color);
  }
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| container | String or Element | null | Container element or selector (required) |
| color | String | '#ff0000' | Initial color in hex format |
| showHex | Boolean | true | Show/hide hex input |
| showRgb | Boolean | true | Show/hide RGB inputs |
| showHsl | Boolean | false | Show/hide HSL inputs |
| onChange | Function | null | Callback function called when color changes |

## API

### Methods

#### getColor()

Get the current color in multiple formats.

```javascript
const color = colorPicker.getColor();
console.log(color.hex); // '#ff0000'
console.log(color.rgb); // {r: 255, g: 0, b: 0}
console.log(color.hsl); // {h: 0, s: 100, l: 50}
```

#### setColor(color)

Set the current color.

```javascript
// Set using hex
colorPicker.setColor('#00ff00');

// Set using hex without #
colorPicker.setColor('00ff00');
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License