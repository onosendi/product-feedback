import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { AuthBar } from '../../../auth/components';
import { Button, Container, GoBack } from '../../../project/components';
import { APP_NAME } from '../../../project/constants';
import routes from '../../../project/routes';
import RoadmapList from '../../components/RoadmapList';
import styles from './Roadmap.module.scss';

export default function Roadmap() {
  return (
    <>
      <Helmet>
        <title>{`Roadmap - ${APP_NAME}`}</title>
      </Helmet>
      <AuthBar />
      <Container
        className={cx(styles.header)}
        component="header"
        wrapperClassName={cx(styles.headerWrapper)}
      >
        <h1 className={cx('type-1', styles.heading)}>Roadmap</h1>
        <Button
          className={cx(styles.addFeedbackButton)}
          href={routes.feedback.create}
          prependPlus
          variant="1"
        >
          Add Feedback
        </Button>
        <GoBack className={cx(styles.goBack)} shade="light" />
      </Container>
      <RoadmapList />
    </>
  );
}
