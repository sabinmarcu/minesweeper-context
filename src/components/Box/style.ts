import styled from "@emotion/styled";
import { Box as BoxType } from "../../stores/types";

export const Box = styled.div<{ box?: BoxType }>(
  `
    background: black;
    padding-bottom: 100%;
    cursor: pointer;
  `,
  ({ box }) =>
    box && {
      background: box.bomb ? "red" : "blue"
    }
);

export default Box;
