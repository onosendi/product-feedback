import type { RoadmapCountResponseKeys, RoadmapResponse } from '@t/response';
import cx from 'clsx';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  Container,
  DelayChildren,
  GoBack,
} from '../../../components';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import { useGetRoadmapQuery } from '../../api';
import { RoadmapItem } from '../../components';
import styles from './Roadmap.module.scss';

export default function Roadmap() {
  const [showStatus, setShowStatus] = useState<RoadmapCountResponseKeys>('planned');
  const {
    data: roadmap = [] as RoadmapResponse[],
    isFetching,
  } = useGetRoadmapQuery();

  const reducer = (
    // TODO
    acc: any,
    item: RoadmapResponse,
  ) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    return { ...acc, [item.status]: [...acc[item.status], item] };
  };

  const normalizedRoadmap = useMemo(() => roadmap.reduce(reducer, {}), [roadmap]);

  const isPlanned = showStatus === 'planned';
  const isInProgress = showStatus === 'in-progress';
  const isLive = showStatus === 'live';

  const plannedHeading = `Planned (${normalizedRoadmap.planned?.length || 0})`;
  const inProgressHeading = `In-Progress (${normalizedRoadmap['in-progress']?.length || 0})`;
  const liveHeading = `Live (${normalizedRoadmap.live?.length || 0})`;

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
            onClick={() => { setShowStatus(button.status as RoadmapCountResponseKeys); }}
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
        <RoadmapItem
          description="Ideas prioritized for research"
          heading={plannedHeading}
          showColumn={isPlanned}
          suggestions={normalizedRoadmap.planned}
        />
        <RoadmapItem
          description="Currently being developed"
          heading={inProgressHeading}
          showColumn={isInProgress}
          suggestions={normalizedRoadmap['in-progress']}
        />
        <RoadmapItem
          description="Released features"
          heading={liveHeading}
          showColumn={isLive}
          suggestions={normalizedRoadmap.live}
        />
      </Container>
    </>
  );
}
