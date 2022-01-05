import type { DBSuggestionStatus } from '@t/database';
import cx from 'clsx';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Container, GoBack } from '../../../components';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import styles from './Roadmap.module.scss';

type ShowStatusState = Omit<DBSuggestionStatus, 'suggestion'>;

export default function Roadmap() {
  const [showStatus, setShowStatus] = useState<ShowStatusState>('planned');

  const mobileNavButtons = [
    { status: 'planned', text: 'Planned', show: showStatus === 'planned' },
    { status: 'in-progress', text: 'In Progress', show: showStatus === 'in-progress' },
    { status: 'live', text: 'Live', show: showStatus === 'live' },
  ];

  return (
    <>
      <Helmet>
        <title>{`New suggestion - ${APP_NAME}`}</title>
      </Helmet>
      <Container
        className={cx(styles.header)}
        component="header"
        wrapperClassName={cx(styles.headerWrapper)}
      >
        <h1 className={cx('type-1', styles.heading)}>Roadmap</h1>
        <Button
          className={cx(styles.addFeedbackButton)}
          href={routes.suggestions.create}
          prependPlus
          variant="1"
        >
          Add Feedback
        </Button>
        <GoBack
          className={cx(styles.goBack)}
          href={routes.suggestions.list}
          shade="light"
        />
      </Container>
      <Container
        className={cx(styles.statusButtonContainer)}
        component="nav"
        wrapperClassName={cx(styles.statusButtonWrapper)}
      >
        {mobileNavButtons.map((button) => (
          <button
            className={cx(
              'type-4',
              styles.statusButton,
              button.show && styles.statusButtonActive,
            )}
            key={button.status}
            onClick={() => { setShowStatus(button.status); }}
            type="button"
          >
            {button.text}
          </button>
        ))}
      </Container>
      <Container
        className={cx(styles.statusColumns)}
        component="main"
      >
        Foo
      </Container>
    </>
  );
}
