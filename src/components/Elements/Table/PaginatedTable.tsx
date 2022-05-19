import React from 'react';

import { PaginationFilter } from '@/types';

import { Pagination, PaginationProps } from '../Pagination';

import { BaseEntry, Table, TableColumn } from './Table';

export type PaginatedTableProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry
> = PaginationProps<SearchPaginationDTO, Entry> & {
  columns: TableColumn<Entry>[];
};

export const PaginatedTable = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any
>({
  queryKeyName,
  url,
  searchData,
  columns,
  onPageChanged,
  onPageSizeChanged,
  onLoaded,
}: PaginatedTableProps<SearchPaginationDTO, Entry>) => {
  const [data, setData] = React.useState<Entry[]>([]);
  const setTableData = React.useCallback((data: Entry[]) => {
    setData(data);
  }, []);

  return (
    <div>
      <Pagination
        onPageChanged={onPageChanged}
        onPageSizeChanged={onPageSizeChanged}
        onLoaded={(data: Entry[]) => {
          setTableData(data);
          onLoaded?.(data);
        }}
        queryKeyName={queryKeyName}
        url={url}
        searchData={searchData}
      />
      <Table data={data} columns={columns} />
    </div>
  );
};
