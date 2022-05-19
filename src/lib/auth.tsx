import React from 'react';

import { Spinner } from '@/components/Elements/Spinner';
import { AuthUser, getUser, GetUserProps } from '@/features/auth';
import { AuthProviderConfig, initReactQueryAuth } from '@/providers/AuthProvider';

export type LoadUserProps = GetUserProps;

const loadUser = async <User extends AuthUser = AuthUser>({
  customClaims = [],
}: LoadUserProps = {}): Promise<User> => {
  const data = await getUser<User>({ customClaims: customClaims });

  return data as User;
};

const loginFn = async <User extends AuthUser = AuthUser>({
  customClaims = [],
}: LoadUserProps = {}) => {
  const user = await loadUser<User>({ customClaims: customClaims });

  return user;
};

const login2faFn = async <User extends AuthUser = AuthUser>({
  customClaims = [],
}: LoadUserProps = {}) => {
  const user = await loadUser<User>({ customClaims: customClaims });

  return user;
};

const registerFn = async <User extends AuthUser = AuthUser>({
  customClaims = [],
}: LoadUserProps = {}) => {
  const user = await loadUser<User>({ customClaims: customClaims });

  return user;
};

const logoutFn = async <User extends AuthUser = AuthUser>({
  customClaims = [],
}: LoadUserProps = {}) => {
  const user = await loadUser<User>({ customClaims: customClaims });

  if (user?.logoutUrl) {
    window.location.href = user.logoutUrl;
  }
};

export type SetupAuthProps<User extends AuthUser = AuthUser> = {
  children: React.ReactNode;
  config?: AuthProviderConfig<User | null, unknown>;
};

export const InitializeAuth = <
  User extends AuthUser = AuthUser,
  LoginCredentialsDTO = unknown,
  Login2faCredentialsDTO = unknown,
  RegisterCredentialsDTO = unknown
>(
  {
    config = {
      loadUser() {
        return loadUser<User>();
      },
      loginFn() {
        return loginFn<User>();
      },
      login2faFn() {
        return login2faFn<User>();
      },
      registerFn() {
        return registerFn<User>();
      },
      logoutFn() {
        return logoutFn<User>();
      },
      LoaderComponent() {
        return (
          <div className="w-screen h-screen flex justify-center items-center">
            <Spinner />
          </div>
        );
      },
    },
    children,
  }: SetupAuthProps<User> = {
    config: {
      loadUser() {
        return loadUser<User>();
      },
      loginFn() {
        return loginFn<User>();
      },
      login2faFn() {
        return login2faFn<User>();
      },
      registerFn() {
        return registerFn<User>();
      },
      logoutFn() {
        return logoutFn<User>();
      },
      LoaderComponent() {
        return (
          <div className="w-screen h-screen flex justify-center items-center">
            <Spinner />
          </div>
        );
      },
    },
    children: <></>,
  }
) => {
  const { AuthProvider, useAuth: useAuth2 } = initReactQueryAuth<
    User | null,
    LoginCredentialsDTO,
    Login2faCredentialsDTO,
    RegisterCredentialsDTO
  >(config);

  useAuth = useAuth2;

  return AuthProvider({ children: children });
};

export let useAuth: any;
