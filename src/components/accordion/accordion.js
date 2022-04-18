import React from "react";
import { BaseAccordion } from "./base-accordion";
import { useTranslation } from "Hooks/useTranslation";

import {
  AccordionButton,
  AccordionItem,
  AccordionContents,
  single,
  preventClose,
  combineReducers,
} from "./shared";

export default function Accordion({ items, ...props }) {
  const t = useTranslation();

  return (
    <BaseAccordion
      stateReducer={combineReducers(single, preventClose)}
      {...props}
    >
      {({ openIndexes, handleItemClick }) => (
        <>
          {items.map((item, index) => (
            <AccordionItem
              key={item.title}
              isOpen={openIndexes.includes(index)}
            >
              <AccordionButton onClick={() => handleItemClick(index)}>
                <span
                  className={openIndexes.includes(index) ? "open" : "closed"}
                ></span>
                {t(item.title)}
              </AccordionButton>
              <AccordionContents isOpen={openIndexes.includes(index)}>
                {t(item.contents)}
              </AccordionContents>
            </AccordionItem>
          ))}
        </>
      )}
    </BaseAccordion>
  );
}
