import type { FeedbackResponse } from '@t/response';
import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { AuthBar } from '../../../auth/components';
import { useAuth } from '../../../auth/hooks';
import { CreateComment, ListComments } from '../../../comments/components';
import {
  Button,
  Container,
  DelayChildren,
  Error404,
  GoBack,
} from '../../../project/components';
import Loader from '../../../project/components/Loader';
import { APP_NAME } from '../../../project/constants';
import routes from '../../../project/routes';
import { useGetFeedbackDetailQuery } from '../../api';
import { FeedbackItem } from '../../components';
import styles from './FeedbackDetail.module.scss';

export default function FeedbackDetail() {
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

  if (!Object.entries(feedback).length) {
    return <Error404 />;
  }

  return (
    <>
      <Helmet>
        <title>{`Feedback detail - ${APP_NAME}`}</title>
      </Helmet>
      <AuthBar className={cx(styles.authBar)} />
      <Container className={cx(styles.container)}>
        <div className={cx(styles.goBackAndEditFeedbackWrapper)}>
          <GoBack shade="dark" />
          {
            (
              (
                feedback.userId === userId
                && !['planned', 'in-progress', 'live'].includes(feedback.status)
              )
              || role === 'admin'
            ) && (
              <Button href={routes.feedback.edit(feedback.slug)} variant="2">
                Edit Feedback
              </Button>
            )
          }
        </div>
        <div className={cx(styles.detailWrapper)}>
          <FeedbackItem data={feedback} link={false} />
        </div>
        <ListComments feedbackId={feedback.id} />
        <CreateComment feedbackId={feedback.id} />
      </Container>
    </>
  );
}
