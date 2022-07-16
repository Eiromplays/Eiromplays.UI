import React from 'react';

import { useSearchPagination } from '@/components/Elements';
import { SearchFilter, SearchFilterProps } from '@/components/Elements/Pagination/SearchFilter';
import { DefaultLocationGenerics } from '@/providers';
import { BaseEntry, PaginationFilter } from '@/types';

import { Pagination, PaginationProps } from '../Pagination';
import { Spinner } from '../Spinner';

import { Table, TableColumn } from './Table';

export type PaginatedTableProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
> = PaginationProps<SearchPaginationDTO, Entry> &
  SearchFilterProps & {
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
  searchFilter,
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

  if (!paginationQuery?.data?.data) return null;

  return (
    <div>
      <SearchFilter searchFilter={searchFilter} queryKeyName={queryKeyName} />
      <Table data={paginationQuery.data.data || []} columns={columns} />
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
