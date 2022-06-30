import { useSearch } from '@tanstack/react-location';
import { useQuery } from 'react-query';

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

  return useQuery<ExtractFnReturnType<QueryFnType<Entry>>>({
    ...config,
    queryKey: [queryKeyName, searchData.pageNumber, searchData.pageSize],
    queryFn: () => searchPagination<SearchPaginationDTO, Entry>(url, searchData, searchFilter),
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
