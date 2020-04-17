import styled from '@emotion/styled';
import { ThemeType } from '../config/theme';

export const Center = styled.div<{ theme: ThemeType }>(
  `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    flex: 1;
    & > * {
      width: 100%;
    }
  `,
  ({ theme }) => ({
    background: theme.background || 'white',
  }),
);

export default Center;
