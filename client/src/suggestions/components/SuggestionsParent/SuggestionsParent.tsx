import cx from 'clsx';
import { Button, Paper } from '../../../components';
import routes from '../../../lib/routes';
import styles from './SuggestionsParent.module.scss';
import { SuggestionsChild } from '..';

export default function SuggestionsParent() {
  // TODO
  const suggestions: any[] = [];

  if (!suggestions.length) {
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
