import cx from 'clsx';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks';
import { Button } from '../../../project/components';
import routes from '../../../project/routes';
import type { RootState } from '../../../project/store';
import { selectFeedbackById } from '../../../feedback/slice';
import { useCreateVoteMutation, useDeleteVoteMutation } from '../../api';
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

  const feedback = useSelector((state: RootState) => (
    selectFeedbackById(state, id)));
  const hasVoted = feedback?.hasVoted;
  const votes = feedback?.votes;

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
