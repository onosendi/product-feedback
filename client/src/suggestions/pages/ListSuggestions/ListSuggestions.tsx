import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { AuthBar } from '../../../auth/components';
import { Button, Container, SelectItem } from '../../../components';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import {
  FilterCategories,
  Header,
  RoadmapInfo,
  SortFilter,
  SuggestionCountDisplay,
  SuggestionsParent,
} from '../../components';
import styles from './ListSuggestions.module.scss';

export default function ListSuggestions() {
  return (
    <>
      <Helmet>
        <title>{`Suggestions - ${APP_NAME}`}</title>
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
              href={routes.suggestions.create}
              prependPlus
              variant="1"
            >
              Add Feedback
            </Button>
          </Container>
          <Container wrapperClassName={cx(styles.requestsListWrapper)}>
            <SuggestionsParent />
          </Container>
        </main>
      </Container>
    </>
  );
}
