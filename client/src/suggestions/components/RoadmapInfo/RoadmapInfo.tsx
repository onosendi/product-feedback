import cx from 'clsx';
import { Link, Paper } from '../../../components';
import routes from '../../../lib/routes';
import { useGetRoadmapQuery } from '../../api';
import { useRoadmapInfo } from '../../hooks';
import styles from './RoadmapInfo.module.scss';

const roadmapMap = [
  { title: 'Planned', key: 'planned' },
  { title: 'In-Progress', key: 'in-progress' },
  { title: 'Live', key: 'live' },
];

export default function RoadmapInfo() {
  const {
    data: roadmapSuggestions = {} as any,
  } = useGetRoadmapQuery();

  const count = {} as any;

  const foo = useRoadmapInfo(roadmapSuggestions);

  console.log(foo);

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
              {count[item.key]}
            </dd>
          </div>
        ))}
      </dl>
    </Paper>
  );
}
