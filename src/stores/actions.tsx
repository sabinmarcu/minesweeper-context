import React, { useState, useCallback, createContext, useContext } from "react";

import { Coordinate, Action, Actions, BoxStates } from "../types";

export type ActionsContextType = {
  actions: Action[];
  addAction: (coordinate: Coordinate, action: Actions) => void;
  resetActions: () => void;
};

export const ActionsContext = createContext<ActionsContextType>({
  actions: [],
  addAction: () => {},
  resetActions: () => {}
});

export const ActionsProvider: React.FC = ({ children }) => {
  const [actions, setActions] = useState<Action[]>([]);
  const addAction = useCallback(
    (coordinate: Coordinate, action: Actions) =>
      setActions(list => [...list, { coordinate, action }]),
    [setActions]
  );
  const resetActions = useCallback(() => {
    console.log("❌ Resetting actions");
    setActions([]);
  }, [setActions]);

  return (
    <ActionsContext.Provider value={{ actions, addAction, resetActions }}>
      {children}
    </ActionsContext.Provider>
  );
};

const nop = (e: any) => {
  e.preventDefault();
  if (e.preventPropagation) {
    e.preventPropagation();
  }
  e.stopBubbling = true;
  return false;
};

const isTouch = (() => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
})();

export const useAction = (coordinate: Coordinate) => {
  const { addAction } = useContext(ActionsContext);
  const onTap = useCallback(
    e => {
      if (
        isTouch &&
        parseInt(e.target.dataset.state, 10) === BoxStates.UNCOVERED
      ) {
        addAction(coordinate, Actions.DBL_CLICK);
      } else {
        addAction(coordinate, Actions.LEFT_CLICK);
      }
      return nop(e);
    },
    [addAction, coordinate]
  );
  const onPress = useCallback(
    e => {
      addAction(coordinate, Actions.RIGHT_CLICK);
      return nop(e);
    },
    [addAction, coordinate]
  );
  const onDoubleTap = useCallback(
    e => {
      addAction(coordinate, Actions.DBL_CLICK);
      return nop(e);
    },
    [addAction, coordinate]
  );
  return { onTap, onContextMenu: onPress, onDoubleTap, onPress };
};

export const useActions = () => {
  const { actions } = useContext(ActionsContext);
  return actions;
};

export const useResetActions = () => {
  const { resetActions } = useContext(ActionsContext);
  return resetActions;
};
