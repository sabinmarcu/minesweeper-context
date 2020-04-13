import styled from "@emotion/styled";

export const Center = styled.div`
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
`;
