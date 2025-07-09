import { rgbToHex, hexToRgb, rgbToHsl, hslToRgb } from '../utils/color-utils';
import '../styles/color-picker.css';

/**
 * ColorPicker class - Creates a customizable color picker component
 */
class ColorPicker {
  /**
   * Create a new ColorPicker
   * @param {Object} options - Configuration options
   * @param {string} options.container - Element or selector for the container
   * @param {string} [options.color='#ff0000'] - Initial color (hex)
   * @param {boolean} [options.showHex=true] - Show hex input
   * @param {boolean} [options.showRgb=true] - Show RGB inputs
   * @param {boolean} [options.showHsl=false] - Show HSL inputs
   * @param {Function} [options.onChange] - Color change callback
   */
  constructor(options) {
    this.options = Object.assign({
      container: null,
      color: '#ff0000',
      showHex: true,
      showRgb: true,
      showHsl: false,
      onChange: null
    }, options);

    // Validate options
    if (!this.options.container) {
      throw new Error('Container element or selector is required');
    }

    // Get container element
    if (typeof this.options.container === 'string') {
      this.container = document.querySelector(this.options.container);
      if (!this.container) {
        throw new Error(`Container element "${this.options.container}" not found`);
      }
    } else {
      this.container = this.options.container;
    }

    // Current color value
    this._color = this.options.color;
    
    // Initialize the color picker
    this._init();
  }

  /**
   * Initialize the color picker
   * @private
   */
  _init() {
    this.container.classList.add('color-picker-container');
    
    // Create color picker elements
    this._createColorPicker();
    
    // Set initial color
    this.setColor(this._color);
  }

  /**
   * Create the color picker DOM elements
   * @private
   */
  _createColorPicker() {
    // Canvas for color gradient
    this.canvas = document.createElement('canvas');
    this.canvas.width = 250;
    this.canvas.height = 150;
    this.canvas.classList.add('color-picker-canvas');
    this.container.appendChild(this.canvas);
    
    // Color preview
    this.preview = document.createElement('div');
    this.preview.classList.add('color-picker-preview');
    this.container.appendChild(this.preview);
    
    // Controls container
    this.controls = document.createElement('div');
    this.controls.classList.add('color-picker-controls');
    this.container.appendChild(this.controls);

    // Create color inputs based on options
    if (this.options.showHex) {
      this._createHexInput();
    }
    
    if (this.options.showRgb) {
      this._createRgbInputs();
    }
    
    if (this.options.showHsl) {
      this._createHslInputs();
    }
    
    // Initialize canvas
    this._initCanvas();
  }

  /**
   * Initialize the color picker canvas
   * @private
   */
  _initCanvas() {
    const ctx = this.canvas.getContext('2d');
    
    // Draw color gradient
    const gradientH = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradientH.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradientH.addColorStop(1/6, 'rgba(255, 255, 0, 1)');
    gradientH.addColorStop(2/6, 'rgba(0, 255, 0, 1)');
    gradientH.addColorStop(3/6, 'rgba(0, 255, 255, 1)');
    gradientH.addColorStop(4/6, 'rgba(0, 0, 255, 1)');
    gradientH.addColorStop(5/6, 'rgba(255, 0, 255, 1)');
    gradientH.addColorStop(1, 'rgba(255, 0, 0, 1)');
    
    ctx.fillStyle = gradientH;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw black to transparent gradient
    const gradientV = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradientV.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradientV.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradientV.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradientV.addColorStop(1, 'rgba(0, 0, 0, 1)');
    
    ctx.fillStyle = gradientV;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Add event listeners
    this.canvas.addEventListener('click', this._handleCanvasClick.bind(this));
    this.canvas.addEventListener('mousemove', this._handleCanvasMouseMove.bind(this));
    this.canvas.addEventListener('mousedown', this._handleCanvasMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this._handleCanvasMouseUp.bind(this));
  }

