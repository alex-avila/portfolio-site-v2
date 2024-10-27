import { useContext, useEffect, useRef, useState } from "react";
import { SectionsContext } from "./SectionsContext";
import { useProminentSectionReducer } from "../hooks";
import { throttle } from "../utils";
import noiseSvg from "../assets/noise.svg";

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
    const idsInOrder = sectionRefs.map(ref => ref.current?.id).filter(id => typeof id === "string");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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

    sectionRefs.forEach(ref => {
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
      window.removeEventListener("resize", updateHeaderHeightThrottled);
    };
  }, []);

  const scrollIntoView = (evt: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    evt.preventDefault();

    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = (evt.target as HTMLAnchorElement).getAttribute("href")?.slice(1);

    if (!sectionId) return;

    const sectionRef = sectionRefs?.find(ref => ref.current?.id === sectionId);

    if (!sectionRef?.current) return;

    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header ref={navigationRef} className="sticky inset-x-0 top-0 z-50 flex w-full justify-start text-sm">
      <nav className="relative mx-auto mt-4 flex w-max max-w-2xl items-center justify-between rounded-full border border-garden-content-quiet-2 px-4 dark:border-forest-content-quiet-2">
        {/* grainy, blurry background */}
        <div className="absolute inset-0 size-full overflow-hidden rounded-full">
          <div className="relative isolate size-full backdrop-blur">
            <div
              className="absolute inset-0 z-10 size-[200%] opacity-70 brightness-[125%] contrast-100 [mask-image:linear-gradient(to_top,black,transparent_200%)] dark:opacity-15 dark:brightness-100 dark:contrast-200"
              style={{ backgroundImage: `url(${noiseSvg})` }}
            />
            <div className="absolute inset-0 size-full bg-garden-base/50 mix-blend-multiply dark:bg-forest-base/50" />
          </div>
        </div>

        <div className="relative grow basis-full transition-all duration-300">
          <div className="flex items-center justify-end">
            {sections.map((section, index) => (
              <a
                key={section.id}
                className="group relative px-3 py-3 text-garden-content-quiet hover:text-garden-content-loud focus:outline-none aria-selected:border-garden-content-loud aria-selected:font-medium aria-selected:text-garden-content-loud dark:text-forest-content dark:hover:text-forest-content-loud dark:aria-selected:text-forest-content-loud"
                href={`#${section.id}`}
                onClick={evt => scrollIntoView(evt, index)}
                aria-selected={sectionsState.prominentSection === section.id}
              >
                {section.name}
                {/* TODO: remove the grayscale when you decide on an accent color */}
                <span className="absolute inset-x-1 -bottom-px left-0 hidden h-px w-full bg-gradient-to-r from-garden-accent/0 via-garden-accent to-garden-accent/0 group-aria-selected:block dark:from-forest-accent/0 dark:via-forest-accent dark:to-forest-accent/0" />
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
