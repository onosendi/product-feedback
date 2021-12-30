import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { AuthBar } from 'src/auth/components';
import { APP_NAME } from 'src/lib/constants';
import { SuggestionDetailParent } from 'src/suggestions/components';
import styles from './SuggestionDetail.module.scss';

export default function SuggestionDetail() {
  return (
    <>
      <Helmet>
        <title>{`Suggestion detail - ${APP_NAME}`}</title>
      </Helmet>
      <AuthBar className={cx(styles.authBar)} />
      <SuggestionDetailParent />
    </>
  );
}
