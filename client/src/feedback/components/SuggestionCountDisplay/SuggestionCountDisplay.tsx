import cx from 'clsx';
import { useQuerystring } from '../../../project/hooks';
import { pluralize } from '../../../project/utils';
import { useGetSuggestionsQuery } from '../../api';
import styles from './SuggestionCountDisplay.module.scss';

type SuggestionCountDisplayProps = {
  className?: string,
};

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
