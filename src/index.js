/**
 * Color Picker JS
 * A lightweight, customizable color picker component for web applications
 * 
 * @author Eko Salvinus
 * @version 1.0.0
 */

import ColorPicker from './components/ColorPicker';
import * as colorUtils from './utils/color-utils';

// Export the ColorPicker class as default
export default ColorPicker;

// Export utility functions
export { colorUtils };

// For browser environments, attach to window
if (typeof window !== 'undefined') {
  window.ColorPicker = ColorPicker;
}