/** @jsx jsx */
import { jsx, Image } from "theme-ui";
import { Link } from "components/link";

export default function Logo({ src, ...rest }) {
  return (
    <Link
      path="/"
      sx={{
        variant: "links.logo",
        display: "flex",
        cursor: "pointer",
        mr: 15,
        height: "100%",
        position: "relative",
      }}
      {...rest}
    >
      <Image
        src={src}
        alt="startup landing logo"
        sx={{
          height: "60px",
          position: "relative",
          // borderRadius: "20px",
          padding: "10px",
        }}
      />
    </Link>
  );
}
