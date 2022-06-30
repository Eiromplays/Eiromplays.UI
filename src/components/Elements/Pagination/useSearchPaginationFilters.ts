import { useNavigate, useSearch } from '@tanstack/react-location';
import React from 'react';

import { DefaultLocationGenerics } from '@/providers';
import { CustomSearchProperty, SearchFilter } from '@/types';

export type UseSearchPaginationFilters = {
  filter: SearchFilter;
};

export const useSearchPaginationFilters = <
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>({
  filter,
}: UseSearchPaginationFilters) => {
  const navigate = useNavigate<TGenerics>();
  const { searchFilter: currentFilter } = useSearch<TGenerics>();

  const UpdateOrderBy = React.useCallback(
    (orderByName: string) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.filter,
              orderBy: old?.filter?.orderBy.include(orderByName)
                ? old?.filter?.orderBy.filter((o: string) => o !== orderByName)
                : [...old.filter.orderBy, orderByName],
            },
          };
        },
        replace: true,
      });
    },
    [currentFilter, navigate]
  );

  const UpdateAdvancedSearchField = React.useCallback(
    (fieldName: string) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.filter,
              advancedSearch: {
                ...old?.filter?.advancedSearch,
                fields: old?.filter?.advancedSearch?.fields.include(fieldName)
                  ? old?.filter?.advancedSearch?.fields.filter((f: string) => f !== fieldName)
                  : [...old.filter.advancedSearch.fields, fieldName],
              },
            },
          };
        },
        replace: true,
      });
    },
    [currentFilter, navigate]
  );

  const UpdateCustomFilter = React.useCallback(
    (customFilter: CustomSearchProperty) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.filter,
              customProperties: old?.filter?.customProperties.map((cf: CustomSearchProperty) =>
                cf.name === customFilter.name ? customFilter : cf
              ),
            },
          };
        },
        replace: true,
      });
    },
    [currentFilter, navigate]
  );

  const SetKeyword = React.useCallback(
    (newKeyword: string) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.filter,
              keyword: newKeyword,
            },
          };
        },
        replace: true,
      });
    },
    [currentFilter, navigate]
  );

  const SetAdvancedSearchKeyword = React.useCallback(
    (newKeyword: string) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.filter,
              advancedSearch: {
                ...old?.filter?.advancedSearch,
                keyword: newKeyword,
              },
            },
          };
        },
        replace: true,
      });
    },
    [currentFilter, navigate]
  );

  return {
    SetKeyword,
    SetAdvancedSearchKeyword,
    UpdateCustomFilter,
    UpdateOrderBy,
    UpdateAdvancedSearchField,
  };
};
