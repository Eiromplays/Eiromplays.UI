import { useNavigate, useSearch } from '@tanstack/react-location';
import React from 'react';

import { queryClient } from '@/lib';
import { DefaultLocationGenerics } from '@/providers';
import { BaseEntity, PaginationFilter, PaginationResponse } from '@/types';

import {
  searchPagination,
  useSearchPagination,
  UseSearchPaginationProps,
} from './useSearchPagination';

export type UsePaginationControlsProps<SearchPaginationDTO extends PaginationFilter> =
  UseSearchPaginationProps<SearchPaginationDTO> & {
    onPageChanged?: (page: number) => void;
    onPageSizeChanged?: (pageSize: number) => void;
    prefetchNextPage?: boolean;
  };

export const usePaginationControls = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntity | any,
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>({
  searchData,
  queryKeyName,
  url,
  config,
  onPageChanged,
  onPageSizeChanged,
  prefetchNextPage = true,
}: UsePaginationControlsProps<SearchPaginationDTO>) => {
  const searchPaginationQuery = useSearchPagination<SearchPaginationDTO, Entry>({
    queryKeyName: queryKeyName,
    url: url,
    searchData: searchData,
    config: config,
  });
  const navigate = useNavigate<TGenerics>();
  const { pagination } = useSearch<TGenerics>();

  const paginationResponse = searchPaginationQuery.data as PaginationResponse<Entry>;

  const { totalPages, currentPage: page } = paginationResponse;

  const currentPage = pagination?.index ?? 1;
  const currentSize = pagination?.size ?? 10;

  React.useEffect(() => {
    if (prefetchNextPage && paginationResponse.hasNextPage) {
      const prefetchSearchData = { ...searchData };
      const prefetchPage = currentPage + 1;
      prefetchSearchData.pageNumber = prefetchPage;
      queryClient.prefetchQuery([queryKeyName, prefetchPage, prefetchSearchData.pageSize], () =>
        searchPagination(url, prefetchSearchData)
      );
    }
  }, [prefetchNextPage, paginationResponse, queryKeyName, searchData, url, currentPage]);

  const NextPage = () => {
    if (!paginationResponse.hasNextPage) return;
    SetPage(page + 1);
  };

  const PreviousPage = () => {
    if (!paginationResponse.hasPreviousPage) return;
    SetPage(page - 1);
  };

  const SetPage = (newPage: number) => {
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
    if (onPageChanged) onPageChanged(newPage);
  };

  const SetPageSize = (newPageSize: number) => {
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
    if (onPageSizeChanged) onPageSizeChanged(newPageSize);
  };

  return {
    NextPage,
    PreviousPage,
    SetPage,
    SetPageSize,
    currentPage,
    currentSize,
    totalPages,
    paginationResponse,
  };
};
