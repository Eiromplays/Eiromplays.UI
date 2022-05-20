import React from 'react';

import { DefaultLocationGenerics } from '@/providers';
import { PaginationFilter, PaginationResponse } from '@/types';

import { Pagination } from '../Pagination';
import { useSearchPagination, UseSearchPaginationProps } from '../Pagination/useSearchPagination';
import { Spinner } from '../Spinner';

import { BaseEntry, Table, TableColumn } from './Table';

export type PaginatedTableProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
> = UseSearchPaginationProps<SearchPaginationDTO> & {
  columns: TableColumn<Entry>[];
};

export const PaginatedTable = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any,
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>({
  queryKeyName,
  url,
  searchData,
  config,
  columns,
}: PaginatedTableProps<SearchPaginationDTO, Entry>) => {
  const paginationQuery = useSearchPagination({
    queryKeyName: queryKeyName,
    url: url,
    searchData: searchData,
    config: config,
  });

  if (paginationQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!paginationQuery.data) return null;

  const paginationResponse = paginationQuery.data as PaginationResponse<Entry>;

  return (
    <div>
      <Table data={paginationResponse.data} columns={columns} />
      <Pagination<SearchPaginationDTO, Entry, TGenerics>
        queryKeyName={queryKeyName}
        url={url}
        searchData={searchData}
      />
    </div>
  );
};
