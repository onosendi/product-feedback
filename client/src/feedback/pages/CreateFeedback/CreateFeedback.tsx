import { Helmet } from 'react-helmet-async';
import { APP_NAME } from '../../../project/constants';
import { FormLayout } from '../../../project/layouts';
import { CreateOrUpdate } from '../../components';

export default function CreateFeedback() {
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
