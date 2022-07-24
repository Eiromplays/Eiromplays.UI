import { Dialog, Menu, Transition } from '@headlessui/react';
import { Link, MatchRoute } from '@tanstack/react-location';
import clsx from 'clsx';
import * as React from 'react';
import {
  HiOutlineHome,
  HiOutlineMenuAlt2,
  HiOutlineUser,
  HiOutlineX,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from 'react-icons/hi';
import { MdOutlineDevicesOther, MdOutlineHistory } from 'react-icons/md';

import { ThemeToggle } from '@/components/Theme';
import { useAuth } from '@/lib/auth';

import { Button, Spinner } from '../Elements';

export type SideNavigationItem = {
  name: string;
  to: string;
  target?: string;
  externalLink?: boolean;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export type SideNavigationProps = {
  items?: SideNavigationItem[];
};

export const SideNavigation = ({
  items = [
    { name: 'Dashboard', to: '.', icon: HiOutlineHome },
    { name: 'Users', to: 'users', icon: HiOutlineUsers },
    { name: 'Roles', to: 'roles', icon: HiOutlineUsers },
    { name: 'Persisted Grants', to: 'persisted-grants', icon: HiOutlineShieldCheck },
    { name: 'User Sessions', to: 'user-sessions', icon: MdOutlineDevicesOther },
    { name: 'Logs', to: 'logs', icon: MdOutlineHistory },
    {
      name: 'Discovery Document',
      to: 'https://localhost:7001/.well-known/openid-configuration',
      target: '_blank',
      externalLink: true,
      icon: HiOutlineDocumentText,
    },
  ],
}: SideNavigationProps) => {
  const navigationItems = items.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name.toLowerCase() === value.name.toLowerCase())
  );

  return (
    <>
      {navigationItems.map((item) => {
        return item.externalLink ? (
          <a
            key={item.name}
            href={item.to}
            target={item.target}
            className="hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 font-medium rounded-md bg-transparent text-gray-400"
          >
            {item.icon && (
              <item.icon
                className={clsx(
                  'text-gray-400 group-hover:text-gray-300',
                  'mr-4 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
            )}
            {item.name}
          </a>
        ) : (
          <Link
            key={item.name}
            to={item.to}
            target={item.target}
            className={clsx(
              'hover:bg-gray-700 hover:text-white',
              'group flex items-center px-2 py-2 font-medium rounded-md bg-transparent text-gray-400'
            )}
            getActiveProps={() => ({
              className: 'bg-gray-900 text-white',
            })}
            activeOptions={{
              // If the route points to the root of it's parent,
              // make sure it's only active if it's exact
              exact: item.to === '.',
            }}
          >
            {item.icon && (
              <item.icon
                className={clsx(
                  'text-gray-400 group-hover:text-gray-300',
                  'mr-4 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
            )}
            <span className="mr-1.5">{item.name}</span>
            <MatchRoute to={item.to} pending>
              <Spinner size="md" className="inline-block" />
            </MatchRoute>
          </Link>
        );
      })}
    </>
  );
};

export type UserNavigationItem = {
  name: string;
  to: string;
  target?: string;
  externalLink?: boolean;
  onClick?: () => void;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export type UserNavigationProps = {
  items?: UserNavigationItem[];
  addProfileItem?: boolean;
  addSignOutItem?: boolean;
  customButtons?: React.ReactNode;
  identityServerUiUrl?: string;
};

export const UserNavigation = ({
  items = [],
  addProfileItem = true,
  addSignOutItem = true,
  identityServerUiUrl = 'https://localhost:3000/',
  customButtons = (
    <Button
      className="max-w-xs bg-gray-200 dark:bg-gray-600 p-2 flex items-center text-sm rounded-full
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => (window.location.href = identityServerUiUrl)}
    >
      IdentityServer
    </Button>
  ),
}: UserNavigationProps) => {
  const { user, logout } = useAuth();

  if (addProfileItem) {
    const yourProfileItem: UserNavigationItem = {
      name: 'Your Profile',
      to: `${identityServerUiUrl}/app/profile`,
      externalLink: true,
    };
    if (
      !items.some(
        (item: UserNavigationItem) => item.name.toLowerCase() === yourProfileItem.name.toLowerCase()
      )
    )
      items.push(yourProfileItem);
  }

  if (addSignOutItem) {
    const signOutItem: UserNavigationItem = {
      name: 'Sign out',
      to: user?.logoutUrl || '',
      onClick: async () => await logout(),
    };
    if (
      !items.some(
        (item: UserNavigationItem) => item.name.toLowerCase() === signOutItem.name.toLowerCase()
      )
    )
      items.push(signOutItem);
  }

  const navigationItems = items.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name.toLowerCase() === value.name.toLowerCase())
  );

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div className="flex">
            {customButtons}
            <ThemeToggle />
            <Menu.Button
              className="max-w-xs bg-gray-200 dark:bg-gray-600 p-2 flex items-center text-sm rounded-full
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Open user menu</span>
              {user?.profilePicture ? (
                <img alt="Avatar" src={user?.profilePicture} className="h-8 w-8 rounded-full" />
              ) : (
                <HiOutlineUser className="h-8 w-8 rounded-full" />
              )}
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-lighter-black ring-1
              ring-black ring-opacity-5 focus:outline-none"
            >
              {navigationItems.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <>
                      {item.externalLink ? (
                        <a
                          target={item.target}
                          onClick={item.onClick}
                          href={item.to}
                          className={clsx(
                            active ? 'bg-gray-100 dark:bg-gray-800' : '',
                            'block px-4 py-2 text-sm text-gray-700 dark:text-white'
                          )}
                        >
                          {item.icon && (
                            <item.icon
                              className={clsx(
                                'text-gray-400 group-hover:text-gray-300',
                                'mr-4 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                          )}
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          target={item.target}
                          onClick={item.onClick}
                          to={item.to}
                          className={clsx(
                            active ? 'bg-gray-100 dark:bg-gray-800' : '',
                            'block px-4 py-2 text-sm text-gray-700 dark:text-white'
                          )}
                        >
                          {item.icon && (
                            <item.icon
                              className={clsx(
                                'text-gray-400 group-hover:text-gray-300',
                                'mr-4 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                          )}
                          <span className="mr-1.5">{item.name}</span>
                          <MatchRoute to={item.to} pending>
                            <Spinner size="md" className="inline-block" />
                          </MatchRoute>
                        </Link>
                      )}
                    </>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export type MobileSidebarProps = LogoProps &
  SideNavigationProps & {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

export const MobileSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  logo,
  applicationLogoText,
  items: sideNavigationItems,
}: MobileSidebarProps) => {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 md:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <HiOutlineX className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4">
              <Logo logo={logo} applicationLogoText={applicationLogoText} />
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                <SideNavigation items={sideNavigationItems} />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  );
};

export type SideBarProps = LogoProps & SideNavigationProps;

export const Sidebar = ({ logo, applicationLogoText, items }: SideBarProps) => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 dark:bg-indigo-900">
            <Logo logo={logo} applicationLogoText={applicationLogoText} />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800 dark:bg-lighter-black space-y-1">
              <SideNavigation items={items} />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export type LogoProps = {
  logo?: string | undefined;
  applicationLogoText?: string | undefined;
};

export const Logo = ({ logo, applicationLogoText }: LogoProps) => {
  return (
    <Link className="flex items-center text-white" to=".">
      <img className="h-8 w-auto" src={logo} alt="Workflow" />
      <span className="text-xl text-white font-semibold">
        {applicationLogoText ? applicationLogoText : 'Eiromplays IdentityServer'}
      </span>
    </Link>
  );
};

export type MainLayoutProps = LogoProps & {
  children: React.ReactNode;
  userNavigationProps?: UserNavigationProps;
  sideBarNavigationProps?: SideNavigationProps;
};

export const MainLayout = ({
  children,
  userNavigationProps,
  sideBarNavigationProps,
  logo,
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        logo={logo}
        items={sideBarNavigationProps?.items}
      />
      <Sidebar logo={logo} {...sideBarNavigationProps} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <HiOutlineMenuAlt2 className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <UserNavigation {...userNavigationProps} />
            </div>
          </div>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
      </div>
    </div>
  );
};
