export interface PaginationPageSizeOption {
  readonly value: number;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const paginationPageSizeOptions: readonly PaginationPageSizeOption[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
  { value: 500, label: '500' },
  { value: 1000, label: '1000' },
  { value: 2000, label: '2000' },
  { value: 5000, label: '5000' },
];

export const defaultPaginationPageSizeOption: PaginationPageSizeOption = {
  value: 10,
  label: '10',
};
