import React from 'react';

import { Form, InputField } from '@/components/Form';
import { DefaultLocationGenerics } from '@/providers';
import { SearchFilter as SearchFilterType } from '@/types';

import { useSearchPaginationFilters, UseSearchPaginationProps } from './useSearchPaginationFilters';

export type SearchFilterProps = UseSearchPaginationProps & {
  searchFilter?: SearchFilterType;
};

export const SearchFilter = <TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics>({
  queryKeyName,
  searchFilter,
}: SearchFilterProps) => {
  const {
    UpdateAdvancedSearchField,
    UpdateOrderBy,
    SetAdvancedSearchKeyword,
    SetKeyword,
    UpdateCustomProperty,
  } = useSearchPaginationFilters<TGenerics>({ queryKeyName: queryKeyName });

  if (!searchFilter) return null;

  return (
    <div>
      <Form onSubmit={async () => {}}>
        {({ register }) => (
          <>
            <div className="mt-2">
              <p>Custom Properties:</p>
              <div className="flex flex-row gap-3 flex-wrap mt-2">
                {searchFilter.customProperties?.map((customProperty, index) => (
                  <InputField
                    key={index}
                    type={customProperty.type}
                    label={customProperty.name}
                    registration={register(customProperty.name, {
                      onChange: async (value) => {
                        customProperty.value = value?.target?.checked || value?.target?.value;
                        await UpdateCustomProperty(customProperty);
                      },
                    })}
                  />
                ))}
              </div>
            </div>

            <InputField
              type="text"
              label="keyword"
              registration={register('keyword', {
                onChange: async (value) => {
                  searchFilter.keyword = value?.target?.value;
                  await SetKeyword(searchFilter.keyword);
                },
              })}
            />

            <div className="flex flex-row gap-3 flex-wrap mt-2">
              <div className="flex flex-col">
                <p>Order By:</p>
                <div className="flex flex-row gap-3 flex-wrap mt-2">
                  {searchFilter.orderBy?.map((orderBy, index) => (
                    <InputField
                      key={index}
                      type="checkbox"
                      label={orderBy}
                      registration={register(`orderBy.${orderBy}`, {
                        onChange: async () => {
                          await UpdateOrderBy(orderBy);
                        },
                      })}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <p>Advanced Search:</p>
                <div className="flex flex-row gap-3 flex-wrap mt-2">
                  {searchFilter.advancedSearch?.fields.map((advancedSearch, index) => (
                    <InputField
                      key={index}
                      type="checkbox"
                      label={advancedSearch}
                      registration={register(`advancedSearch.${advancedSearch}`, {
                        onChange: async () => {
                          await UpdateAdvancedSearchField(advancedSearch);
                        },
                      })}
                    />
                  ))}
                  <InputField
                    type="text"
                    label="keyword"
                    registration={register('advancedSearch.keyword', {
                      onChange: async (value) => {
                        searchFilter.keyword = value?.target?.value;
                        await SetAdvancedSearchKeyword(searchFilter.keyword);
                      },
                    })}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
