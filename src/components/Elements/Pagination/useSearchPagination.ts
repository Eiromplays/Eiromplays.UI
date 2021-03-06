import { useSearch } from '@tanstack/react-location';
import { useQuery, QueryKey } from '@tanstack/react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib';
import { DefaultLocationGenerics } from '@/providers';
import { BaseEntry, PaginationFilter, PaginationResponse, SearchFilter } from '@/types';

export const searchPagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
>(
  url: string,
  data: SearchPaginationDTO,
  searchFilter?: SearchFilter
): Promise<PaginationResponse<Entry>> => {
  data = setSearchFilter<SearchPaginationDTO>(data, searchFilter);
  return axios.post(url, data);
};

export type QueryFnType<Entry extends BaseEntry | any> = (
  ...args: any
) => Promise<PaginationResponse<Entry>>;

export type UseSearchPaginationProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any,
  TQueryKey extends QueryKey = QueryKey
> = {
  queryKeyName: TQueryKey;
  url: string;
  searchData: SearchPaginationDTO;
  config?: QueryConfig<QueryFnType<Entry>>;
};

export const useSearchPagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any,
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics,
  TQueryKey extends QueryKey = QueryKey
>({
  queryKeyName,
  url,
  searchData,
  config = { keepPreviousData: true, staleTime: 5000 },
}: UseSearchPaginationProps<SearchPaginationDTO, Entry, TQueryKey>) => {
  const { searchFilter } = useSearch<TGenerics>();

  return useQuery<ExtractFnReturnType<QueryFnType<Entry>>>({
    queryKey: queryKeyName?.concat(searchData.pageNumber, searchData.pageSize),
    queryFn: () => searchPagination<SearchPaginationDTO, Entry>(url, searchData, searchFilter),
    ...config,
  });
};

export const setSearchFilter = <SearchPaginationDTO extends PaginationFilter>(
  searchData: SearchPaginationDTO,
  searchFilter?: SearchFilter
) => {
  searchData.advancedSearch = searchFilter?.advancedSearch;
  searchData.orderBy = searchFilter?.orderBy;
  searchData.keyword = searchFilter?.keyword;

  return searchData;

  /* TODO: Revert changes when custom properties are supported
  console.log(searchFilter?.customProperties);

  searchFilter?.customProperties?.forEach((property) => {
    console.log(property);
    if (!property || !property.name || !property.value) return;

    try {
      console.log(searchData, property.name, property.value);
      (searchData as any)[property.name] = property.value;
    } catch (_) {
      // ignore :)
    }
  });

  return searchData;*/
};
