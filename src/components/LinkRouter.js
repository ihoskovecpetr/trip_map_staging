/** @jsx jsx */
import { jsx, NavLink as MenuLink, Link as A } from "theme-ui";
import { useRouter } from "next/router";

export default function LinkRouter({ path, label, children, ...rest }) {
  const router = useRouter();

  const redirectTo = (localPath) => {
    router.push(localPath);
  };

  return (
    <div onClick={() => redirectTo(path)} {...rest}>
      {children ? children : label}
    </div>
  );
}
