import Axios from 'axios';
import { toast } from 'react-toastify';

import { WhitelistAxiosError } from '@/types';
import { createUrl } from '@/utils/createUrl';

export const Whitelists: WhitelistAxiosError[] = [
  { status: 401, urls: ['/bff/user'], ignoreAll: false },
  { status: 400, urls: ['/spa/login'] },
];

export const AddDataToRequestIgnoreUrls: string[] = [];

export const axios = Axios.create({
  headers: {
    'X-CSRF': '1',
  },
});

axios.defaults.timeout = 30_000; // If you want to increase this, do it for a specific call, not the global app API.

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const whitelists = Whitelists.filter(
      (whitelist: WhitelistAxiosError) => whitelist.status === error?.response?.status
    );

    const shouldWhitelist = whitelists.some(
      (whitelist) =>
        whitelist.urls?.some(
          (url) =>
            url.toLowerCase() ===
            createUrl(error?.request?.responseURL)?.pathname.replace(/\/$/, '').toLowerCase()
        ) || whitelist.ignoreAll
    );

    if (shouldWhitelist) {
      if (error?.response?.data) return error.response.data;
      return;
    }

    const messages =
      error.response?.data?.errors?.GeneralErrors ?? error.response?.data?.messages ?? [];

    if (error.response?.data?.error) {
      messages.push(error.response?.data?.error);
    }

    if (error.response?.data?.supportMessage) {
      messages.push(error.response?.data?.supportMessage);
    }

    if (messages.length <= 0) {
      toast.error(error.response?.data?.message || error.message);
      return Promise.reject(error);
    }
    messages.forEach((message: string) => toast.error(message));

    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (request) => {
    const shouldIgnore = AddDataToRequestIgnoreUrls.some(
      (url) =>
        request.url &&
        url.toLowerCase() === createUrl(request.url)?.pathname.replace(/\/$/, '').toLowerCase()
    );
    if (shouldIgnore) return request;

    if (request.data) request.data = { Data: request.data };

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
