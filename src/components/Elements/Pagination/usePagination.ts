import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib';
import { PaginationFilter, PaginationResponse } from '@/types';

import { BaseEntry } from '../Table';

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

export type UsePaginationProps<SearchPaginationDTO extends PaginationFilter> = {
  queryKeyName: string;
  url: string;
  searchData: SearchPaginationDTO;
  config?: QueryConfig<QueryFnType>;
};

export const usePagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
>({
  queryKeyName,
  url,
  searchData,
  config = { keepPreviousData: true, staleTime: 5000 },
}: UsePaginationProps<SearchPaginationDTO>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeyName, searchData.pageNumber, searchData.pageSize],
    queryFn: () => searchPagination<SearchPaginationDTO, Entry>(url, searchData),
  });
};
