import React from "react";

import { Center } from "../Layout";
import {
  Wrapper,
  Heading,
  Description,
  TileWrapper,
  Tile,
  TileInner
} from "./style";

export const ErrorComponent = () => (
  <Center style={{ overflowY: "auto" }}>
    <Wrapper>
      <Heading large>Please use the proper URL Structure</Heading>
      <Description>
        <p>This app uses an URL structure to describe the game board.</p>
        <p>The structure is as follows</p>
        <code>
          <pre>/columns/rows/bombs[/debug]</pre>
        </code>
        <p>For example</p>
        <code>
          <pre>/30/60/99</pre>
        </code>
        <p>
          Would render the classical "Hard" mode of 30x16 columns with 99 bombs
        </p>
      </Description>
      <br />
      <br />
      <Heading>Try the following presets:</Heading>
    </Wrapper>
    <TileWrapper>
      <Tile to="/9/9/10">
        <TileInner>
          <Heading>Easy</Heading>
          <Description light>9x9 with 10 bombs</Description>
        </TileInner>
      </Tile>
      <Tile to="/16/16/40">
        <TileInner>
          <Heading>Medium</Heading>
          <Description light>16x16 with 40 bombs</Description>
        </TileInner>
      </Tile>
      <Tile to="/30/16/99">
        <TileInner>
          <Heading>Hard Mode</Heading>
          <Description light>30x16 with 99 bombs</Description>
        </TileInner>
      </Tile>
    </TileWrapper>
  </Center>
);

export default ErrorComponent;
