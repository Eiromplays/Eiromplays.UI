import React from 'react';

import { Spinner } from '@/components/Elements/Spinner';
import { AuthUser, getUser, GetUserProps } from '@/features/auth';
import {
  AuthContextValue,
  AuthProviderConfig,
  AuthProviderProps,
  initReactQueryAuth,
} from '@/providers/AuthProvider';

async function loadUser<User extends AuthUser | null = AuthUser>(props: GetUserProps = {}) {
  return await getUser<User>(props);
}

async function loginFn<User extends AuthUser | null = AuthUser>(props: GetUserProps = {}) {
  return await loadUser<User>(props);
}

async function login2faFn<User extends AuthUser | null = AuthUser>(props: GetUserProps = {}) {
  return await loadUser<User>(props);
}

async function registerFn<User extends AuthUser | null = AuthUser>(props: GetUserProps = {}) {
  return await loadUser<User>(props);
}

async function logoutFn<User extends AuthUser | null = AuthUser>(props: GetUserProps = {}) {
  const user = await loadUser<User>(props);

  if (user?.logoutUrl) {
    window.location.href = user.logoutUrl;
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

export type InitializeAuthProps<User extends AuthUser | null = AuthUser, Error = unknown> = {
  authConfig: AuthProviderConfig<User | null, Error>;
};

export const initializeAuth = <
  User extends AuthUser | null = AuthUser,
  Error = unknown,
  LoginCredentials = unknown,
  Login2faCredentials = unknown,
  RegisterCredentials = unknown
>({
  authConfig,
}: InitializeAuthProps<User, Error>) => {
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

export type UseAuthType<
  User extends AuthUser | null = AuthUser,
  Error = unknown,
  LoginCredentials = unknown,
  Login2faCredentials = unknown,
  RegisterCredentials = unknown
> = (
  ...args: any
) => Promise<
  AuthContextValue<User, Error, LoginCredentials, Login2faCredentials, RegisterCredentials>
>;

export let AuthProvider: ({ children }: AuthProviderProps) => JSX.Element = initializeAuth({
    authConfig: defaultAuthConfig,
  }).AuthProvider,
  useAuth: () => AuthContextValue<any | null, any, any, any, any> = initializeAuth({
    authConfig: defaultAuthConfig,
  }).useAuth;
