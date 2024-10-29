import { useState, useEffect, useCallback } from "react";
import { IconContext } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
import useEphemeralState from "../hooks/useEphemeralState";

const supportsClipboard = import.meta.env.SSR || navigator.clipboard.writeText;

function AboutLink({
  label,
  href,
  withCopyButton,
  children,
}: {
  label: string;
  href: string;
  withCopyButton: boolean;
  children: React.ReactNode;
}) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [ephemeralState, setEphemeralState] = useEphemeralState([{ key: label, default: "idle" }], { delay: 800 });
  const copiedState = ephemeralState.get(label);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const handleCopy = useCallback(
    (label: string) => {
      try {
        navigator.clipboard.writeText(label);
        // sets state for a short period then sets it to the default declared in 1st arg of useEphemeralState
        setEphemeralState(label, "copied");
      } catch {
        // ignore
      }
    },
    [setEphemeralState],
  );

  return (
    <li key={href} className="flex items-center gap-x-2.5 text-garden-content-quiet dark:text-forest-content-quiet">
      {children}
      <a
        className="text-[13px] text-garden-content-quiet underline transition-[color,text-decoration-thickness] hover:text-garden-accent-2 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-forest-content-quiet dark:hover:text-forest-accent"
        href={href}
        target="_blank"
      >
        {label}
      </a>
      {withCopyButton && supportsClipboard && (
        <button
          type="button"
          className="group transition-colors hover:text-garden-content-loud disabled:text-garden-content dark:hover:text-forest-content-loud disabled:dark:text-forest-content"
          disabled={copiedState === "copied"}
          onClick={() => handleCopy(label)}
        >
          <IconContext.Provider value={{ className: "size-3.5 shrink-0", size: "14" }}>
            <AnimatePresence mode="wait">
              {copiedState === "copied" ? (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IoCheckmark />
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={isFirstRender ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IoCopyOutline />
                </motion.div>
              )}
            </AnimatePresence>
          </IconContext.Provider>
        </button>
      )}
    </li>
  );
}

export default AboutLink;
