import { Helmet } from 'react-helmet-async';
import { FormLayout } from '../../../layouts';
import { APP_NAME } from '../../../lib/constants';
import { CreateOrUpdate } from '../../components';

export default function CreateSuggestion() {
  return (
    <>
      <Helmet>
        <title>{`New suggestion - ${APP_NAME}`}</title>
      </Helmet>
      <FormLayout>
        <CreateOrUpdate />
      </FormLayout>
    </>
  );
}
