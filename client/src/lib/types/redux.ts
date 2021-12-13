import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export type Dispatch = ThunkDispatch<{}, {}, AnyAction>;
