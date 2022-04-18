/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import { Container } from "theme-ui";
import styled from "styled-components";
import { useRouter } from "next/router";

import { color, fontWeight } from "utils";
import AboutComponent from "components/about/AboutComponent";
import Contact from "components/about/Contact";
import {
  sectionTags,
  sectionObjectsAbout,
} from "components/footer/footer.data";

export default function About() {
  const [activeSectionTag, setActiveSectionTag] = useState(sectionTags.About);
  const router = useRouter();

  const getBodyElement = (tagName) => {
    const section = sectionObjectsAbout.find(({ tag }) => tag === tagName);

    if (!section) {
      return "// fail";
    }

    switch (section.tag) {
      case sectionTags.About:
        return <AboutComponent name={section.name} />;
      case sectionTags.Contact:
        return <Contact name={section.name} />;
      default:
        return "--";
    }
  };

  useEffect(() => {
    if (!router.query.section) {
      router.query.section = activeSectionTag;
      router.push(router);
    } else {
      setActiveSectionTag(router.query.section);
    }
  }, []);

  const handleSectionChange = (tag) => {
    router.query.section = tag;
    router.push(router);
    setActiveSectionTag(tag);
  };

  return (
    <Container sx={styles.containerBox}>
      <MainHeading>O nás</MainHeading>
      <StyledUl>
        {sectionObjectsAbout.map(({ name, tag }, index) => (
          <li>
            <StyledAnchor
              isActive={activeSectionTag === tag}
              onClick={() => handleSectionChange(tag)}
            >
              {name}
            </StyledAnchor>
          </li>
        ))}
      </StyledUl>

      {getBodyElement(activeSectionTag)}
    </Container>
  );
}

const MainHeading = styled.h1`
  width: 100%;
  height: 100%;
`;

const StyledUl = styled.ul``;

const StyledAnchor = styled.a`
  text-decoration: underline;
  cursor: pointer;
  font-weight: ${({ isActive }) => isActive && fontWeight("bold")};
`;

const styles = {
  containerBox: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: ["wrap", null, null, "nowrap"],
    paddingTop: "70px",
  },
};
