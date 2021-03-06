import React from 'react';

import { Link } from '@/components/Elements';
import { Head } from '@/components/Head';

type LayoutProps = {
  logo?: string | undefined;
  children: React.ReactNode;
  title: string;
  description?: string;
};

export const Layout = ({ children, title, logo, description }: LayoutProps) => {
  return (
    <>
      <Head title={title} description={description}>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link className="flex items-center text-white" to="/">
              <img className="h-24 w-auto" src={logo} alt="Workflow" />
            </Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
            {title}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-lighter-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
