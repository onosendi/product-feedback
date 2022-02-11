import { useSearchParams } from 'react-router-dom';
import type { URLSearchParamsInit } from 'react-router-dom';

export default function useQuerystring() {
  const [searchParams, setParams] = useSearchParams();

  const map: { [key: string]: string[] } = {};
  searchParams.forEach((value, key) => {
    if (!map[key]) {
      map[key] = [];
    }
    map[key] = [...map[key], value];
  });

  const setSearchParams = (
    nextInit: URLSearchParamsInit,
    navigateOptions?: {
      replace?: boolean | undefined,
      state?: any,
    } | undefined,
  ) => {
    const sortedMap = Object.entries(nextInit).reduce((acc, [key, arr]) => {
      const sorted = Array.isArray(arr)
        ? arr.sort((a: string, b: string) => a.localeCompare(b))
        : arr;
      return { ...acc, [key]: sorted };
    }, {});

    setParams(sortedMap, navigateOptions);
  };

  return {
    map,
    querystring: searchParams.toString(),
    searchParams,
    setSearchParams,
  };
}
