import { useParams } from 'react-router-dom';
import { useGetSuggestionDetailQuery } from '../../api';

export default function useSuggestionDetail() {
  const { slug } = useParams();
  const result = useGetSuggestionDetailQuery(slug);
  return result;
}
