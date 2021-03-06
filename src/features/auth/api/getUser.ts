import { axios } from '@/lib/axios';
import { Claim, CustomClaim } from '@/types';
import { formatDate } from '@/utils/format';

import { AuthUser } from '../types';

export type GetUserProps = {
  authenticatedProps?: AuthenticatedProps;
  customClaims?: CustomClaim[];
  silentLoginProps?: SilentLoginProps;
  slide?: true;
};

export const getUser = async <User extends AuthUser | null | undefined = AuthUser>({
  authenticatedProps,
  customClaims = [],
  silentLoginProps,
  slide,
}: GetUserProps = {}): Promise<User | null> => {
  if (authenticatedProps?.useAuthenticated && authenticatedProps.isAuthenticatedUrl) {
    const isAuthenticated = await axios.get(authenticatedProps.isAuthenticatedUrl);
    if (!isAuthenticated?.data) {
      return null;
    }
  }
  const userDiagnosis = await axios.get('/bff/diagnostics');

  if (userDiagnosis) console.log(userDiagnosis);

  const userSessionInfo: Claim[] = await axios.get(`/bff/user?slide=${slide ?? true}`);

  if (!userSessionInfo) {
    silentLogin(silentLoginProps);
    return null;
  }

  const nameDictionary =
    userSessionInfo?.find((claim: Claim) => claim.type === 'name') ??
    userSessionInfo?.find((claim: Claim) => claim.type === 'sub');

  const currentUser: any = {
    id: userSessionInfo?.find((claim: Claim) => claim.type === 'sub')?.value ?? '',
    sessionId: userSessionInfo?.find((claim: Claim) => claim.type === 'sid')?.value ?? '',
    username: nameDictionary?.value ?? '',
    firstName: userSessionInfo?.find((claim: Claim) => claim.type === 'given_name')?.value ?? '',
    lastName: userSessionInfo?.find((claim: Claim) => claim.type === 'family_name')?.value ?? '',
    email: userSessionInfo?.find((claim: Claim) => claim.type === 'email')?.value ?? '',
    gravatarEmail:
      userSessionInfo?.find((claim: Claim) => claim.type === 'gravatar_email')?.value ?? '',
    profilePicture: userSessionInfo?.find((claim: Claim) => claim.type === 'picture')?.value ?? '',
    roles:
      (userSessionInfo
        ?.filter((claim: Claim) => claim.type === 'role')
        .map((claim: Claim) => claim.value.toLowerCase()) as string[]) ?? [],
    logoutUrl:
      userSessionInfo?.find((claim: Claim) => claim.type === 'bff:logout_url')?.value ??
      '/bff/logout',
    updated_at: formatDate(
      (userSessionInfo?.find((claim: Claim) => claim.type === 'updated_at')?.value ?? 0) as number
    ),
    created_at: formatDate(
      (userSessionInfo?.find((claim: Claim) => claim.type === 'created_at')?.value ?? 0) as number
    ),
  };

  customClaims.forEach((customClaim: CustomClaim) => {
    const userClaim = userSessionInfo?.find(
      (userClaim: Claim) => userClaim.type === customClaim.type
    );

    if (!userClaim) return;

    try {
      switch (customClaim.valueType) {
        case 'boolean':
          currentUser[customClaim.propertyName ?? customClaim.type] =
            userClaim.value.toLowerCase() === 'true';
          break;
        case 'number':
          currentUser[customClaim.propertyName ?? customClaim.type] = +userClaim.value;
          break;
        default:
          currentUser[customClaim.propertyName ?? customClaim.type] = userClaim.value;
      }
    } catch (_) {
      // Ignore: Won't set the property if there is no valid type or value
    }
  });

  if (currentUser?.id) return currentUser;

  return null;
};

export type AuthenticatedProps = {
  useAuthenticated?: boolean;
  isAuthenticatedUrl?: string;
};

export type SilentLoginProps = {
  useSilentLogin?: boolean;
  redirectIfSilentLoginFailed?: boolean;
};

export const silentLogin = ({
  useSilentLogin,
  redirectIfSilentLoginFailed,
}: SilentLoginProps = {}) => {
  if (!useSilentLogin) return;

  const bffSilentLoginIframe = document.createElement('iframe');
  document.body.append(bffSilentLoginIframe);

  bffSilentLoginIframe.src = '/bff/silent-login';
  window.addEventListener('message', (e) => {
    if (e.data && e.data.source === 'bff-silent-login' && e.data.isLoggedIn) {
      // we now have a user logged in silently, so reload this window

      window.location.reload();
    } else if (e.data && e.data.source === 'bff-silent-login' && !e.data.isLoggedIn) {
      // we now have a user logged in silently, so reload this window

      if (redirectIfSilentLoginFailed)
        window.location.href = `/bff/login?returnUrl=${window.location.pathname}`;
    }
  });
};
