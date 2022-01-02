import type { SuggestionResponse } from '@t/response';
import { Helmet } from 'react-helmet-async';
import { FormLayout } from '../../../layouts';
import { APP_NAME } from '../../../lib/constants';
import { CreateOrUpdate } from '../../components';
import { useSuggestionDetail } from '../../hooks';

export default function EditSuggestion() {
  const {
    data: suggestion = {} as SuggestionResponse,
    isFetching,
  } = useSuggestionDetail();

  // TODO: don't allow non owners to visit this page either
  if (!Object.entries(suggestion).length && !isFetching) {
    return <p>Not found</p>;
  }

  return (
    <>
      <Helmet>
        <title>{`New suggestion - ${APP_NAME}`}</title>
      </Helmet>
      <FormLayout>
        <CreateOrUpdate suggestion={suggestion} />
      </FormLayout>
    </>
  );
}
