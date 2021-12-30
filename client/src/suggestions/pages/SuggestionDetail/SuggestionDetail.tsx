import type { SuggestionResponse } from '@t/response';
import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { AuthBar } from 'src/auth/components';
import { useAuth } from 'src/auth/hooks';
import { CreateComment, ListComments } from 'src/comments/components';
import {
  Button,
  Container,
  DelayChildren,
  GoBack,
} from 'src/components';
import { APP_NAME } from 'src/lib/constants';
import routes from 'src/lib/routes';
import { useGetSuggestionDetailQuery } from 'src/suggestions/api';
import { SuggestionsItem } from 'src/suggestions/components';
import styles from './SuggestionDetail.module.scss';

export default function SuggestionDetail() {
  const { slug } = useParams();
  const { role, userId } = useAuth();
  const {
    data: suggestion = {} as SuggestionResponse,
    isFetching,
  } = useGetSuggestionDetailQuery(slug);

  const suggestionExists = !!Object.entries(suggestion).length;

  if (!suggestionExists && !isFetching) {
    return <p>Not found</p>;
  }

  return (
    <>
      <Helmet>
        <title>{`Suggestion detail - ${APP_NAME}`}</title>
      </Helmet>
      <AuthBar className={cx(styles.authBar)} />
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
            ? (
              <DelayChildren>
                <p>Loading...</p>
              </DelayChildren>
            )
            : <SuggestionsItem data={suggestion} link={false} />}
        </div>
        {(!isFetching && suggestionExists) && (
          <>
            <ListComments suggestionId={suggestion.id} />
            <CreateComment suggestionId={suggestion.id} />
          </>
        )}
      </Container>
    </>
  );
}
