import { Helmet } from 'react-helmet-async';
import { FormLayout } from '../../../layouts';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import { CreateOrUpdate } from '../../components';

export default function CreateSuggestion() {
  return (
    <>
      <Helmet>
        <title>{`New suggestion - ${APP_NAME}`}</title>
      </Helmet>
      <FormLayout
        goBackProps={{
          href: routes.suggestions.list,
        }}
      >
        <CreateOrUpdate />
      </FormLayout>
    </>
  );
}
