import { useNavigate, useSearch } from '@tanstack/react-location';
import { QueryKey } from '@tanstack/react-query';
import React from 'react';

import { queryClient } from '@/lib';
import { DefaultLocationGenerics } from '@/providers';
import { BaseEntry, PaginationFilter, PaginationResponse } from '@/types';

import {
  searchPagination,
  useSearchPagination,
  UseSearchPaginationProps,
} from './useSearchPagination';

export type UsePaginationProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any,
  TQueryKey extends QueryKey = QueryKey
> = UseSearchPaginationProps<SearchPaginationDTO, Entry, TQueryKey> & {
  onPageChanged?: (page: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  shouldPrefetchNextPage?: boolean;
};

export const defaultPageSize = 10;
export const defaultPageIndex = 1;

export const usePagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any,
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics,
  TQueryKey extends QueryKey = QueryKey
>({
  searchData,
  queryKeyName,
  url,
  config,
  onPageChanged,
  onPageSizeChanged,
  shouldPrefetchNextPage = true,
}: UsePaginationProps<SearchPaginationDTO, Entry, TQueryKey>) => {
  const searchPaginationQuery = useSearchPagination<
    SearchPaginationDTO,
    Entry,
    TGenerics,
    TQueryKey
  >({
    queryKeyName: queryKeyName,
    url: url,
    searchData: searchData,
    config: config,
  });

  const navigate = useNavigate<TGenerics>();
  const { pagination, searchFilter } = useSearch<TGenerics>();

  const paginationResponse = searchPaginationQuery.data as PaginationResponse<Entry>;

  const { totalPages, currentPage: page } = paginationResponse;

  const currentPage = pagination?.index || defaultPageIndex;
  const currentSize = pagination?.size || defaultPageSize;

  React.useEffect(() => {
    const prefetchNextPage = async () => {
      if (!shouldPrefetchNextPage || !paginationResponse?.hasNextPage || currentPage == totalPages)
        return;

      const prefetchSearchData = { ...searchData };
      const prefetchPage = currentPage + 1;
      prefetchSearchData.pageNumber = prefetchPage;

      await queryClient.prefetchQuery({
        queryKey: queryKeyName?.concat(prefetchPage, prefetchSearchData.pageSize),
        queryFn: () =>
          searchPagination<SearchPaginationDTO, Entry>(url, prefetchSearchData, searchFilter),
      });
    };

    prefetchNextPage().catch(console.error);
  }, [
    shouldPrefetchNextPage,
    paginationResponse,
    queryKeyName,
    searchData,
    url,
    currentPage,
    searchFilter,
    totalPages,
  ]);

  const NextPage = () => {
    if (!paginationResponse.hasNextPage) return;
    SetPage(page + 1);
  };

  const PreviousPage = () => {
    if (!paginationResponse.hasPreviousPage) return;
    SetPage(page - 1);
  };

  const SetPage = React.useCallback(
    (newPage: number) => {
      if (newPage > totalPages) newPage = totalPages;

      if (newPage === currentPage) return;

      navigate({
        search: (old: any) => {
          return {
            ...old,
            pagination: {
              ...old?.pagination,
              index: newPage,
            },
          };
        },
        replace: true,
      });

      onPageChanged?.(newPage);
    },
    [currentPage, navigate, onPageChanged, totalPages]
  );

  const SetPageSize = React.useCallback(
    (newPageSize: number) => {
      if (newPageSize === currentSize) return;

      navigate({
        search: (old: any) => {
          return {
            ...old,
            pagination: {
              ...old?.pagination,
              size: newPageSize,
            },
          };
        },
        replace: true,
      });

      onPageSizeChanged?.(newPageSize);
    },
    [currentSize, navigate, onPageSizeChanged]
  );

  React.useEffect(() => {
    if (currentPage > totalPages) {
      SetPage(totalPages);
    }
  }, [currentPage, totalPages, SetPage]);

  return {
    NextPage,
    PreviousPage,
    SetPage,
    SetPageSize,
    currentPage,
    currentSize,
    totalPages,
    paginationResponse,
    isLoading: searchPaginationQuery.isLoading,
  };
};
