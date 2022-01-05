import type { SuggestionResponse } from '@t/response';
import cx from 'clsx';
import { useMemo } from 'react';
import { Link, Paper } from '../../../components';
import routes from '../../../lib/routes';
import { useGetRoadmapQuery } from '../../api';
// import { selectRoadmapInfo } from '../../redux/feedbackSlice';
import styles from './RoadmapInfo.module.scss';

const roadmapMap = [
  { title: 'Planned', key: 'planned' },
  { title: 'In-Progress', key: 'in-progress' },
  { title: 'Live', key: 'live' },
];

export default function RoadmapInfo() {
  const {
    data: roadmap = [] as SuggestionResponse[],
  } = useGetRoadmapQuery();

  const reducer = (
    acc: Record<string, number>,
    { status }: { status: string },
  ) => (!acc[status]
    ? { ...acc, [status]: 1 }
    : { ...acc, [status]: acc[status] + 1 });

  const roadmapCount = useMemo(() => roadmap.reduce(reducer, {}), [roadmap]);

  return (
    <Paper aria-label="road map" className={cx(styles.nav)} component="nav">
      <h2 className={cx('type-jost-bold', styles.heading)}>Roadmap</h2>

      <Link
        className={cx('type-body3', styles.viewLink)}
        href={routes.roadmap.list}
      >
        View
      </Link>
      <dl className={cx(styles.list)}>
        {roadmapMap.map((item) => (
          <div className={cx(styles[`${item.key}Bullet`])} key={item.key}>
            <dt className={cx('type-jost')}>{item.title}</dt>
            <dd className={cx('type-jost-bold')}>
              {roadmapCount[item.key] || 0}
            </dd>
          </div>
        ))}
      </dl>
    </Paper>
  );
}
