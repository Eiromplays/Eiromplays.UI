export type BaseEntry = {
  id?: string;
};

export type BaseEntity = BaseEntry & {
  createdAt: number;
};

export type Claim = {
  type: string;
  value: string;
};

export type WhitelistAxiosError = {
  status: number;
  urls?: string[];
  ignoreAll?: boolean;
};

export type MessageResponse = {
  message: string;
};

export type PaginationFilter = BaseFilter & {
  pageNumber: number;
  pageSize: number;
  orderBy?: string[];
};

export type BaseFilter = {
  advancedSearch?: Search;
  keyword?: string;
};

export type Search = {
  fields: string[];
  keyword?: string;
};

export type PaginationResponse<TItem extends BaseEntry | any> = {
  data: TItem[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type Updater<T> = T | ((old: T) => T);
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;
