// Original source code: https://github.com/estevanmaito/windmill-react-ui/blob/master/src/Pagination.tsx AND https://javascript.plainenglish.io/building-a-pagination-component-in-react-with-typescript-2e7f7b62b35d

import { useNavigate, useSearch } from '@tanstack/react-location';
import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { queryClient } from '@/lib';
import { DefaultLocationGenerics } from '@/providers';
import { PaginationFilter } from '@/types';

import { Button } from '../Button';
import { Spinner } from '../Spinner';
import { BaseEntry } from '../Table';

import { PaginationPageSizeOption, paginationPageSizeOptions } from './data';
import { EmptyPageButton } from './EmptyPageButton';
import { PageButton } from './PageButton';
import { searchPagination, useSearchPagination, UseSearchPaginationOptions } from './usePagination';

export type PaginationProps<
  SearchPaginationDTO extends PaginationFilter,
  Entry
> = UseSearchPaginationOptions<SearchPaginationDTO> & {
  onPageChanged?: (page: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  onLoaded?: (data: Entry[]) => void;
};

export const Pagination = <
  SearchPaginationDTO extends PaginationFilter,
  Entry extends BaseEntry | any,
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>({
  queryKeyName,
  url,
  searchData,
  config = { keepPreviousData: true, enabled: false },
  onPageChanged,
  onPageSizeChanged,
  onLoaded,
}: PaginationProps<SearchPaginationDTO, Entry>) => {
  const navigate = useNavigate<TGenerics>();
  const { pagination } = useSearch<TGenerics>();
  const currentPage = pagination?.index ?? 1;
  const currentSize = pagination?.size ?? 10;
  const rerenders = React.useRef(0);
  const rerenders2 = React.useRef(0);
  let rerenders3 = 0;
  let rerenders4 = 0;

  const searchPaginationQuery = useSearchPagination<SearchPaginationDTO, Entry>({
    queryKeyName: queryKeyName,
    url: url,
    searchData: searchData,
    config: config,
  });
  console.log('currentPage', currentPage);

  React.useEffect(() => {
    if (searchPaginationQuery.data?.hasNextPage) {
      const nextPage = (pagination?.index ?? 1) + 1;
      const prefetchData = searchData;
      prefetchData.pageNumber = nextPage;
      queryClient.prefetchQuery([queryKeyName, nextPage, currentSize], () =>
        searchPagination(url, prefetchData)
      );
    }
  }, [
    currentSize,
    pagination?.index,
    queryKeyName,
    searchData,
    searchPaginationQuery.data?.hasNextPage,
    url,
  ]);

  rerenders.current += 1;
  rerenders3 += 1;
  console.log('rerenders', rerenders.current);
  console.log('rerenders3', rerenders3);
  if (searchPaginationQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!searchPaginationQuery.data) return null;
  rerenders2.current += 1;
  rerenders4 += 1;
  console.log('rerenders2', rerenders2.current);
  console.log('rerenders4', rerenders4);

  if (onLoaded) onLoaded(searchPaginationQuery.data.data as Entry[]);
  const paginationResponse = searchPaginationQuery.data;
  const { totalPages, currentPage: page } = paginationResponse;

  const NextPage = () => {
    if (!paginationResponse.hasNextPage) return;
    SetPage(page + 1);
  };

  const PreviousPage = () => {
    if (!paginationResponse.hasPreviousPage) return;
    SetPage(page - 1);
  };

  const SetPage = (newPage: number) => {
    if (newPage === pagination?.index) return;
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
    if (newPageSize === pagination?.size) return;
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

  const handleChange = (newValue: OnChangeValue<PaginationPageSizeOption, false>) => {
    SetPageSize(newValue?.value || 10);
  };

  const handleInputChange = (newValue: string) => {
    if (!newValue) return;

    SetPageSize(parseInt(newValue, 10) || 10);
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-500 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          {paginationResponse.hasPreviousPage && (
            <Button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-200 bg-white hover:bg-gray-50"
              onClick={PreviousPage}
            >
              Previous
            </Button>
          )}
          {paginationResponse.hasNextPage && (
            <Button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-200 bg-white hover:bg-gray-50"
              onClick={NextPage}
            >
              Next
            </Button>
          )}
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Showing{' '}
              <span className="font-medium">
                {paginationResponse.currentPage * paginationResponse.pageSize -
                  paginationResponse.pageSize +
                  1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(
                  paginationResponse.currentPage * paginationResponse.pageSize,
                  paginationResponse.totalCount
                )}
              </span>{' '}
              of <span className="font-medium">{paginationResponse.totalCount}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <ul className="inline-flex items-center">
                <li>
                  {paginationResponse.hasPreviousPage && (
                    <Button
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 dark:text-gray-50 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      onClick={PreviousPage}
                    >
                      <span className="sr-only">Previous</span>
                      <HiOutlineChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  )}
                </li>
                <PageButton page={1} isActive={1 === page} onClick={(page) => SetPage(page)} />
                {page > 3 && <EmptyPageButton />}
                {page === totalPages && totalPages > 3 && (
                  <PageButton page={page - 2} isActive={page - 2 === page} onClick={SetPage} />
                )}
                {page > 2 && (
                  <PageButton page={page - 1} isActive={page - 1 === page} onClick={SetPage} />
                )}
                {page !== 1 && page !== totalPages && (
                  <PageButton page={page} isActive={page === page} onClick={SetPage} />
                )}
                {page < totalPages - 1 && (
                  <PageButton page={page + 1} isActive={page + 1 === page} onClick={SetPage} />
                )}
                {page === 1 && totalPages > 3 && (
                  <PageButton page={page + 2} isActive={page + 2 === page} onClick={SetPage} />
                )}
                {page < totalPages - 2 && <EmptyPageButton />}
                {totalPages > 1 && (
                  <PageButton page={totalPages} isActive={totalPages === page} onClick={SetPage} />
                )}
                <li>
                  {paginationResponse.hasNextPage && (
                    <Button
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 dark:text-gray-50 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      onClick={NextPage}
                    >
                      <span className="sr-only">Next</span>
                      <HiOutlineChevronRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <CreatableSelect
          isClearable
          onChange={handleChange}
          onInputChange={handleInputChange}
          defaultValue={{ value: currentPage, label: currentSize.toString() }}
          options={paginationPageSizeOptions}
          className="ml-4"
        />
      </div>
    </div>
  );
};
