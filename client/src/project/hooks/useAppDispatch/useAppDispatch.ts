import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';

export default function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
