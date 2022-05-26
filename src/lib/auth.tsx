import React from 'react';

import { Spinner } from '@/components/Elements/Spinner';
import { AuthUser, getUser } from '@/features/auth';
import { AuthProviderConfig, initReactQueryAuth } from '@/providers/AuthProvider';

async function loadUser() {
  return await getUser();
}

async function loginFn() {
  return await loadUser();
}

async function login2faFn() {
  return await loadUser();
}

async function registerFn() {
  return await loadUser();
}

async function logoutFn() {
  const user = await loadUser();

  if (user?.logoutUrl) {
    window.location.href = user.logoutUrl ?? '/bff/logout';
  }
}

export const defaultAuthConfig = {
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
  authConfig: AuthProviderConfig<User | null>;
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
  const { AuthProvider: NewAuthProvider, useAuth: newUseAuth } = initReactQueryAuth<
    User | null,
    Error,
    LoginCredentials,
    Login2faCredentials,
    RegisterCredentials
  >(authConfig);

  AuthProvider = NewAuthProvider;
  useAuth = newUseAuth;

  return { AuthProvider, useAuth };
};
export let AuthProvider: any = initializeAuth({ authConfig: defaultAuthConfig }).AuthProvider,
  useAuth: any = initializeAuth({ authConfig: defaultAuthConfig }).useAuth;
