import React, { useState } from "react";
import "./styles.css";

import Grid from "./components/Grid";
import Box from "./components/Box";
import { Center } from "./components/Layout";

import { CombineContexts } from "./utils/combine";
import { GameProvider } from "./stores/game";
import { ActionsProvider } from "./stores/actions";

export default function App() {
  const [rows, setRows] = useState(16);
  const [columns, setColumns] = useState(30);
  const [bombs, setBombs] = useState(99);
  return (
    <Center>
      <div>
        <input
          type="number"
          placeholder="Rows"
          value={rows}
          onChange={({ target: { value } }) => setRows(parseInt(value, 10))}
        />
        <input
          type="number"
          placeholder="Columns"
          value={columns}
          onChange={({ target: { value } }) => setColumns(parseInt(value, 10))}
        />
        <input
          type="number"
          placeholder="Bombs"
          value={bombs}
          onChange={({ target: { value } }) => setBombs(parseInt(value, 10))}
        />
      </div>
      <CombineContexts
        contexts={[ActionsProvider, [GameProvider, { rows, columns, bombs }]]}
      >
        <Grid {...{ rows, columns }}>
          {new Array(rows)
            .fill(0)
            .map((it, index) => index)
            .map(row =>
              new Array(columns)
                .fill(0)
                .map((it, index) => index)
                .map(column => (
                  <Box
                    key={`${row}:${column}`}
                    coordinate={{ y: row, x: column }}
                  />
                ))
            )}
        </Grid>
      </CombineContexts>
    </Center>
  );
}
