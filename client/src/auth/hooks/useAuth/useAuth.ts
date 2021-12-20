import { useSelector } from 'react-redux';
import { selectAuth } from '../../slice';

export default function useAuth() {
  return useSelector(selectAuth);
}
