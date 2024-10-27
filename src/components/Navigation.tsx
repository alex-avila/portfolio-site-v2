import { useContext, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { CiCloudMoon, CiSun } from "react-icons/ci";
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
  onToggleTheme: () => void;
}
function Navigation({ sections, onToggleTheme }: INavigationProps) {
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
    <header
      ref={navigationRef}
      className="sticky inset-x-0 top-0 z-50 grid w-full grid-cols-[1fr_auto_1fr] justify-start px-4 text-sm md:px-6 lg:px-8"
    >
      <div className="max-sm:hidden" />

      <nav>
        <NavigationPill>
          <div className="relative grow basis-full px-4">
            <div className="flex items-center justify-end">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  className="text-garden-content-quiet hover:text-garden-content-loud aria-selected:border-garden-accent-2 aria-selected:text-garden-accent-2 dark:text-forest-content dark:hover:text-forest-content-loud dark:aria-selected:text-forest-accent group relative px-3 py-3 transition-[color,_font-weight] duration-300 focus:outline-none aria-selected:font-medium"
                  href={`#${section.id}`}
                  onClick={evt => scrollIntoView(evt, index)}
                  aria-selected={sectionsState.prominentSection === section.id}
                >
                  {section.name}
                  <span className="from-garden-accent-2/0 via-garden-accent-2/40 to-garden-accent-2/0 dark:from-forest-accent/0 dark:via-forest-accent/40 dark:to-forest-accent/0 absolute inset-x-1 -bottom-px left-0 h-px w-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-aria-selected:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </NavigationPill>
      </nav>

      <div className="flex justify-end max-sm:col-start-3">
        <NavigationPill isButton>
          <button
            type="button"
            className="text-garden-content-quiet dark:text-forest-content relative flex aspect-square size-full items-center justify-center rounded-full p-4 focus:outline-none"
            onClick={() => onToggleTheme()}
          >
            <span className="sr-only dark:hidden">Dark</span>
            <IconContext.Provider value={{ className: "size-4 shrink-0 dark:hidden", size: "32" }}>
              <CiCloudMoon />
            </IconContext.Provider>
            <span className="sr-only dark:inline">Light</span>
            <IconContext.Provider value={{ className: "size-4 shrink-0 hidden dark:inline-block", size: "32" }}>
              <CiSun />
            </IconContext.Provider>
          </button>
        </NavigationPill>
      </div>
    </header>
  );
}

function NavigationPill({ children, isButton = false }: { children?: React.ReactNode; isButton?: boolean }) {
  return (
    <div className="border-garden-content-quiet-2 dark:border-forest-content-quiet-2 group relative mt-4 flex w-max max-w-2xl items-center justify-between rounded-full border">
      {/* grainy, blurry background */}
      <div className="absolute inset-0 size-full overflow-hidden rounded-full">
        <div className="relative isolate size-full backdrop-blur">
          <div
            className="absolute bottom-0 left-0 z-10 h-[220px] w-full bg-repeat opacity-75 contrast-[150%] [mask-image:linear-gradient(to_top,black,transparent_2.75rem)] dark:opacity-15 dark:brightness-[200%] dark:[mask-image:linear-gradient(to_top,black,transparent_2.75rem)]"
            style={{ backgroundImage: `url(${noiseSvg})` }}
          />
          {isButton ? (
            <div className="bg-garden-base/40 dark:bg-forest-base/50 group-hover:bg-garden-content-quiet-2/40 group-hover:dark:bg-forest-content-quiet-2/50 absolute inset-0 size-full transition-colors duration-300" />
          ) : (
            <div className="bg-garden-base/40 dark:bg-forest-base/50 absolute inset-0 size-full" />
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default Navigation;
