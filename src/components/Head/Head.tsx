import React from 'react';
import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const Head = ({ title = '', description = '', children }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | Eiromplays IdentityServer` : undefined}
      defaultTitle="Eiromplays IdentityServer"
    >
      <meta name="description" content={description} />
      {children}
    </Helmet>
  );
};
