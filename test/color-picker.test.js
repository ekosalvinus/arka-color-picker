import { rgbToHex, hexToRgb, rgbToHsl, hslToRgb } from '../src/utils/color-utils';

describe('Color Utils', () => {
  describe('rgbToHex', () => {
    it('converts RGB to HEX correctly', () => {
      expect(rgbToHex(255, 0, 0)).toBe('ff0000');
      expect(rgbToHex(0, 255, 0)).toBe('00ff00');
      expect(rgbToHex(0, 0, 255)).toBe('0000ff');
      expect(rgbToHex(255, 255, 255)).toBe('ffffff');
    });

    it('handles out of range values', () => {
      expect(rgbToHex(300, -10, 128)).toBe('ff0080');
    });
  });

  describe('hexToRgb', () => {
    it('converts HEX to RGB correctly', () => {
      expect(hexToRgb('ff0000')).toEqual([255, 0, 0]);
      expect(hexToRgb('00ff00')).toEqual([0, 255, 0]);
      expect(hexToRgb('0000ff')).toEqual([0, 0, 255]);
      expect(hexToRgb('ffffff')).toEqual([255, 255, 255]);
    });

    it('handles HEX with # prefix', () => {
      expect(hexToRgb('#ff0000')).toEqual([255, 0, 0]);
    });

    it('handles shorthand HEX format', () => {
      expect(hexToRgb('f00')).toEqual([255, 0, 0]);
      expect(hexToRgb('#f00')).toEqual([255, 0, 0]);
    });
  });

  describe('rgbToHsl', () => {
    it('converts RGB to HSL correctly', () => {
      expect(rgbToHsl(255, 0, 0)).toEqual([0, 1, 0.5]);
      expect(rgbToHsl(0, 255, 0)).toEqual([120, 1, 0.5]);
      expect(rgbToHsl(0, 0, 255)).toEqual([240, 1, 0.5]);
    });

    it('handles grayscale colors', () => {
      expect(rgbToHsl(128, 128, 128)).toEqual([0, 0, 0.5019607843137255]);
    });
  });

  describe('hslToRgb', () => {
    it('converts HSL to RGB correctly', () => {
      expect(hslToRgb(0, 1, 0.5)).toEqual([255, 0, 0]);
      expect(hslToRgb(120, 1, 0.5)).toEqual([0, 255, 0]);
      expect(hslToRgb(240, 1, 0.5)).toEqual([0, 0, 255]);
    });

    it('handles grayscale colors', () => {
      expect(hslToRgb(0, 0, 0.5)).toEqual([128, 128, 128]);
    });
  });
});