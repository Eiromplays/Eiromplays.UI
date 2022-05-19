import { Outlet, ReactLocation, Router, Route, MakeGenerics } from '@tanstack/react-location';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

// eslint-disable-next-line import/order
import { Button, Spinner } from '@/components/Elements';

import 'react-toastify/dist/ReactToastify.css';
import { InitializeAuth, queryClient } from '@/lib';

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
    invoiceId: string;
    userId: string;
    logId: string;
    roleId: string;
    key: string;
    Id: string;
  };
  Search: {
    pagination: SearchPagination;
  };
}>;

type AppProviderProps<TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics> = {
  routes?: Route<TGenerics>[];
  routesFunctions?: () => Route<TGenerics>;
  location?: ReactLocation<TGenerics>;
  createDefaultOutlet?: boolean;
  children?: React.ReactNode;
};

export const AppProvider = <TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics>({
  routes = [],
  routesFunctions,
  location = new ReactLocation<TGenerics>(),
  createDefaultOutlet = true,
  children,
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
            <InitializeAuth>
              <Router
                location={location}
                routes={routes || (routesFunctions && routesFunctions())}
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
            </InitializeAuth>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
