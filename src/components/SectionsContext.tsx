import { createContext, useContext, useEffect, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

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
    setSectionRefs((prev: SectionRef[]) => prev.filter(prevRef => prevRef !== ref));
  }, []);

  return (
    <SectionsContext.Provider value={{ sectionRefs, registerSection, unregisterSection }}>
      {children}
    </SectionsContext.Provider>
  );
}

export function Section({
  id,
  withMotion = true,
  delay = 0,
  children,
}: {
  id: string;
  withMotion?: boolean;
  delay?: number;
  children?: React.ReactNode;
}) {
  const sectionsContext = useContext(SectionsContext);

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

  const content = (
    <section id={id} ref={ref} className="scroll-mt-[var(--header-height,4.75rem)]">
      {children}
    </section>
  );

  return withMotion ? (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      {content}
    </motion.div>
  ) : (
    content
  );
}
