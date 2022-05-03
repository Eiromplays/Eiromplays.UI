import * as React from 'react';
import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | Eiromplays IdentityServer` : undefined}
      defaultTitle="Eiromplays IdentityServer"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
