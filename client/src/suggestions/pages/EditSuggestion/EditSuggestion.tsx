import type { SuggestionResponse } from '@t/response';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../auth/hooks';
import { DelayChildren, Error404 } from '../../../components';
import { FormLayout } from '../../../layouts';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import { CreateOrUpdate } from '../../components';
import { useSuggestionDetail } from '../../hooks';

export default function EditSuggestion() {
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

  // TODO: Don't allow regular users to edit suggestions if it's out of
  // 'suggestion' status.
  if (
    !Object.entries(suggestion).length
    || (suggestion.userId !== userId && role !== 'admin')
  ) {
    return <Error404 />;
  }

  return (
    <>
      <Helmet>
        <title>{`New suggestion - ${APP_NAME}`}</title>
      </Helmet>
      <FormLayout
        goBackProps={{
          href: routes.suggestions.detail(suggestion.slug),
        }}
      >
        <CreateOrUpdate suggestion={suggestion} />
      </FormLayout>
    </>
  );
}
