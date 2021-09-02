import { produce } from "immer";

export const getSortedArrays = (journeys) => {
  const journeysGrouped = journeys.reduce((acc, cur) => {
    if (acc.length === 0) {
      return [[cur]];
    }

    const lastGroup = acc[acc.length - 1];
    const lastItem = lastGroup[lastGroup.length - 1];

    const { groupIndex } = lastItem;

    if (cur.groupIndex !== groupIndex) {
      return produce(acc, (draft) => {
        draft.push([cur]);
      });
    }

    return produce(acc, (draft) => {
      draft[acc.length - 1].push(cur);
    });
  }, []);

  return journeysGrouped;
};
