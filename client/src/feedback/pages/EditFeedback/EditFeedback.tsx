import type { FeedbackResponse } from '@t/response';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks';
import { DelayChildren, Error404 } from '../../../components';
import { FormLayout } from '../../../layouts';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import { useGetFeedbackDetailQuery } from '../../api';
import { CreateOrUpdate } from '../../components';

export default function EditFeedback() {
  const { slug } = useParams<{ slug: any }>();
  const { role, userId } = useAuth();
  const {
    data: feedback = {} as FeedbackResponse,
    isFetching,
  } = useGetFeedbackDetailQuery(slug);

  if (isFetching) {
    // TODO
    return (
      <DelayChildren>
        <p>Loading...</p>
      </DelayChildren>
    );
  }

  // TODO: Don't allow regular users to edit feedback if it's out of
  // 'feedback' status.
  if (
    !Object.entries(feedback).length
    || (feedback.userId !== userId && role !== 'admin')
  ) {
    return <Error404 />;
  }

  return (
    <>
      <Helmet>
        <title>{`New feedback - ${APP_NAME}`}</title>
      </Helmet>
      <FormLayout>
        <CreateOrUpdate feedback={feedback} />
      </FormLayout>
    </>
  );
}
