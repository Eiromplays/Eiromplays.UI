import React from 'react';

import { Form, InputField } from '@/components/Form';
import { DefaultLocationGenerics } from '@/providers';

import {
  UseSearchPaginationFilters,
  useSearchPaginationFilters,
} from './useSearchPaginationFilters';

export type SearchFiltersProps = UseSearchPaginationFilters;

export const SearchFilter = <TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics>({
  filter,
}: SearchFiltersProps) => {
  const {
    UpdateAdvancedSearchField,
    UpdateOrderBy,
    SetAdvancedSearchKeyword,
    SetKeyword,
    UpdateCustomFilter,
  } = useSearchPaginationFilters<TGenerics>({
    filter: filter,
  });

  return (
    <div>
      <Form onSubmit={async () => {}}>
        {({ register }) =>
          filter.customProperties?.map((customFilter, index) => (
            <InputField
              key={index}
              type={customFilter.type}
              label={customFilter.name}
              //error={formState.errors['username']}
              registration={register(customFilter.name, {
                onChange: (value) => {
                  customFilter.value = value?.target?.checked;
                  UpdateCustomFilter(customFilter);
                },
              })}
            />
          ))
        }
      </Form>
    </div>
  );
};
