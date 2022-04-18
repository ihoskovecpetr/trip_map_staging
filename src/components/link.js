/** @jsx jsx */
import { jsx } from "theme-ui";
import NextLink from "next/link";
export function NavLink({ path, label, locale, children, ...rest }) {
  return (
    <NextLink href={path} locale={locale}>
      <div {...rest}>{children ? children : label}</div>
    </NextLink>
  );
}
