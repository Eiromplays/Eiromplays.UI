import { useNavigate, useSearch } from '@tanstack/react-location';
import React from 'react';

import { queryClient } from '@/lib';
import { DefaultLocationGenerics } from '@/providers';
import { CustomSearchProperty } from '@/types';

export type UseSearchPaginationProps = {
  queryKeyName?: string;
};

export const useSearchPaginationFilters = <
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>({
  queryKeyName,
}: UseSearchPaginationProps) => {
  const navigate = useNavigate<TGenerics>();
  const { searchFilter: currentFilter, pagination } = useSearch<TGenerics>();

  const removeQuery = async () => {
    await queryClient.removeQueries([queryKeyName, pagination?.index || 1, pagination?.size || 10]);
  };

  const UpdateOrderBy = React.useCallback(
    async (orderByName: string) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.searchFilter,
              orderBy: old?.searchFilter?.orderBy?.includes(orderByName)
                ? old?.searchFilter?.orderBy?.filter((o: string) => o !== orderByName)
                : [...(old.searchFilter?.orderBy || []), orderByName],
            },
          };
        },
        replace: true,
      });
      await removeQuery();
    },
    [currentFilter, navigate, queryKeyName]
  );

  const UpdateAllOrderBy = React.useCallback(
    async (orderByArray: string[]) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.searchFilter,
              orderBy: orderByArray,
            },
          };
        },
        replace: true,
      });
      await removeQuery();
    },
    [currentFilter, navigate, queryKeyName]
  );

  const UpdateAdvancedSearchField = React.useCallback(
    async (fieldName: string) => {
      navigate({
        search: (old: any) => {
          old.searchFilter ??= {};
          old.searchFilter.advancedSearch ??= { fields: [] };

          return {
            ...old,
            searchFilter: {
              ...old?.searchFilter,
              advancedSearch: {
                ...old?.searchFilter?.advancedSearch,
                fields: old?.searchFilter?.advancedSearch?.fields?.includes(fieldName)
                  ? old?.searchFilter?.advancedSearch?.fields?.filter(
                      (f: string) => f !== fieldName
                    )
                  : [...(old.searchFilter.advancedSearch.fields || []), fieldName],
              },
            },
          };
        },
        replace: true,
      });
      await removeQuery();
    },
    [currentFilter, navigate, queryKeyName]
  );

  const UpdateAdvancedSearchFields = React.useCallback(
    async (fieldNames: string[]) => {
      navigate({
        search: (old: any) => {
          old.searchFilter ??= {};
          old.searchFilter.advancedSearch ??= { fields: [] };

          return {
            ...old,
            searchFilter: {
              ...old?.searchFilter,
              advancedSearch: {
                ...old?.searchFilter?.advancedSearch,
                fields: fieldNames,
              },
            },
          };
        },
        replace: true,
      });
      await removeQuery();
    },
    [currentFilter, navigate, queryKeyName]
  );

  const UpdateCustomProperty = React.useCallback(
    async (customSearchProperty: CustomSearchProperty) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.searchFilter,
              customProperties:
                old?.searchFilter?.customProperties?.length > 0
                  ? old?.searchFilter?.customProperties?.filter(
                      (p: string) => p !== customSearchProperty.name
                    )
                  : [customSearchProperty.name],
            },
          };
        },
        replace: true,
      });
      await removeQuery();
    },
    [currentFilter, navigate, queryKeyName]
  );

  const SetKeyword = React.useCallback(
    async (newKeyword: string) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.searchFilter,
              keyword: newKeyword,
            },
          };
        },
        replace: true,
      });
      await removeQuery();
    },
    [currentFilter, navigate, queryKeyName]
  );

  const SetAdvancedSearchKeyword = React.useCallback(
    async (newKeyword: string) => {
      navigate({
        search: (old: any) => {
          return {
            ...old,
            searchFilter: {
              ...old?.searchFilter,
              advancedSearch: {
                ...old?.searchFilter?.advancedSearch,
                keyword: newKeyword,
              },
            },
          };
        },
        replace: true,
      });
      await removeQuery();
    },
    [currentFilter, navigate, queryKeyName]
  );

  return {
    SetKeyword,
    SetAdvancedSearchKeyword,
    UpdateCustomProperty,
    UpdateOrderBy,
    UpdateAllOrderBy,
    UpdateAdvancedSearchField,
    UpdateAdvancedSearchFields,
  };
};
