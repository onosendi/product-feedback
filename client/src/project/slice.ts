import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

type InitialState = {
  history: string[],
};

const initialState: InitialState = {
  history: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addHistory: (state, { payload: item }) => {
      const s = state;
      const hist = s.history;
      s.history = [...hist.length >= 10 ? hist.slice(1) : hist, item];
    },
  },
});

export const { addHistory } = projectSlice.actions;

export function selectHistory(state: RootState) {
  return state.project.history;
}

export default projectSlice.reducer;
