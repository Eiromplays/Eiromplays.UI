// Original source code: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L311

import { Link, LinkProps, useLocation, useResolvePath } from "@tanstack/react-location";
import React from "react";

export interface NavLinkProps
  extends Omit<LinkProps, "className" | "style" | "children"> {
  children?:
    | React.ReactNode
    | ((props: { isActive: boolean }) => React.ReactNode);
  caseSensitive?: boolean;
  className?: string | ((props: { isActive: boolean }) => string | undefined);
  end?: boolean;
  style?:
    | React.CSSProperties
    | ((props: { isActive: boolean }) => React.CSSProperties);
}

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLinkWithRef(
    {
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      children,
      ...rest
    },
    ref
  ) {
    let location = useLocation();
    const resolvePath = useResolvePath();
    const path = resolvePath(to as string);

    let locationPathname = location.current.pathname;
    let toPathname = path;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      toPathname = toPathname.toLowerCase();
    }

    let isActive =
      locationPathname === toPathname ||
      (!end &&
        locationPathname.startsWith(toPathname) &&
        locationPathname.charAt(toPathname.length) === "/");

    let ariaCurrent = isActive ? ariaCurrentProp : undefined;

    let className: string | undefined;
    if (typeof classNameProp === "function") {
      className = classNameProp({ isActive });
    } else {
      // If the className prop is not a function, we use a default `active`
      // class for <NavLink />s that are active. In v5 `active` was the default
      // value for `activeClassName`, but we are removing that API and can still
      // use the old default behavior for a cleaner upgrade path and keep the
      // simple styling rules working as they currently do.
      className = [classNameProp, isActive ? "active" : null]
        .filter(Boolean)
        .join(" ");
    }

    let style =
      typeof styleProp === "function" ? styleProp({ isActive }) : styleProp;

    return (
      <Link
        {...rest}
        aria-current={ariaCurrent}
        className={className}
        _ref={ref}
        style={style}
        to={to}
      >
        {typeof children === "function" ? children({ isActive }) : children}
      </Link>
    );
  }
);