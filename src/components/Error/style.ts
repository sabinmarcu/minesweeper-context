import styled from "@emotion/styled";

export const Wrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  max-width: 500px;
`;

export const Heading = styled.h1<{ large?: boolean }>`
  width: 100%;
  ${({ large }) => large && "font-size: 2.5rem;"}
`;

export const Description = styled.div<{ light?: boolean }>`
  width: 100%;
  color: ${({ light }) => (light ? "#ccc" : "#888")};
`;

const colors = ["darkred", "darkblue", "darkgreen", "purple"];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

export const TileWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 300px));
  justify-content: center;
  align-content: center;
  grid-gap: 20px;
`;

export const Tile = styled.a`
  display: block;
  color: white;
  flex: 1;
  padding-bottom: 100%;
  background: ${randomColor};
  position: relative;
`;

export const TileInner = styled.article`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
`;
