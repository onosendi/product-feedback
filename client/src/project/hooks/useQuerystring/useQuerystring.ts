import { useSearchParams } from 'react-router-dom';

export default function useQuerystring() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyValueMap: { [key: string]: string[] } = {};
  searchParams.forEach((value, key) => {
    if (!keyValueMap[key]) {
      keyValueMap[key] = [];
    }
    keyValueMap[key] = [...keyValueMap[key], value];
  });

  return {
    map: keyValueMap,
    querystring: searchParams.toString(),
    searchParams,
    setSearchParams,
  };
}
