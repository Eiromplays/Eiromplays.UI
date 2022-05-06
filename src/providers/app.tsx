import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';

import { Button, Spinner } from '@/components/Elements';

import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, queryClient } from '@/lib';
import { Outlet, ReactLocation, Router, Route, PartialGenerics, DefaultGenerics } from '@tanstack/react-location';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps<TGenerics extends PartialGenerics = DefaultGenerics> = {
  routes?: Route<TGenerics>[];
  location?: ReactLocation<TGenerics>;
  createDefaultOutlet?: boolean;
  children?: React.ReactNode;
};


export const AppProvider = <TGenerics extends PartialGenerics = DefaultGenerics>({ routes = [], location = new ReactLocation<TGenerics>(), createDefaultOutlet = true, children }: AppProviderProps<TGenerics>) => {
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
            <AuthProvider>
              <Router location={location} routes={routes}>
                <ReactQueryDevtools position="bottom-right" />
                <ReactLocationDevtools />
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
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
