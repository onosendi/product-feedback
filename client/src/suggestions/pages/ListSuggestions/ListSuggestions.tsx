import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import AuthBar from '../../../auth/components/AuthBar';
import { Button, Container } from '../../../components';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import { Header, RoadmapInfo, SuggestionsParent } from '../../components';
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
            {/* <FilterRequests /> */}
            <RoadmapInfo />
          </aside>
        </Container>
        <main>
          <Container
            className={cx(styles.sortBarContainer)}
            wrapperClassName={cx(styles.sortBarWrapper)}
          >
            {/* <SuggestionsCounter className={cx(styles.suggestionsCounter)} /> */}
            {/* <SortByFilter> */}
            {/*   <SelectItem value="votes-desc">Most Upvotes</SelectItem> */}
            {/*   <SelectItem value="votes-asc">Least Upvotes</SelectItem> */}
            {/*   <SelectItem value="comments-desc">Most Comments</SelectItem> */}
            {/*   <SelectItem value="comments-asc">Least Comments</SelectItem> */}
            {/* </SortByFilter> */}
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
            <SuggestionsParent />
          </Container>
        </main>
      </Container>
    </>
  );
}
