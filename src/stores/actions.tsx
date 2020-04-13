import React, { useState, useCallback, createContext, useContext } from "react";

import { Coordinate, Action, Actions } from "./types";

export type ActionsContextType = {
  actions: Action[];
  addAction: (coordinate: Coordinate, action: Actions) => void;
};

export const ActionsContext = createContext<ActionsContextType>({
  actions: [],
  addAction: () => {}
});

export const ActionsProvider: React.FC = ({ children }) => {
  const [actions, setActions] = useState<Action[]>([]);
  const addAction = useCallback(
    (coordinate: Coordinate, action: Actions) =>
      setActions(list => [...list, { coordinate, action }]),
    [setActions]
  );

  return (
    <ActionsContext.Provider value={{ actions, addAction }}>
      {children}
    </ActionsContext.Provider>
  );
};

export const useAction = (coordinate: Coordinate) => {
  const { addAction } = useContext(ActionsContext);
  const onClick = useCallback(
    e => {
      e.preventDefault();
      const isRightMB =
        ("which" in e && e.wich === 3) ||
        ("button" in e && e.button === 2) ||
        false;
      addAction(
        coordinate,
        isRightMB ? Actions.RIGHT_CLICK : Actions.LEFT_CLICK
      );
    },
    [addAction, coordinate]
  );
  return { onClick, onContextMenu: onClick };
};

export const useActions = () => {
  const { actions } = useContext(ActionsContext);
  return actions;
};
