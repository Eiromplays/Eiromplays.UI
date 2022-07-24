import { Outlet, ReactLocation, Router, Route, MakeGenerics } from '@tanstack/react-location';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { Button, Spinner } from '@/components/Elements';
import { AuthProvider, queryClient } from '@/lib';
import { SearchFilter } from '@/types';

import 'react-toastify/dist/ReactToastify.css';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :(</h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

export type SearchPagination = {
  index?: number;
  size?: number;
};

export type DefaultLocationGenerics = MakeGenerics<{
  Params: {
    userId: string;
    logId: string;
    roleId: string;
    key: string;
    Id: string;
    rememberMe: string;
    returnUrl: string;
    clientId: string;
    email: string;
    userName: string;
    loginProvider: string;
  };
  Search: {
    pagination: SearchPagination;
    returnUrl: string;
    errorId: string;
    logoutId: string;
    searchFilter: SearchFilter;
  };
  RouteMeta: {
    breadcrumb: (params: DefaultLocationGenerics['Params']) => React.ReactElement | string;
  };
}>;

export type valueOf<T> = T[keyof T];

export type AppProviderProps<TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics> =
  {
    routes?: Route<TGenerics>[];
    routesFunctions?: () => Route<TGenerics>;
    location?: ReactLocation<TGenerics>;
    createDefaultOutlet?: boolean;
    children?: React.ReactNode;
    CustomAuthProvider?: React.ComponentType<any>;
  };

export const AppProvider = <TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics>({
  routes = [],
  routesFunctions,
  location = new ReactLocation<TGenerics>(),
  createDefaultOutlet = true,
  children,
  CustomAuthProvider = AuthProvider,
}: AppProviderProps<TGenerics>) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen dark:bg-lighter-black">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <CustomAuthProvider>
              <Router
                location={location}
                routes={routes || routesFunctions?.()}
                defaultPendingElement={
                  <div className="flex items-center justify-center w-screen h-screen dark:bg-lighter-black">
                    <Spinner size="xl" />
                  </div>
                }
              >
                <ReactLocationDevtools initialIsOpen={false} />
                <ReactQueryDevtools
                  initialIsOpen={false}
                  toggleButtonProps={{
                    style: {
                      marginLeft: '4rem',
                    },
                  }}
                />
                <ToastContainer
                  position="top-right"
                  theme="dark"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                {createDefaultOutlet && <Outlet />}
                {children}
              </Router>
            </CustomAuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
