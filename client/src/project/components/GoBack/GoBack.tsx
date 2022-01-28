import cx from 'clsx';
import { useSelector } from 'react-redux';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { usePreviousPage } from '../../hooks';
import routes from '../../routes';
import { selectHistory } from '../../slice';
import styles from './GoBack.module.scss';

interface GoBackProps {
  className?: string;
  shade: 'light' | 'dark';
}

export default function GoBack({
  className,
  shade,
}: GoBackProps) {
  const navigate = useNavigate();
  const history = useSelector(selectHistory);
  const previousValidPage = usePreviousPage();
  const previousPage = history[history.length - 2] || routes.index;

  const exclude = [
    routes.index,
    routes.auth.login,
    routes.user.register,
  ];

  const goBack = () => {
    navigate(-1);
  };

  const commonProps = {
    className: cx(
      'type-4',
      styles.goBack,
      styles[shade],
      className,
    ),
  };

  if (exclude.includes(previousPage)) {
    return (
      <ReactRouterLink to={previousValidPage} {...commonProps}>
        Go Back
      </ReactRouterLink>
    );
  }

  return (
    <button onClick={goBack} {...commonProps} type="button">Go Back</button>
  );
}
