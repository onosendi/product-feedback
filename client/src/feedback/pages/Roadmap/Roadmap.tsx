import type { RoadmapResponse, RoadmapStatusResponseKeys } from '@t/response';
import cx from 'clsx';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthBar } from '../../../auth/components';
import {
  Button,
  Container,
  DelayChildren,
  GoBack,
} from '../../../project/components';
import Loader from '../../../project/components/Loader';
import { APP_NAME } from '../../../project/constants';
import routes from '../../../project/routes';
import { useGetRoadmapQuery } from '../../api';
import { RoadmapItem } from '../../components';
import styles from './Roadmap.module.scss';

export default function Roadmap() {
  const [showStatus, setShowStatus] = useState<RoadmapStatusResponseKeys>('planned');

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
    return (
      <DelayChildren>
        <Loader fullscreen />
      </DelayChildren>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Roadmap - ${APP_NAME}`}</title>
      </Helmet>
      <AuthBar />
      <Container
        className={cx(styles.header)}
        component="header"
        wrapperClassName={cx(styles.headerWrapper)}
      >
        <h1 className={cx('type-1', styles.heading)}>Roadmap</h1>
        <Button
          className={cx(styles.addFeedbackButton)}
          href={routes.feedback.create}
          prependPlus
          variant="1"
        >
          Add Feedback
        </Button>
        <GoBack className={cx(styles.goBack)} shade="light" />
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
            onClick={() => {
              setShowStatus(button.status as RoadmapStatusResponseKeys);
            }}
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
          feedback={normalizedRoadmap.planned}
        />
        <RoadmapItem
          description="Currently being developed"
          heading={inProgressHeading}
          showColumn={isInProgress}
          feedback={normalizedRoadmap['in-progress']}
        />
        <RoadmapItem
          description="Released features"
          heading={liveHeading}
          showColumn={isLive}
          feedback={normalizedRoadmap.live}
        />
      </Container>
    </>
  );
}
