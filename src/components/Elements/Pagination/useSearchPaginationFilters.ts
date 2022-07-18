import { useNavigate, useSearch } from '@tanstack/react-location';
import React from 'react';
import { QueryKey } from 'react-query/types/core/types';

import { queryClient } from '@/lib';
import { DefaultLocationGenerics } from '@/providers';
import { CustomSearchProperty } from '@/types';

export type UseSearchPaginationProps<TQueryKey extends QueryKey = QueryKey> = {
  queryKeyName: TQueryKey;
};

export const useSearchPaginationFilters = <
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics,
  TQueryKey extends QueryKey = QueryKey
>({
  queryKeyName,
}: UseSearchPaginationProps<TQueryKey>) => {
  const navigate = useNavigate<TGenerics>();
  const { pagination } = useSearch<TGenerics>();

  const removeQuery = React.useCallback(async () => {
    await queryClient.removeQueries([queryKeyName, pagination?.index || 1, pagination?.size || 10]);
  }, [queryKeyName, pagination?.index, pagination?.size]);

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
    [navigate, removeQuery]
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
    [navigate, removeQuery]
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
    [navigate, removeQuery]
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
    [navigate, removeQuery]
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
    [navigate, removeQuery]
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
    [navigate, removeQuery]
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
    [navigate, removeQuery]
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
