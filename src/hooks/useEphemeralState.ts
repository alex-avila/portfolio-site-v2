import { useState, useCallback } from "react";

interface EphemeralStateEntry {
  key: string;
  default: string;
}

const getInitialState = (entries: EphemeralStateEntry[]) => () => {
  const map = new Map<string, string>();
  entries.forEach(entry => {
    map.set(entry.key, entry.default);
  });
  return map;
};

function useEphemeralState(entries: EphemeralStateEntry[], { duration = 800 }: { duration?: number } = {}) {
  const [state, setState] = useState(getInitialState(entries));

  // set alternative state then set it back to default state
  const setEphemeralState = useCallback(
    (key: string, stateName: string) => {
      const defaultState = state.get(key);

      if (typeof defaultState !== "string") {
        throw new Error(`Unknown key: ${key}`);
      }

      setState(prev => {
        const newState = new Map(prev);
        newState.set(key, stateName);
        return newState;
      });
      setTimeout(() => {
        setState(prev => {
          const newState = new Map(prev);
          newState.set(key, defaultState);
          return newState;
        });
      }, duration);
    },
    [state, duration],
  );

  return [state, setEphemeralState] as [typeof state, typeof setEphemeralState];
}

export default useEphemeralState;
