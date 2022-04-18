/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import { Container } from "theme-ui";
import styled from "styled-components";
import { useRouter } from "next/router";

import { color, fontWeight } from "utils";
import GDPR from "components/business/GDPR";
import Objection from "components/business/Objection";
import TermsOfTrade from "components/business/TermsOfTrade";
import {
  sectionTags,
  sectionObjectsObchInfo,
} from "components/footer/footer.data";

export default function ObchodniInformace() {
  const [activeSectionNr, setActiveSectionNr] = useState(sectionTags.GDPR);
  const router = useRouter();

  const getBodyElement = (tagName) => {
    const section = sectionObjectsObchInfo.find(({ tag }) => tag === tagName);

    if (!section) {
      return "// fail";
    }

    switch (section.tag) {
      case sectionTags.GDPR:
        return <GDPR name={section.name} />;
      case sectionTags.Objection:
        return <Objection name={section.name} />;
      case sectionTags.ToSale:
        return <TermsOfTrade name={section.name} />;
      default:
        return "--";
    }
  };

  useEffect(() => {
    if (!router.query.section) {
      router.query.section = activeSectionNr;
      router.push(router);
    } else {
      setActiveSectionNr(router.query.section);
    }
  }, []);

  const handleSectionChange = (tag) => {
    router.query.section = tag;
    router.push(router);
    setActiveSectionNr(tag);
  };

  return (
    <Container sx={styles.containerBox}>
      <MainHeading>Obchodní Informace</MainHeading>
      <StyledUl>
        {sectionObjectsObchInfo.map(({ name, tag }, index) => (
          <li>
            <StyledAnchor
              isActive={activeSectionNr === tag}
              onClick={() => handleSectionChange(tag)}
            >
              {name}
            </StyledAnchor>
          </li>
        ))}
      </StyledUl>

      {getBodyElement(activeSectionNr)}
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
