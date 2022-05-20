import React from 'react';

import { PaginationFilter, PaginationResponse } from '@/types';

import { Pagination } from '../Pagination';
import { usePagination, UsePaginationProps } from '../Pagination/usePagination';
import { Spinner } from '../Spinner';

import { BaseEntry, Table, TableColumn } from './Table';

export type PaginatedTableProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
> = UsePaginationProps<SearchPaginationDTO> & {
  columns: TableColumn<Entry>[];
};

export const PaginatedTable = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
>({
  queryKeyName,
  url,
  searchData,
  config,
  columns,
}: PaginatedTableProps<SearchPaginationDTO, Entry>) => {
  const paginationQuery = usePagination({
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
      <Pagination paginationResponse={paginationResponse} />
    </div>
  );
};
