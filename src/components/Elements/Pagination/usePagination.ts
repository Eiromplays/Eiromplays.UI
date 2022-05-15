import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib';
import { PaginationFilter, PaginationResponse } from '@/types';

import { BaseEntry } from '../Table';

export type SearchPaginationDTO = PaginationFilter;

export const searchPagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
>(
  url: string,
  data: SearchPaginationDTO
): Promise<PaginationResponse<Entry>> => {
  return axios.post(url, data);
};

type QueryFnType = typeof searchPagination;

export type UseSearchPaginationOptions<SearchPaginationDTO extends PaginationFilter> = {
  queryKeyName: string;
  url: string;
  searchData: SearchPaginationDTO;
  config?: QueryConfig<QueryFnType>;
};

export const useSearchPagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
>({
  queryKeyName,
  url,
  searchData,
  config = { keepPreviousData: true, staleTime: 5000 },
}: UseSearchPaginationOptions<SearchPaginationDTO>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeyName, searchData.pageNumber, searchData.pageSize],
    queryFn: () => searchPagination<SearchPaginationDTO, Entry>(url, searchData),
  });
};
