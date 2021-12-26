import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/lib/constants';
import { CreateOrUpdate } from 'src/suggestions/components';
import { FormLayout } from '../../../layouts';

export default function CreateSuggestion() {
  return (
    <>
      <Helmet>
        <title>{`Suggestions - ${APP_NAME}`}</title>
      </Helmet>
      <FormLayout>
        <CreateOrUpdate />
      </FormLayout>
    </>
  );
}
