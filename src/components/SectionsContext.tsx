import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";

type SectionRef = React.RefObject<HTMLDivElement>;
interface ISectionsContext {
  sectionRefs: SectionRef[];
  registerSection: (ref: SectionRef) => void;
  unregisterSection: (ref: SectionRef) => void;
}

export const SectionsContext = createContext<ISectionsContext | null>(null);

export function SectionsProvider({ children }: { children?: React.ReactNode }) {
  const [sectionRefs, setSectionRefs] = useState<SectionRef[]>([]);

  const registerSection = useCallback((ref: SectionRef) => {
    setSectionRefs((prev: SectionRef[]) => [...prev, ref]);
  }, []);

  const unregisterSection = useCallback((ref: SectionRef) => {
    setSectionRefs((prev: SectionRef[]) =>
      prev.filter((prevRef) => prevRef !== ref),
    );
  }, []);

  return (
    <SectionsContext.Provider
      value={{ sectionRefs, registerSection, unregisterSection }}
    >
      {children}
    </SectionsContext.Provider>
  );
}

export function Section({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const sectionsContext = useContext(SectionsContext) as ISectionsContext;

  if (!sectionsContext) {
    throw new Error("<Section> has to be used within <SectionsProvider>");
  }

  const { registerSection, unregisterSection } = sectionsContext;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) throw Error("ref not assigned");
    registerSection(ref);

    return () => {
      unregisterSection(ref);
    };
  }, [registerSection, unregisterSection]);

  // TODO: set scroll-margin-top to the actual header height which should probably come from a css variable
  return (
    <div id={id} ref={ref} className="scroll-mt-16">
      {children}
    </div>
  );
}
