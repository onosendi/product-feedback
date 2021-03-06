import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { AuthBar } from '../../../auth/components';
import { Button, Container, SelectItem } from '../../../project/components';
import { APP_NAME } from '../../../project/constants';
import routes from '../../../project/routes';
import {
  Feedback,
  FilterCategories,
  Header,
  RoadmapInfo,
  SortFilter,
  SuggestionCountDisplay,
} from '../../components';
import styles from './ListSuggestions.module.scss';

export default function ListSuggestions() {
  return (
    <>
      <Helmet>
        <title>{`Feedback - ${APP_NAME}`}</title>
      </Helmet>
      <AuthBar />
      <Container
        className={cx(styles.pageWrapper)}
        wrapperClassName={cx(styles.pageWrapperWrapper)}
      >
        <Container
          className={cx(styles.headerAndFilterControlWrapper)}
          wrapperClassName={cx(styles.headerAndFilterControlContainerWrapper)}
        >
          <Header />
          <aside className={cx(styles.filterAndRoadmapWrapper)}>
            <FilterCategories />
            <RoadmapInfo />
          </aside>
        </Container>
        <main>
          <Container
            className={cx(styles.sortBarContainer)}
            wrapperClassName={cx(styles.sortBarWrapper)}
          >
            <SuggestionCountDisplay className={cx(styles.suggestionsCounter)} />
            <SortFilter>
              <SelectItem value="votes-desc">Most Upvotes</SelectItem>
              <SelectItem value="votes-asc">Least Upvotes</SelectItem>
              <SelectItem value="comment_count-desc">Most Comments</SelectItem>
              <SelectItem value="comment_count-asc">Least Comments</SelectItem>
            </SortFilter>
            <Button
              className={cx(styles.addFeedbackButton)}
              href={routes.feedback.create}
              prependPlus
              variant="1"
            >
              Add Feedback
            </Button>
          </Container>
          <Container wrapperClassName={cx(styles.requestsListWrapper)}>
            <Feedback />
          </Container>
        </main>
      </Container>
    </>
  );
}
