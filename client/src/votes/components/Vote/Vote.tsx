import cx from 'clsx';
import { useSelector } from 'react-redux';
import { selectFeedbackById } from '../../../feedback/slice';
import { Button } from '../../../project/components';
import { useNeedsAuthentication } from '../../../auth/hooks';
import type { RootState } from '../../../project/store';
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
  const needsAuthentication = useNeedsAuthentication();

  const [createVote] = useCreateVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();

  const feedback = useSelector((state: RootState) => (
    selectFeedbackById(state, id)));
  const hasVoted = feedback?.hasVoted;
  const votes = feedback?.votes;

  const onClick = () => {
    const func = hasVoted ? deleteVote : createVote;
    needsAuthentication(() => {
      func(id);
    });
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
