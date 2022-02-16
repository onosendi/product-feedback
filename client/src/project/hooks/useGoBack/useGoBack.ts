import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { selectHistory, setHistory } from '../../historySlice';

export default function useGoBack() {
  const navigate = useNavigate();
  const history = useSelector(selectHistory);
  const dispatch = useDispatch();

  const exclude = [
    routes.auth.login,
    routes.user.register,
  ];

  return () => {
    const currentPage = history[history.length - 1];

    let previousPage = '';
    for (let i = history.length - 1; i >= 0; i -= 1) {
      const current = history[i];
      if (current !== currentPage && !exclude.includes(current)) {
        previousPage = current;
        break;
      }
    }

    const lastIndex = history.lastIndexOf(previousPage);
    const newHistory = history.slice(0, lastIndex);

    dispatch(setHistory(newHistory));

    navigate(previousPage || routes.feedback.list);
  };
}
