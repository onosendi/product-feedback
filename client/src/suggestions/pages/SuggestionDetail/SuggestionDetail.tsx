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
  Error404,
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

  if (isFetching) {
    // TODO
    return (
      <DelayChildren>
        <p>Loading...</p>
      </DelayChildren>
    );
  }

  if (!Object.entries(suggestion).length) {
    return <Error404 />;
  }

  return (
    <>
      <Helmet>
        <title>{`Suggestion detail - ${APP_NAME}`}</title>
      </Helmet>
      <AuthBar className={cx(styles.authBar)} />
      <Container className={cx(styles.container)}>
        <div className={cx(styles.goBackAndEditFeedbackWrapper)}>
          <GoBack href={routes.suggestions.list} shade="dark" />
          {(suggestion.id === userId || role === 'admin') && (
            <Button href={routes.suggestions.edit(suggestion.slug)} variant="2">
              Edit Feedback
            </Button>
          )}
        </div>
        <div className={cx(styles.detailWrapper)}>
          <SuggestionsItem data={suggestion} link={false} />
        </div>
        <ListComments suggestionId={suggestion.id} />
        <CreateComment suggestionId={suggestion.id} />
      </Container>
    </>
  );
}
