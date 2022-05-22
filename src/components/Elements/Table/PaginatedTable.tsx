import React from 'react';

import { useSearchPagination } from '@/components/Elements';
import { DefaultLocationGenerics } from '@/providers';
import { BaseEntry, PaginationFilter } from '@/types';

import { Pagination, PaginationProps } from '../Pagination';
import { Spinner } from '../Spinner';

import { Table, TableColumn } from './Table';

export type PaginatedTableProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
> = PaginationProps<SearchPaginationDTO, Entry> & {
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
  onPageChanged,
  onPageSizeChanged,
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

  return (
    <div>
      <Table data={paginationQuery.data?.data} columns={columns} />
      <Pagination<SearchPaginationDTO, Entry, TGenerics>
        queryKeyName={queryKeyName}
        url={url}
        searchData={searchData}
        onPageChanged={onPageChanged}
        onPageSizeChanged={onPageSizeChanged}
      />
    </div>
  );
};
