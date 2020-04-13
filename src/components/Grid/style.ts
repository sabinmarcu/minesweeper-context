import styled from "@emotion/styled";

export const Grid = styled.section<{
  rows: number;
  columns: number;
  padding?: number;
}>(
  `
    display: grid;
    background: white;
    justify-content: center;
    align-content: center;
    max-width: 100vw;
    max-height: 100vh;
    & > * {
      background: black;
      padding-bottom: 100%;
    }
  `,
  ({ rows, columns, padding = 10 }) => ({
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridGap: padding,
    padding
  })
);

export default Grid;
