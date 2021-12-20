import cx from 'clsx';
import { SuggestionsChild } from '..';
import { Button, Paper } from '../../../components';
import routes from '../../../lib/routes';
import { useGetSuggestionsQuery } from '../../api';
import styles from './SuggestionsParent.module.scss';

export default function SuggestionsParent() {
  // TODO: argument should be empty
  const { data: suggestions = [], isFetching } = useGetSuggestionsQuery('');

  // TODO: Loading spinner

  if (!suggestions.length && !isFetching) {
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

  return <SuggestionsChild suggestions={suggestions} />;
}
