/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Image } from "theme-ui";
import { useRouter } from "next/router";
import UnderlineLoader from "./UnderlineLoader";
import { PlayCircleFilledWhite } from "@material-ui/icons";

const homePath = "/";

export default function Logo({ src, ...rest }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <div
      sx={{
        variant: "links.logo",
        display: "flex",
        cursor: "pointer",
        mr: 15,
        height: "100%",
        position: "relative",
        zIndex: 10,
        color: "white",
        flex: 0,
        flexBasis: "150px",
      }}
    >
      <Image
        src={src}
        alt="trip map logo"
        onClick={() => {
          if (router.pathname === homePath) {
            return;
          }
          setIsLoading(true);
          router.push("/");
        }}
        sx={{
          height: "60px",
          position: "relative",
          // borderRadius: "20px",
          padding: "10px 0",
        }}
      />
      {isLoading && <UnderlineLoader />}
    </div>
  );
}
