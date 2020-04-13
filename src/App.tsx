import React, { useMemo } from "react";
import "./styles.css";

import Error from "./components/Error";
import Game from "./components/Game";

export default function App() {
  const path = useMemo(() => window.location.pathname.split("/"), []);
  if (path.length > 5 || path.length < 4) {
    return <Error />;
  }
  return (
    <Game
      rows={parseInt(path[1], 10)}
      columns={parseInt(path[2], 10)}
      bombs={parseInt(path[3], 10)}
      debug={!!path[4]}
    />
  );
}
