import type { TypeOrUndefined } from '@t/props';
import cx from 'clsx';
import { useQuerystring } from '../../../hooks';
import { pluralize } from '../../../lib/utils';
import { useGetSuggestionsQuery } from '../../api';
import styles from './SuggestionCountDisplay.module.scss';

interface SuggestionCountDisplayProps {
  className: TypeOrUndefined;
}

export default function SuggestionCountDisplay({
  className,
}: SuggestionCountDisplayProps) {
  const { querystring } = useQuerystring();

  const { data: suggestions } = useGetSuggestionsQuery(querystring);
  const suggestionCount = suggestions?.length;
  const suggestionText = pluralize('Suggestion', suggestionCount || 0);

  return (
    <p className={cx('type-jost-bold', styles.text, className)}>
      {`${suggestionCount || 0} ${suggestionText}`}
    </p>
  );
}
