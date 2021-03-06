import cx from 'clsx';
import { FeedbackList } from '..';
import { Button, DelayChildren, Paper } from '../../../project/components';
import Loader from '../../../project/components/Loader';
import { useQuerystring } from '../../../project/hooks';
import routes from '../../../project/routes';
import { useGetSuggestionsQuery } from '../../api';
import styles from './Feedback.module.scss';

export default function Feedback() {
  const { querystring } = useQuerystring();

  const {
    data: feedback = [],
    isFetching,
  } = useGetSuggestionsQuery(querystring);

  if (isFetching) {
    return (
      <DelayChildren>
        <Loader className={cx(styles.loader)} />
      </DelayChildren>
    );
  }

  if (!feedback.length) {
    return (
      <Paper className={cx(styles.noFeedback)}>
        <h3 className={cx('type-1', styles.noFeedbackHeading)}>
          There is no feedback yet.
        </h3>
        <p className={cx('type-body1', styles.noFeedbackBody)}>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
        <Button href={routes.feedback.create} prependPlus variant="1">
          Add Feedback
        </Button>
      </Paper>
    );
  }

  return <FeedbackList feedback={feedback} />;
}
