// Basic color picker example
const colorPickerBasic = new ColorPicker({
  container: '#color-picker-basic',
  color: '#3498db',
  onChange: function(color) {
    const preview = document.getElementById('preview-basic');
    preview.style.backgroundColor = color.hex;
    preview.textContent = color.hex;
  }
});

// Advanced color picker example with all options
const colorPickerAdvanced = new ColorPicker({
  container: '#color-picker-advanced',
  color: '#e74c3c',
  showHex: true,
  showRgb: true,
  showHsl: true,
  onChange: function(color) {
    const preview = document.getElementById('preview-advanced');
    preview.style.backgroundColor = color.hex;
    preview.textContent = color.hex;
    
    // Update color values display
    document.getElementById('color-values').textContent = 
      `HEX: ${color.hex}
RGB: rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})
HSL: hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
  }
});

// Initialize previews
document.getElementById('preview-basic').style.backgroundColor = colorPickerBasic.getColor().hex;
document.getElementById('preview-basic').textContent = colorPickerBasic.getColor().hex;

document.getElementById('preview-advanced').style.backgroundColor = colorPickerAdvanced.getColor().hex;
document.getElementById('preview-advanced').textContent = colorPickerAdvanced.getColor().hex;

// Update color values display
document.getElementById('color-values').textContent = 
  `HEX: ${colorPickerAdvanced.getColor().hex}
RGB: rgb(${colorPickerAdvanced.getColor().rgb.r}, ${colorPickerAdvanced.getColor().rgb.g}, ${colorPickerAdvanced.getColor().rgb.b})
HSL: hsl(${colorPickerAdvanced.getColor().hsl.h}, ${colorPickerAdvanced.getColor().hsl.s}%, ${colorPickerAdvanced.getColor().hsl.l}%)`;