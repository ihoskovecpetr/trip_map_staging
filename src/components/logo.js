/** @jsx jsx */
import { jsx, Image } from "theme-ui";
import { Link } from "components/link";
import { useRouter } from "next/router";

export default function Logo({ src, ...rest }) {
  const router = useRouter();
  return (
    // <Link
    //   path="/"
    //   sx={{
    //     variant: "links.logo",
    //     display: "flex",
    //     cursor: "pointer",
    //     mr: 15,
    //     height: "100%",
    //     position: "relative",
    //     zIndex: 10,
    //   }}
    //   {...rest}
    // >
    <div
      sx={{
        variant: "links.logo",
        display: "flex",
        cursor: "pointer",
        mr: 15,
        height: "100%",
        position: "relative",
        zIndex: 10,
      }}
    >
      <Image
        src={src}
        alt="startup landing logo"
        onClick={() => router.push("/")}
        sx={{
          height: "60px",
          position: "relative",
          // borderRadius: "20px",
          padding: "10px",
        }}
      />
      {/* </Link> */}
    </div>
  );
}
