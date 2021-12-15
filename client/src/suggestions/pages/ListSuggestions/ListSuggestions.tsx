import { Helmet } from 'react-helmet-async';
import AuthBar from '../../../auth/components/AuthBar';
import { APP_NAME } from '../../../lib/constants';

export default function ListSuggestions() {
  return (
    <>
      <Helmet>
        <title>{`Suggestions - ${APP_NAME}`}</title>
      </Helmet>
      <AuthBar />
    </>
  );
}
