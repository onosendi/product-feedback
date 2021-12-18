import cx from 'clsx';
import { Paper } from '../../../components';
import routes from '../../../lib/routes';
import styles from './SuggestionsItem.module.scss';
import { capitalize } from '../../../lib/utils';

interface SuggestionsItemProps {
  // TODO
  data: any;
  forRoadmap?: boolean;
  link?: boolean;
  showComments?: boolean;
}

export default function SuggestionsItem({
  data,
  forRoadmap = false,
  link = true,
  showComments = true,
}: SuggestionsItemProps) {
  const responsive = !forRoadmap;

  return (
    <>
      <Paper
        className={cx(
          styles.link,
          responsive && styles.responsive,
          forRoadmap && styles.status,
          forRoadmap && styles[`status${data.status}`],
        )}
        component={link ? 'a' : 'div'}
        href={routes.suggestions.detail(data.slug)}
      >
        <article>
          <h2 className={cx('type-3', styles.heading, responsive && styles.responsive)}>
            {data.title}
          </h2>
          <p className={cx('type-body1', styles.description)}>{data.description}</p>
          {forRoadmap && (
            <p
              className={cx(
                'type-jost',
                styles.status,
                styles.statusText,
                styles[data.status],
              )}
            >
              {capitalize(data.status)}
            </p>
          )}
          <span className={cx('type-body3', styles.category)}>{data.category}</span>
          {showComments && (
            <span
              className={cx(
                'type-jost-bold',
                styles.comments,
                responsive && styles.responsive,
                data.comments === '0' && styles.noComments,
              )}
            >
              <span className={cx(styles.commentsIcon, responsive && styles.responsive)} />
              {data.comments}
            </span>
          )}
        </article>
      </Paper>
      {/* <Vote */}
      {/*   className={cx(styles.vote, responsive && styles.responsive)} */}
      {/*   id={data.id} */}
      {/*   responsive={responsive} */}
      {/* /> */}
    </>
  );
}
