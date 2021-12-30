import cx from 'clsx';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/auth/hooks';
import type { RootState } from 'src/lib/store';
import { selectSuggestionById } from 'src/suggestions/slice';
import { useCreateVoteMutation, useDeleteVoteMutation } from 'src/votes/api';
import { Button } from '../../../components';
import routes from '../../../lib/routes';
import styles from './Vote.module.scss';

interface VoteProps {
  className?: string | null;
  id: string;
  responsive?: boolean;
}

export default function Vote({
  className = null,
  id,
  responsive = true,
}: VoteProps) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const { isAuthenticated } = useAuth();

  const [createVote] = useCreateVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();

  const suggestion = useSelector((state: RootState) => selectSuggestionById(state, id));
  const hasVoted = suggestion?.hasVoted;
  const votes = suggestion?.votes;

  const onClick = () => {
    if (!isAuthenticated) {
      navigate(routes.auth.login, {
        state: { path: pathname + search },
      });
      return;
    }

    const func = hasVoted ? deleteVote : createVote;
    func(id);
  };

  return (
    <Button
      className={cx(
        'type-jost-bold',
        styles.button,
        hasVoted && styles.hasVoted,
        responsive && styles.responsive,
        className,
      )}
      onClick={onClick}
      selected={hasVoted}
      variant="5"
    >
      {votes}
    </Button>
  );
}
