import type { SuggestionResponse } from '@t/response';
import cx from 'clsx';
import { useParams } from 'react-router-dom';
import { useAuth } from 'src/auth/hooks';
import { Button, Container, GoBack } from 'src/components';
import routes from 'src/lib/routes';
import { useGetSuggestionDetailQuery } from 'src/suggestions/api';
import SuggestionsItem from '../SuggestionsItem';
import styles from './SuggestionDetailParent.module.scss';

export default function SuggestionDetailParent() {
  const { slug } = useParams();
  const { role, userId } = useAuth();
  const {
    data: detail = {} as SuggestionResponse,
    isFetching,
  } = useGetSuggestionDetailQuery(slug);

  if (!Object.entries(detail).length && !isFetching) {
    // TODO
    return <p>Not found</p>;
  }

  return (
    <>
      <Container className={cx(styles.container)}>
        <div className={cx(styles.goBackAndEditFeedbackWrapper)}>
          <GoBack shade="dark" />
          {(!isFetching && (detail.id === userId || role === 'admin')) && (
            <Button href={routes.suggestions.edit(detail.slug)} variant="2">
              Edit Feedback
            </Button>
          )}
        </div>
        <div className={cx(styles.detailWrapper)}>
          {isFetching
            // TODO: Loading spinner
            ? <p>Loading</p>
            : (
              <SuggestionsItem data={detail} link={false} />
            )}
        </div>
      </Container>
    </>
  );
}
