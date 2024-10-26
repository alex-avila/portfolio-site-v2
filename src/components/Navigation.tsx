import { useContext, useEffect, useRef, useState } from "react";
import { SectionsContext } from "./SectionsContext";
import { useProminentSectionReducer } from "../hooks";
import { throttle } from '../utils'

const generateThresholds = (countBy: number) => {
  const thresholds = [];
  for (let step = countBy; step < 100; step = step + countBy) {
    thresholds.push(step / 100);
  }

  return [...thresholds, 1];
};

interface INavigationProps {
  sections: Array<{ id: string; name: string }>;
}
function Navigation({ sections }: INavigationProps) {
  const sectionsContext = useContext(SectionsContext);

  if (!sectionsContext) {
    throw new Error("<Navigation> has to be used within <SectionsProvider>");
  }

  const { sectionRefs } = sectionsContext;

  const [sectionsState, dispatch] = useProminentSectionReducer();
  const [headerHeight, setHeaderHeight] = useState<number>(64);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const rootMargin = `-${headerHeight}px 0px 0px`;
    const idsInOrder = sectionRefs.map((ref) => ref.current?.id).filter((id) => typeof id === "string");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch({ type: "updated", sectionIdsInOrder: idsInOrder, sectionEntry: entry });
          } else {
            dispatch({ type: "removed", sectionEntry: entry });
          }
        });
      },
      {
        threshold: generateThresholds(5),
        rootMargin,
      },
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs, headerHeight, dispatch]);

  useEffect(() => {
    if (!navigationRef.current) {
      throw new Error("navigationRef not assinged");
    }

    const updateHeaderHeight = () => {
      const { bottom } = (navigationRef.current as HTMLElement).getBoundingClientRect();

      setHeaderHeight(bottom);

      const root = document.querySelector(":root") as HTMLElement;
      root.style.setProperty("--header-height", `${(bottom + 12) / 16}rem`);
    };
    const updateHeaderHeightThrottled = throttle(updateHeaderHeight, 100);

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeightThrottled);

    return () => {
      window.removeEventListener('resize', updateHeaderHeightThrottled)
    }
  }, []);

  const scrollIntoView = (evt: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    evt.preventDefault();

    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = (evt.target as HTMLAnchorElement).getAttribute("href")?.slice(1);

    if (!sectionId) return;

    const sectionRef = sectionRefs?.find((ref) => ref.current?.id === sectionId);

    if (!sectionRef?.current) return;

    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={navigationRef}
      className="sticky inset-x-0 top-0 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start"
    >
      <nav className="relative mx-auto mt-4 flex w-max max-w-2xl items-center justify-between rounded-[2rem] border border-gray-200 bg-white py-2.5 md:px-4 md:py-0 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="hs-collapse grow basis-full overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-end gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                className="border-b-2 border-transparent px-4 py-0.5 text-gray-500 hover:text-gray-800 focus:outline-none aria-selected:border-gray-800 aria-selected:font-medium aria-selected:text-gray-800 md:px-1 md:py-3 dark:text-neutral-400 dark:hover:text-neutral-200 dark:aria-selected:border-neutral-200 dark:aria-selected:text-neutral-200"
                href={`#${section.id}`}
                onClick={(evt) => scrollIntoView(evt, index)}
                aria-selected={sectionsState.prominentSection === section.id}
              >
                {section.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
