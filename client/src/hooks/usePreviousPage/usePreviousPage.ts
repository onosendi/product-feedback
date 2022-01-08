import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import routes from '../../lib/routes';
import { selectHistory } from '../../project/slice';

export default function usePreviousPage() {
  const history = useSelector(selectHistory);

  const exclude = [
    routes.index,
    routes.auth.login,
    routes.user.register,
  ];

  const previousPage = useMemo(() => {
    const currentPage = history[history.length - 1];
    const filter = (page: string) => page !== currentPage && !exclude.includes(page);
    return history.filter(filter).slice(-1)[0] || routes.index;
  }, [history]);

  return previousPage;
}
