import Color from 'color';

export const colors = {
  background: '#333745',

  eight: '#69140E',
  seven: '#A44200',
  six: '#D58936',
  five: '#FFF94F',
  four: '#768DEB',
  three: '#468189',
  two: '#7EA172',
  one: '#96939B',
  unknown: '#000000',
};

export const theme = {
  ...colors,
  backgroundLight: new Color(colors.background).lighten(0.3).hex(),
  backgroundDark: new Color(colors.background).darken(0.5).hex(),
};

export type ThemeType = typeof theme;

export const themeLight = Object.entries(theme)
  .reduce(
    (prev, [key, value]) => ({ ...prev, [key]: new Color(value).negate().hex() }),
    {},
  ) as ThemeType;

export default theme;