  /**
   * Handle canvas click event
   * @private
   * @param {MouseEvent} e - Click event
   */
  _handleCanvasClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this._pickColorFromCanvas(x, y);
  }

  /**
   * Mouse move handler
   * @private
   */
  _handleCanvasMouseMove(e) {
    if (this._isDragging) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this._pickColorFromCanvas(x, y);
    }
  }

  /**
   * Mouse down handler
   * @private
   */
  _handleCanvasMouseDown() {
    this._isDragging = true;
  }

  /**
   * Mouse up handler
   * @private
   */
  _handleCanvasMouseUp() {
    this._isDragging = false;
  }

  /**
   * Pick color from canvas at x,y position
   * @private
   */
  _pickColorFromCanvas(x, y) {
    const ctx = this.canvas.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `#${rgbToHex(pixel[0], pixel[1], pixel[2])}`;
    this.setColor(color);
  }

  /**
   * Create hex input
   * @private
   */
  _createHexInput() {
    const hexContainer = document.createElement('div');
    hexContainer.classList.add('color-picker-hex-container');
    
    const hexLabel = document.createElement('label');
    hexLabel.textContent = 'Hex:';
    
    this.hexInput = document.createElement('input');
    this.hexInput.type = 'text';
    this.hexInput.classList.add('color-picker-hex');
    this.hexInput.addEventListener('change', () => {
      let value = this.hexInput.value;
      if (!value.startsWith('#')) {
        value = '#' + value;
      }
      this.setColor(value);
    });
    
    hexContainer.appendChild(hexLabel);
    hexContainer.appendChild(this.hexInput);
    this.controls.appendChild(hexContainer);
  }

  /**
   * Create RGB inputs
   * @private
   */
  _createRgbInputs() {
    const rgbContainer = document.createElement('div');
    rgbContainer.classList.add('color-picker-rgb-container');
    
    // Create R, G, B inputs
    const labels = ['R', 'G', 'B'];
    this.rgbInputs = [];
    
    labels.forEach(label => {
      const container = document.createElement('div');
      
      const labelEl = document.createElement('label');
      labelEl.textContent = label;
      
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 0;
      input.max = 255;
      input.addEventListener('change', () => this._updateColorFromRgb());
      
      this.rgbInputs.push(input);
      
      container.appendChild(labelEl);
      container.appendChild(input);
      rgbContainer.appendChild(container);
    });
    
    this.controls.appendChild(rgbContainer);
  }

  /**
   * Create HSL inputs
   * @private
   */
  _createHslInputs() {
    const hslContainer = document.createElement('div');
    hslContainer.classList.add('color-picker-hsl-container');
    
    // Create H, S, L inputs
    const labels = ['H', 'S', 'L'];
    const maxValues = [360, 100, 100];
    this.hslInputs = [];
    
    labels.forEach((label, index) => {
      const container = document.createElement('div');
      
      const labelEl = document.createElement('label');
      labelEl.textContent = label;
      
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 0;
      input.max = maxValues[index];
      input.addEventListener('change', () => this._updateColorFromHsl());
      
      this.hslInputs.push(input);
      
      container.appendChild(labelEl);
      container.appendChild(input);
      hslContainer.appendChild(container);
    });
    
    this.controls.appendChild(hslContainer);
  }

  /**
   * Update color from RGB inputs
   * @private
   */
  _updateColorFromRgb() {
    const r = parseInt(this.rgbInputs[0].value) || 0;
    const g = parseInt(this.rgbInputs[1].value) || 0;
    const b = parseInt(this.rgbInputs[2].value) || 0;
    
    const hex = `#${rgbToHex(r, g, b)}`;
    this.setColor(hex, 'rgb');
  }

  /**
   * Update color from HSL inputs
   * @private
   */
  _updateColorFromHsl() {
    const h = parseInt(this.hslInputs[0].value) || 0;
    const s = parseInt(this.hslInputs[1].value) || 0;
    const l = parseInt(this.hslInputs[2].value) || 0;
    
    const rgb = hslToRgb(h, s / 100, l / 100);
    const hex = `#${rgbToHex(rgb[0], rgb[1], rgb[2])}`;
    this.setColor(hex, 'hsl');
  }

  /**
   * Set color and update all controls
   * @param {string} color - Color in hex format
   * @param {string} [source] - Source of color change ('hex', 'rgb', 'hsl', 'canvas')
   */
  setColor(color, source = 'hex') {
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
      // Try to fix the color format
      if (/^[0-9A-F]{6}$/i.test(color)) {
        color = '#' + color;
      } else {
        console.warn('Invalid color format:', color);
        return;
      }
    }
    
    this._color = color;
    
    // Update preview
    this.preview.style.backgroundColor = color;
    
    // Update inputs if they exist
    this._updateInputs(source);
    
    // Trigger change event
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(this.getColor());
    }
  }

  /**
   * Update all inputs based on the current color
   * @private
   * @param {string} [source] - Source of color change ('hex', 'rgb', 'hsl', 'canvas')
   */
  _updateInputs(source) {
    const rgb = hexToRgb(this._color.substring(1));
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    
    // Update hex input
    if (this.options.showHex && source !== 'hex') {
      this.hexInput.value = this._color;
    }
    
    // Update RGB inputs
    if (this.options.showRgb && source !== 'rgb') {
      this.rgbInputs[0].value = rgb[0];
      this.rgbInputs[1].value = rgb[1];
      this.rgbInputs[2].value = rgb[2];
    }
    
    // Update HSL inputs
    if (this.options.showHsl && source !== 'hsl') {
      this.hslInputs[0].value = Math.round(hsl[0]);
      this.hslInputs[1].value = Math.round(hsl[1] * 100);
      this.hslInputs[2].value = Math.round(hsl[2] * 100);
    }
  }

  /**
   * Get current color
   * @return {Object} Color in different formats
   */
  getColor() {
    const hex = this._color;
    const rgb = hexToRgb(hex.substring(1));
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    
    return {
      hex,
      rgb: {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
      },
      hsl: {
        h: Math.round(hsl[0]),
        s: Math.round(hsl[1] * 100),
        l: Math.round(hsl[2] * 100)
      }
    };
  }
}

export default ColorPicker;