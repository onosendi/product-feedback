import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

type InitialState = string[];

const initialState: InitialState = [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryItem: (state, { payload: item }) => [
      ...state.length >= 10 ? state.slice(1) : state,
      item,
    ],
    setHistory: (state, { payload: newHistoryArray }) => newHistoryArray,
  },
});

export const { addHistoryItem, setHistory } = historySlice.actions;

export function selectHistory(state: RootState) {
  return state.history;
}

export default historySlice.reducer;
