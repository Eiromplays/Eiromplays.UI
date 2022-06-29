import React from 'react';

import { Button } from '@/components/Elements';
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
      <Form
        onSubmit={async (values) => {
          console.log(values);
          /*for (const value of values) {
            //UpdateCustomFilter(value);
          }*/
        }}
      >
        {({ register }) =>
          filter.customFilters?.map((customFilter, index) => (
            <InputField
              key={index}
              type={customFilter.formType}
              label={customFilter.name}
              //error={formState.errors['username']}
              registration={register(customFilter.name)}
            />
          ))
        }
        <Button form="update-user" type="submit" className="mt-2" variant="warning" size="sm">
          Update User
        </Button>
      </Form>
    </div>
  );
};
