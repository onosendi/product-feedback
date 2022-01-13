import type { FeedbackResponse } from '@t/response';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks';
import { DelayChildren, Error404 } from '../../../project/components';
import Loader from '../../../project/components/Loader';
import { APP_NAME } from '../../../project/constants';
import { FormLayout } from '../../../project/layouts';
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
    return (
      <DelayChildren>
        <Loader fullscreen />
      </DelayChildren>
    );
  }

  if (
    !Object.entries(feedback).length
    || (
      (feedback.userId !== userId || feedback.status !== 'suggestion')
      && role !== 'admin'
    )
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
