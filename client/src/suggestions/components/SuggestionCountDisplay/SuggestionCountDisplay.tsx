import type { TypeOrUndefined } from '@t/props';
import cx from 'clsx';
import { useSelector } from 'react-redux';
import { useQuerystring } from '../../../hooks';
import { pluralize } from '../../../lib/utils';
import { selectSuggestionCount } from '../../api';
import styles from './SuggestionCountDisplay.module.scss';

interface SuggestionCountDisplayProps {
  className: TypeOrUndefined;
}

export default function SuggestionCountDisplay({
  className,
}: SuggestionCountDisplayProps) {
  const { querystring } = useQuerystring();

  // TODO: better selector
  const { data } = useSelector(selectSuggestionCount(querystring));
  const suggestionCount = data?.length;
  const suggestionText = pluralize('Suggestion', suggestionCount || 0);

  return (
    <p className={cx('type-jost-bold', styles.text, className)}>
      {`${suggestionCount || ''} ${suggestionText}`}
    </p>
  );
}
