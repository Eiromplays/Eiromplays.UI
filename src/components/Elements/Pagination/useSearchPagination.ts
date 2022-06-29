import { useSearch } from '@tanstack/react-location';
import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib';
import { DefaultLocationGenerics } from '@/providers';
import { BaseEntry, PaginationFilter, PaginationResponse } from '@/types';

export const searchPagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
>(
  url: string,
  data: SearchPaginationDTO
): Promise<PaginationResponse<Entry>> => {
  return axios.post(url, data);
};

export type QueryFnType<Entry extends BaseEntry | any> = (
  ...args: any
) => Promise<PaginationResponse<Entry>>;

export type UseSearchPaginationProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
> = {
  queryKeyName: string;
  url: string;
  searchData: SearchPaginationDTO;
  config?: QueryConfig<QueryFnType<Entry>>;
};

export const useSearchPagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any,
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>({
  queryKeyName,
  url,
  searchData,
  config = { keepPreviousData: true, staleTime: 5000 },
}: UseSearchPaginationProps<SearchPaginationDTO, Entry>) => {
  const { searchFilter } = useSearch<TGenerics>();

  searchData.advancedSearch = searchFilter?.advancedSearch;
  searchData.orderBy = searchFilter?.orderBy;
  searchData.keyword = searchFilter?.keyword;

  try {
    searchFilter?.customFilters?.forEach((filter) => {
      (searchData as any)[filter.name] = filter.value;
    });
  } catch (_) {
    console.error(_);
  }

  return useQuery<ExtractFnReturnType<QueryFnType<Entry>>>({
    ...config,
    queryKey: [queryKeyName, searchData.pageNumber, searchData.pageSize],
    queryFn: () => searchPagination<SearchPaginationDTO, Entry>(url, searchData),
  });
};
