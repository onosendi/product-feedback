import type { SuggestionResponse } from '@t/response';
import cx from 'clsx';
import { useParams } from 'react-router-dom';
import { useAuth } from 'src/auth/hooks';
import { CreateComment } from 'src/comments/components';
import { Button, Container, GoBack } from 'src/components';
import routes from 'src/lib/routes';
import { useGetSuggestionDetailQuery } from 'src/suggestions/api';
import SuggestionsItem from '../SuggestionsItem';
import styles from './SuggestionDetailParent.module.scss';

export default function SuggestionDetailParent() {
  const { slug } = useParams();
  const { role, userId } = useAuth();
  const {
    data: suggestion = {} as SuggestionResponse,
    isFetching,
  } = useGetSuggestionDetailQuery(slug);

  if (!Object.entries(suggestion).length && !isFetching) {
    // TODO
    return <p>Not found</p>;
  }

  return (
    <>
      <Container className={cx(styles.container)}>
        <div className={cx(styles.goBackAndEditFeedbackWrapper)}>
          <GoBack shade="dark" />
          {(!isFetching && (suggestion.id === userId || role === 'admin')) && (
            <Button href={routes.suggestions.edit(suggestion.slug)} variant="2">
              Edit Feedback
            </Button>
          )}
        </div>
        <div className={cx(styles.detailWrapper)}>
          {isFetching
            // TODO: Loading spinner
            ? <p>Loading</p>
            : (
              <SuggestionsItem data={suggestion} link={false} />
            )}
        </div>
        {!isFetching && <CreateComment suggestionId={suggestion.id} />}
      </Container>
    </>
  );
}
