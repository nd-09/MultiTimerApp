import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Timer = {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  category: string;
  status: 'Running' | 'Paused' | 'Completed';
};

export type HistoryEntry = {
  name: string;
  time: string;
};

type TimerState = {
  timers: Timer[];
  history: HistoryEntry[];
};

type TimerAction =
  | { type: 'LOAD_TIMERS'; payload: Timer[] }
  | { type: 'LOAD_HISTORY'; payload: HistoryEntry[] }
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: Timer }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'RESET_TIMERS' }
  | { type: 'ADD_HISTORY'; payload: HistoryEntry };

const initialState: TimerState = {
  timers: [],
  history: [],
};

function reducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'LOAD_TIMERS':
      return { ...state, timers: action.payload };
    case 'LOAD_HISTORY':
      return { ...state, history: action.payload };
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(t => t.id === action.payload.id ? action.payload : t),
      };
    case 'DELETE_TIMER':
      return { ...state, timers: state.timers.filter(t => t.id !== action.payload) };
    case 'RESET_TIMERS':
      return { ...state, timers: [] };
    case 'ADD_HISTORY':
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
}

interface TimerProviderProps {
  children: ReactNode;
}

interface TimerContextType {
  state: TimerState;
  dispatch: Dispatch<TimerAction>;
}

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const timers = await AsyncStorage.getItem('timers');
      const history = await AsyncStorage.getItem('history');
      if (timers) dispatch({ type: 'LOAD_TIMERS', payload: JSON.parse(timers) });
      if (history) dispatch({ type: 'LOAD_HISTORY', payload: JSON.parse(history) });
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('timers', JSON.stringify(state.timers));
  }, [state.timers]);

  useEffect(() => {
    AsyncStorage.setItem('history', JSON.stringify(state.history));
  }, [state.history]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};