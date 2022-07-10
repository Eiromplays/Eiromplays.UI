import { useSearch } from '@tanstack/react-location';
import React from 'react';
import { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';

import { Form, InputField } from '@/components/Form';
import { useTheme } from '@/hooks';
import { DefaultLocationGenerics } from '@/providers';
import { SearchFilter as SearchFilterType } from '@/types';

import { useSearchPaginationFilters, UseSearchPaginationProps } from './useSearchPaginationFilters';

export type SearchFilterProps = UseSearchPaginationProps & {
  searchFilter?: SearchFilterType;
};

export type SearchFilterSelectOption = {
  value: string;
  label: string;
  isFixed?: boolean;
  isDisabled?: boolean;
};

const animatedComponents = makeAnimated();

export const SearchFilter = <TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics>({
  queryKeyName,
  searchFilter,
}: SearchFilterProps) => {
  const { searchFilter: currentSearchFilter } = useSearch<TGenerics>();
  const { currentTheme } = useTheme();

  const {
    UpdateAdvancedSearchFields,
    UpdateAllOrderBy,
    SetAdvancedSearchKeyword,
    SetKeyword,
    //UpdateCustomProperty,
  } = useSearchPaginationFilters<TGenerics>({ queryKeyName: queryKeyName });

  if (!searchFilter) return null;

  return (
    <div>
      <Form onSubmit={async () => {}}>
        {({ register }) => (
          <>
            <InputField
              type="text"
              label="keyword"
              registration={register('keyword', {
                onChange: async (value) => {
                  searchFilter.keyword = value?.target?.value;
                  await SetKeyword(searchFilter.keyword || '');
                },
                value: currentSearchFilter?.keyword || '',
              })}
            />

            <div className="flex flex-row gap-3 flex-wrap mt-2">
              <div className="flex flex-col">
                <p>Order By:</p>
                <div className="flex flex-row gap-3 flex-wrap mt-2">
                  {
                    <CreatableSelect
                      isMulti
                      onChange={async (newValue: OnChangeValue<SearchFilterSelectOption, true>) => {
                        await UpdateAllOrderBy(newValue.map((item) => item.value));
                      }}
                      options={searchFilter?.orderBy?.map((item) => ({ value: item, label: item }))}
                      defaultValue={currentSearchFilter?.orderBy?.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      components={animatedComponents as any}
                      theme={(theme) =>
                        currentTheme === 'dark'
                          ? {
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: '#0a0e17',
                                primary25: 'gray',
                                primary50: '#fff',
                                neutral0: '#0a0e17',
                              },
                            }
                          : {
                              ...theme,
                              colors: {
                                ...theme.colors,
                              },
                            }
                      }
                    />
                  }
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <p>Advanced Search:</p>
                <div className="flex flex-row gap-3 flex-wrap mt-2">
                  {
                    <CreatableSelect
                      isMulti
                      onChange={async (newValue: OnChangeValue<SearchFilterSelectOption, true>) => {
                        await UpdateAdvancedSearchFields(newValue.map((item) => item.value));
                      }}
                      options={searchFilter?.advancedSearch?.fields?.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      defaultValue={currentSearchFilter?.advancedSearch?.fields?.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      components={animatedComponents as any}
                      theme={(theme) =>
                        currentTheme === 'dark'
                          ? {
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: '#0a0e17',
                                primary25: 'gray',
                                primary50: '#fff',
                                neutral0: '#0a0e17',
                              },
                            }
                          : {
                              ...theme,
                              colors: {
                                ...theme.colors,
                              },
                            }
                      }
                    />
                  }
                  <InputField
                    type="text"
                    label="keyword"
                    registration={register('advancedSearch-keyword', {
                      onChange: async (value) => {
                        searchFilter.advancedSearch.keyword = value?.target?.value;
                        await SetAdvancedSearchKeyword(searchFilter.advancedSearch.keyword || '');
                      },
                      value: currentSearchFilter?.advancedSearch?.keyword || '',
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

/* TODO: Add custom properties, when they are supported
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
                      setValueAs: async () => await UpdateCustomProperty(customProperty),
                      value:
                        currentSearchFilter?.customProperties?.includes(customProperty) ??
                        customProperty.value,
                    })}
                  />
                ))}
              </div>
            </div>
*/
