import { parseStyle } from './styleUtils';

describe('parseStyle', () => {
  it('should parse a simple style string', () => {
    const styleString = 'color: red; font-size: 16px;';
    const expected = {
      color: 'red',
      fontSize: '16px'
    };
    expect(parseStyle(styleString)).toEqual(expected);
  });

  it('should ignore invalid styles', () => {
    const styleString = 'color: red; invalidStyle';
    const expected = {
      color: 'red'
    };
    expect(parseStyle(styleString)).toEqual(expected);
  });

  it('should handle empty string gracefully', () => {
    const styleString = '';
    expect(parseStyle(styleString)).toBeUndefined()
  });

  it('should handle undefined gracefully', () => {
    const styleString = undefined;
    expect(parseStyle(styleString)).toBeUndefined();
  });

  it('should trim spaces', () => {
    const styleString = ' color : blue; ';
    const expected = {
      color: 'blue'
    };
    expect(parseStyle(styleString)).toEqual(expected);
  });
});
