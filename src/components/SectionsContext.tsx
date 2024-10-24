import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SectionsContextProps {
  sectionRefs?: Array<any>;
  registerSection?: (ref: any) => void;
  unregisterSection?: (ref: any) => void;
}

export const SectionsContext = createContext<SectionsContextProps>({});

// TODO: improve the types
export function SectionsProvider({ children }: { children?: React.ReactNode }) {
  const [sectionRefs, setSectionRefs] = useState<any>([]);

  const registerSection = (ref: any) => {
    setSectionRefs((prev: any[]) => [...prev, ref]);
  };

  const unregisterSection = (ref: any) => {
    setSectionRefs((prev: any[]) => prev.filter((prevRef) => prevRef !== ref));
  };

  return (
    <SectionsContext.Provider
      value={{ sectionRefs, registerSection, unregisterSection }}
    >
      {children}
    </SectionsContext.Provider>
  );
}

export function Section({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: string;
}) {
  const ref = useRef(null);

  const { registerSection = () => {}, unregisterSection = () => {} } =
    useContext(SectionsContext);

  useEffect(() => {
    registerSection(ref);

    return () => {
      unregisterSection(ref);
    };
  }, []);

  // TODO: set scroll-margin-top to the actual header height which should probably come from a css variable

  return (
    <div id={id} ref={ref} className="scroll-mt-16">
      {children}
    </div>
  );
}
