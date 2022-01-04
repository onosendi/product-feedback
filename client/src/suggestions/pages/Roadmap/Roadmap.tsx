import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { Button, Container, GoBack } from '../../../components';
import { APP_NAME } from '../../../lib/constants';
import routes from '../../../lib/routes';
import styles from './Roadmap.module.scss';

export default function Roadmap() {
  return (
    <>
      <Helmet>
        <title>{`New suggestion - ${APP_NAME}`}</title>
      </Helmet>
      <Container
        className={cx(styles.header)}
        component="header"
        wrapperClassName={cx(styles.headerWrapper)}
      >
        <h1 className={cx('type-1', styles.heading)}>Roadmap</h1>
        <Button
          className={cx(styles.addFeedbackButton)}
          href={routes.suggestions.create}
          prependPlus
          variant="1"
        >
          Add Feedback
        </Button>
        <GoBack
          className={cx(styles.goBack)}
          href={routes.suggestions.list}
          shade="light"
        />
      </Container>
      <Container
        className={cx(styles.statusButtonContainer)}
        component="nav"
        wrapperClassName={cx(styles.statusButtonWrapper)}
      >
        Foo
      </Container>
      <Container
        className={cx(styles.statusColumns)}
        component="main"
      >
        Foo
      </Container>
    </>
  );
}
