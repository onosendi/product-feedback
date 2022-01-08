import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addHistory } from '../../slice';

export default function useHistoryManager() {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname) {
      dispatch(addHistory(`${pathname}${search}`));
    }
  }, [pathname, search]);
}
