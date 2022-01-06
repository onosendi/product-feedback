import type { DBSuggestionStatus } from '@t/database';
import type { RoadmapResponse } from '@t/response';
import cx from 'clsx';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Container, DelayChildren, GoBack } from '../../../components';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import { useGetRoadmapQuery } from '../../api';
import { SuggestionsChild } from '../../components';
import styles from './Roadmap.module.scss';

type ShowStatusState = Omit<DBSuggestionStatus, 'suggestion'>;

export default function Roadmap() {
  const [showStatus, setShowStatus] = useState<ShowStatusState>('planned');
  const {
    data: roadmap = {} as RoadmapResponse,
    isFetching,
  } = useGetRoadmapQuery();

  const isPlanned = showStatus === 'planned';
  const isInProgress = showStatus === 'in-progress';
  const isLive = showStatus === 'live';

  const plannedHeading = `Planned (${roadmap.planned?.length})`;
  const inProgressHeading = `In-Progress (${roadmap['in-progress']?.length})`;
  const liveHeading = `Live (${roadmap.live?.length})`;

  const mobileNavButtons = [
    { status: 'planned', text: 'Planned', show: isPlanned },
    { status: 'in-progress', text: 'In Progress', show: isInProgress },
    { status: 'live', text: 'Live', show: isLive },
  ];

  if (isFetching) {
    // TODO
    return (
      <DelayChildren>
        <p>Loading...</p>
      </DelayChildren>
    );
  }

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
        {/* <div className={cx(isPlanned && styles.showColumn)}> */}
        {/*   <h2 className={cx('type-jost-bold', styles.columnHeader)}> */}
        {/*     {plannedHeading} */}
        {/*   </h2> */}
        {/*   <p className={cx('type-jost', styles.columnDescription)}>Ideas prioritized for research</p> */}
        {/*   <SuggestionsChild suggestions={roadmap.planned} /> */}
        {/* </div> */}
        {/* <div className={cx(isInProgress && styles.showColumn)}> */}
        {/*   <h2 className={cx('type-jost-bold', styles.columnHeader)}> */}
        {/*     {inProgressHeading} */}
        {/*   </h2> */}
        {/*   <p className={cx('type-jost', styles.columnDescription)}>Currently being developed</p> */}
        {/*   <SuggestionsChild suggestions={roadmap['in-progress']} /> */}
        {/* </div> */}
        {/* <div className={cx(isLive && styles.showColumn)}> */}
        {/*   <h2 className={cx('type-jost-bold', styles.columnHeader)}> */}
        {/*     {liveHeading} */}
        {/*   </h2> */}
        {/*   <p className={cx('type-jost', styles.columnDescription)}>Released features</p> */}
        {/*   <SuggestionsChild suggestions={roadmap.live} /> */}
        {/* </div> */}
      </Container>
    </>
  );
}
