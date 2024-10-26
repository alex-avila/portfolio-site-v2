import { useReducer } from "react";

interface SectionEntryBase {
  sectionId: string;
  sectionIntersectingHeight: number;
  sectionIntersectingRatio: number;
}
type SectionEntry = SectionEntryBase & IntersectionObserverEntry;

interface InitialState {
  sections: Map<string, SectionEntry>;
  prominentSection: string;
}

type ActionType = { type: "updated" | "removed"; sectionIdsInOrder: string[]; sectionEntry: IntersectionObserverEntry };

export const initialState: InitialState = {
  sections: new Map(),
  prominentSection: "",
};

export function prominentSectionReducer(state: InitialState, action: ActionType): InitialState {
  const { type, sectionEntry } = action;

  const getSectionEntryId = (entry: IntersectionObserverEntry) => {
    return entry.target.getAttribute("id") || "";
  };
  const normalizeSectionEntry = (entry: IntersectionObserverEntry): SectionEntry => {
    if (action.type !== "updated") {
      throw new Error("Unable to normalize section outside of 'updated' action type");
    }

    return {
      ...entry,
      sectionId: getSectionEntryId(entry),
      sectionIntersectingHeight: entry.intersectionRect.height,
      sectionIntersectingRatio: entry.intersectionRatio,
    };
  };

  switch (type) {
    case "updated": {
      const sectionEntryNormalized = normalizeSectionEntry(sectionEntry);
      const sections = new Map(state.sections).set(sectionEntryNormalized.sectionId, sectionEntryNormalized);

      // find the prominent section
      // - first check for sections that are fully shown
      // - - reason: a partially shown section may be taking up more space than a fully shown section but the fully
      // - - ...shown section is more important
      // - if multiple full sections, the first one in order of appearance in the UI is more important
      // - if no full sections, check for heights, we wanna say that a section taking up more space is more important
      // - if multiple w/same height, the first one in order of appearance in the UI is more important
      const sortedSections = Array.from(sections.values()).sort((a, b) => {
        const { sectionIntersectingRatio: aRatio, sectionIntersectingHeight: aHeight } = a;
        const { sectionIntersectingRatio: bRatio, sectionIntersectingHeight: bHeight } = b;

        if (aRatio === 1 && bRatio !== 1) return -1; // if a is fully visible, prioritize it
        if (bRatio === 1 && aRatio !== 1) return 1; // if b is fully visible, prioritize it

        // if both are fully visible, prioritize the one that appears first
        if (aRatio === 1 && bRatio === 1) {
          return action.sectionIdsInOrder.indexOf(a.sectionId) - action.sectionIdsInOrder.indexOf(b.sectionId);
        }

        // if none are fully visible, prioritize the one that is taking up more of the space (larger height)
        if (aHeight !== bHeight) return bHeight - aHeight;

        // default to the section that appears first in the UI
        return action.sectionIdsInOrder.indexOf(a.sectionId) - action.sectionIdsInOrder.indexOf(b.sectionId);
      });

      return { sections, prominentSection: sortedSections[0]?.sectionId };
    }
    case "removed": {
      const sections = new Map(state.sections);
      sections.delete(getSectionEntryId(sectionEntry));
      return { ...state, sections };
    }
    default: {
      throw new Error(`Unknown action type ${type}`);
    }
  }
}

export const useProminentSectionReducer = () => useReducer(prominentSectionReducer, initialState);
