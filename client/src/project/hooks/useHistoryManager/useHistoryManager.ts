import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addHistoryItem } from '../../historySlice';

export default function useHistoryManager() {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname) {
      dispatch(addHistoryItem(`${pathname}${search}`));
    }
  }, [pathname, search]);
}
