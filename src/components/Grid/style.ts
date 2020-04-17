import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import Color from 'color';
import { ThemeType } from '../../config/theme';

export const navSize = 50;
export const Nav = styled.nav<{ theme: ThemeType }>(
  `
    height: ${navSize}px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 7px;
  `,
  ({ theme }) => ({
    color: new Color(
      new Color(theme.background).isDark() ? 'white' : 'black',
    ).alpha(0.5).string(),
  }),
);

export const Item = styled(Button)(
  `
    flex: 0 0 ${navSize}px;
    width: ${navSize}px;
    color: inherit !important;
  `,
  ({ onClick }) => onClick && { cursor: 'pointer' },
);

export const Heading = styled.h1`
  text-align: center;
`;

export const Grid = styled.section<{ theme: ThemeType }>(
  `
    display: flex;
    background: white;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    touch-action: manipulation;
  `,
  ({ theme }) => ({
    background: theme.background || 'white',
  }),
);

export default Grid;
