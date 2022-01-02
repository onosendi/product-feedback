import type { SuggestionResponse } from '@t/response';
import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { AuthBar } from '../../../auth/components';
import { useAuth } from '../../../auth/hooks';
import { CreateComment, ListComments } from '../../../comments/components';
import {
  Button,
  Container,
  DelayChildren,
  GoBack,
} from '../../../components';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import { SuggestionsItem } from '../../components';
import { useSuggestionDetail } from '../../hooks';
import styles from './SuggestionDetail.module.scss';

export default function SuggestionDetail() {
  const { role, userId } = useAuth();
  const {
    data: suggestion = {} as SuggestionResponse,
    isFetching,
  } = useSuggestionDetail();

  const suggestionExists = !!Object.entries(suggestion).length;

  if (!suggestionExists && !isFetching) {
    // TODO
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
