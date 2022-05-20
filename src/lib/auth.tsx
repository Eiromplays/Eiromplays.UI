import React from 'react';

import { Spinner } from '@/components/Elements/Spinner';
import { AuthUser, getUser } from '@/features/auth';
import { AuthProviderConfig, initReactQueryAuth } from '@/providers/AuthProvider';

async function loadUser() {
  const data = await getUser();

  return data;
}

async function loginFn() {
  const user = await loadUser();

  return user;
}

async function login2faFn() {
  const user = await loadUser();

  return user;
}

async function registerFn() {
  const user = await loadUser();

  return user;
}

async function logoutFn() {
  const user = await loadUser();

  if (user?.logoutUrl) {
    window.location.href = user.logoutUrl;
  }
}

const authConfig = {
  loadUser,
  loginFn,
  login2faFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  },
};

export type InitializeAuthProps<User extends AuthUser = AuthUser> = {
  authConfig: AuthProviderConfig<User | null, unknown>;
};

export const initializeAuth = <
  User extends AuthUser = AuthUser,
  Error = unknown,
  LoginCredentials = unknown,
  Login2faCredentials = unknown,
  RegisterCredentials = unknown
>({
  authConfig,
}: InitializeAuthProps<User>) => {
  const { AuthProvider, useAuth } = initReactQueryAuth<
    User | null,
    Error,
    LoginCredentials,
    Login2faCredentials,
    RegisterCredentials
  >(authConfig);

  return { AuthProvider, useAuth };
};

export const { AuthProvider, useAuth } = initializeAuth({ authConfig: authConfig });
