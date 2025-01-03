import { useContext, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { CiCloudMoon, CiSun } from "react-icons/ci";
import { SectionsContext } from "./SectionsContext";
import { useProminentSectionReducer } from "../hooks";
import { throttle } from "../utils";

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
      className="max-xs:grid-cols-1 sticky inset-x-0 top-0 z-50 grid w-full grid-cols-[1fr_auto_1fr] justify-start px-4 text-sm md:px-6 lg:px-8"
    >
      <div className="max-sm:hidden" />

      <nav className="max-xs:mx-auto">
        <NavigationPill>
          <div className="relative grow basis-full px-3">
            <div className="flex items-center justify-end">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  className="group relative px-2 py-3 text-garden-content-quiet transition-[color,_font-weight] hover:text-garden-content-loud focus:outline-none aria-[current=true]:border-garden-accent-2 aria-[current=true]:font-medium aria-[current=true]:text-garden-accent-2 dark:text-forest-content dark:hover:text-forest-content-loud dark:aria-[current=true]:text-forest-accent"
                  href={`#${section.id}`}
                  onClick={evt => scrollIntoView(evt, index)}
                  aria-current={sectionsState.prominentSection === section.id}
                >
                  {section.name}
                  <span className="absolute inset-x-1 -bottom-px left-0 h-px w-full bg-gradient-to-r from-garden-accent-2/0 via-garden-accent-2/40 to-garden-accent-2/0 opacity-0 transition-opacity group-aria-[current=true]:opacity-100 dark:from-forest-accent/0 dark:via-forest-accent/40 dark:to-forest-accent/0" />
                </a>
              ))}
            </div>
          </div>
        </NavigationPill>
      </nav>

      <div className="max-xs:hidden flex justify-end max-sm:col-start-3">
        <NavigationPill isButton>
          <button
            type="button"
            className="relative flex aspect-square size-full items-center justify-center rounded-full p-3 text-garden-content-quiet focus:outline-none dark:text-forest-content"
            onClick={() => onToggleTheme()}
          >
            <span className="sr-only dark:hidden">Dark</span>
            <IconContext.Provider value={{ className: "size-5 shrink-0 dark:hidden", size: "32" }}>
              <CiCloudMoon />
            </IconContext.Provider>
            <span className="sr-only dark:inline">Light</span>
            <IconContext.Provider value={{ className: "size-5 shrink-0 hidden dark:inline-block", size: "32" }}>
              <CiSun />
            </IconContext.Provider>
          </button>
        </NavigationPill>
      </div>
    </header>
  );
}

function NavigationPill({ children, isButton = false }: { children?: React.ReactNode; isButton?: boolean }) {
  let noiseClasses = "absolute bg-noise bg-transparent bg-[size:220px] bg-repeat contrast-150";

  if (!isButton) {
    noiseClasses = `${noiseClasses} inset-0 size-full opacity-75 dark:opacity-25 [mask-image:linear-gradient(transparent,black)]`;
  } else {
    noiseClasses = `${noiseClasses} bottom-0 left-0 size-full opacity-100 dark:opacity-60 [mask-image:radial-gradient(circle_at_100%_10%,rgba(0,0,0,0.15)_55%,black_100%)]`;
  }

  return (
    <div
      data-is-button={isButton}
      className="group relative mt-4 flex w-max max-w-2xl items-center justify-between rounded-full border border-garden-content-quiet-2 dark:border-forest-content-quiet-2"
    >
      {/* grainy, blurry background */}
      {/* based on: https://ibelick.com/blog/create-grainy-backgrounds-with-css */}
      <div className="absolute inset-0 isolate size-full overflow-hidden rounded-full">
        <div className="relative isolate size-full backdrop-blur transition-colors group-data-[is-button=true]:group-hover:bg-garden-content-quiet-2/50 dark:bg-forest-base/50 group-data-[is-button=true]:group-hover:dark:bg-forest-content-quiet-2/50">
          <div className={noiseClasses} />
        </div>
      </div>

      {children}
    </div>
  );
}

export default Navigation;
