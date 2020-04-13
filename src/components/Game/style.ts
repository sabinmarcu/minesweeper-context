import styled from "@emotion/styled";

export const navSize = 50;
export const Nav = styled.nav`
  height: ${navSize}px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const Item = styled.nav(
  `
    flex: 0 0 ${navSize}px;
    width: ${navSize}px;
  `,
  ({ onClick }) => onClick && { cursor: "pointer" }
);

export const Heading = styled.h1`
  text-align: center;
`;
