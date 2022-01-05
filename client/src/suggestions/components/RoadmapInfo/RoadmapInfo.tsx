import type { RoadmapResponse } from '@t/response';
import cx from 'clsx';
import { Link, Paper } from '../../../components';
import routes from '../../../lib/routes';
import { useGetRoadmapQuery } from '../../api';
import styles from './RoadmapInfo.module.scss';

const roadmapMap: any = [
  { title: 'Planned', key: 'planned' },
  { title: 'In-Progress', key: 'in-progress' },
  { title: 'Live', key: 'live' },
];

export default function RoadmapInfo() {
  const {
    data: roadmap = {} as RoadmapResponse,
  } = useGetRoadmapQuery();

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
        {roadmapMap.map((item: any) => (
          <div className={cx(styles[`${item.key}Bullet`])} key={item.key}>
            <dt className={cx('type-jost')}>{item.title}</dt>
            <dd className={cx('type-jost-bold')}>
              {/* @ts-ignore TODO */}
              {roadmap[item.key]?.length || 0}
            </dd>
          </div>
        ))}
      </dl>
    </Paper>
  );
}
