import { useState, useEffect, useCallback, memo } from "react";
import { IconContext } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
import useEphemeralState from "../hooks/useEphemeralState";

const COPIED_STATES = {
  IDLE: "idle",
  COPIED: "copied",
} as const;

interface AboutLinkProps {
  label: string;
  href: string;
  withCopyButton: boolean;
  children: React.ReactNode;
}

function AboutLink({ label, href, withCopyButton, children }: AboutLinkProps) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [supportsClipboard, setSupportsClipboard] = useState(true);
  const [ephemeralState, setEphemeralState] = useEphemeralState([{ key: label, default: COPIED_STATES.IDLE }]);
  const copiedState = ephemeralState.get(label);

  useEffect(() => {
    setSupportsClipboard("clipboard" in navigator && typeof navigator.clipboard.writeText === "function");
  }, []);

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
        setEphemeralState(label, COPIED_STATES.COPIED);
      } catch {
        // ignore
      }
    },
    [setEphemeralState],
  );

  return (
    <li key={href} className="flex items-end gap-x-2.5 text-garden-content-quiet dark:text-forest-content-quiet">
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
          className="group -translate-y-0.5 transition-[color] hover:text-garden-content-loud disabled:text-garden-content dark:hover:text-forest-content-loud disabled:dark:text-forest-content"
          disabled={copiedState === COPIED_STATES.COPIED}
          onClick={() => handleCopy(label)}
        >
          <span className="sr-only" aria-live="polite">
            {copiedState === COPIED_STATES.IDLE ? "copy" : "copied"}
          </span>
          <IconContext.Provider value={{ className: "size-[13px] shrink-0", size: "13" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={copiedState}
                initial={isFirstRender ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {copiedState === COPIED_STATES.COPIED ? <IoCheckmark /> : <IoCopyOutline />}
              </motion.div>
            </AnimatePresence>
          </IconContext.Provider>
        </button>
      )}
    </li>
  );
}

export default memo(AboutLink);
