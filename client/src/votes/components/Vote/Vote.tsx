import cx from 'clsx';
import { useCreateVoteMutation, useDeleteVoteMutation } from 'src/votes/api';
import { Button } from '../../../components';
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
  const [createVote] = useCreateVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();
  const hasVoted = true;

  const onClick = () => {
    // if (!user.id) {
    //   router.push(routes.auth.login);
    //   return;
    // }

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
      0
    </Button>
  );
}
