import { Fragment, MouseEventHandler } from "react";
import { motion, MotionStyle, useMotionValue, useSpring, useTransform } from "motion/react";
import { IconContext } from "react-icons";
import { CiLink } from "react-icons/ci";
import DotsList from "./DotsList";
import Link from "./Link";

const ROTATE_DEG = 8;
const SCALE_UP = 1.025;

const getMousePosition = (event: React.MouseEvent<Element, MouseEvent>) => {
  const { width, height } = event.currentTarget.getBoundingClientRect();
  const { offsetX, offsetY } = event.nativeEvent;

  return {
    offsetX,
    offsetY,
    offsetXPercentage: Math.max(0, Math.min(1, offsetX / width)),
    offsetYPercentage: Math.max(0, Math.min(1, offsetY / height)),
  };
};

interface ProjectProps {
  title: string;
  image: string;
  description: string;
  skills: string[];
  sourceCodeLink: string;
  link?: string;
}

function Project({ title, image, description, skills, sourceCodeLink, link }: ProjectProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useSpring(1, { bounce: 0 });

  const shineX = useTransform(() => x.get() + "px");
  const shineY = useTransform(() => y.get() + "px");

  const xPercent = useSpring(0.5, { bounce: 0 });
  const yPercent = useSpring(0.5, { bounce: 0 });
  const rotateX = useTransform(yPercent, [0, 1], [`-${ROTATE_DEG}deg`, `${ROTATE_DEG}deg`]);
  const rotateY = useTransform(xPercent, [0, 1], [`${ROTATE_DEG}deg`, `-${ROTATE_DEG}deg`]);

  const handleMouseMove: MouseEventHandler = (event: React.MouseEvent<Element, MouseEvent>) => {
    const { offsetX, offsetY, offsetXPercentage, offsetYPercentage } = getMousePosition(event);

    x.set(offsetX);
    y.set(offsetY);
    xPercent.set(offsetXPercentage);
    yPercent.set(offsetYPercentage);
  };

  const handleMouseEnter = (event: React.MouseEvent<Element, MouseEvent>) => {
    const { offsetX, offsetY } = getMousePosition(event);

    scale.set(SCALE_UP);
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    xPercent.set(0.5);
    yPercent.set(0.5);
    scale.set(1);
  };

  const shineOverlayElement = (
    <div
      className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
      style={{
        backgroundImage: "radial-gradient(at var(--shine-x) var(--shine-y), rgba(255,255,255) 10%, transparent 80%)",
      }}
    />
  );

  const ShineOverlayComponent = link ? "a" : "div";
  const TitleWrapper = link ? "a" : Fragment;
  const titleWrapperLinkProps = link ? { href: link, target: "_blank" } : {};

  return (
    <li key={title}>
      <div className="grid grid-cols-1 gap-3 [perspective:999px] sm:grid-cols-[auto_1fr] sm:gap-5">
        <div className="mb-0.5 sm:hidden">
          <TitleWrapper {...titleWrapperLinkProps}>
            {link ? (
              <h3 className="text-sm font-semibold text-garden-content-loud underline transition-colors hover:text-garden-accent-2 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-forest-content-loud dark:hover:text-forest-accent">
                {title}
              </h3>
            ) : (
              <h3 className="text-sm font-semibold text-garden-content-loud dark:text-forest-content-loud">{title}</h3>
            )}
          </TitleWrapper>
        </div>
        <motion.div
          className="group relative aspect-[1.68] w-full overflow-hidden rounded border bg-garden-content/40 sm:top-1 sm:aspect-[1.5] sm:w-48 dark:border-forest-content-quiet-2 dark:bg-forest-base/90"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={
            {
              transformStyle: "preserve-3d",
              rotateX,
              rotateY,
              scale,
              "--shine-x": shineX,
              "--shine-y": shineY,
              "--gradient-color": "#579f79",
              "--gradient-color-dark": "#e5b083aa",
            } as MotionStyle
          }
        >
          <ShineOverlayComponent
            className="absolute inset-0 z-10 bg-[radial-gradient(at_var(--shine-x)_var(--shine-y),_var(--gradient-color)_10%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:bg-[radial-gradient(at_var(--shine-x)_var(--shine-y),_var(--gradient-color-dark)_10%,transparent_80%)]"
            {...(link && { href: link, target: "_blank" })}
          >
            {shineOverlayElement}
            {link && <span className="sr-only">{title}</span>}
          </ShineOverlayComponent>
          <img className="absolute inset-0 size-full object-contain" src={image} />
        </motion.div>
        <div>
          <div className="max-sm:hidden">
            <TitleWrapper {...titleWrapperLinkProps}>
              {link ? (
                <h3 className="text-sm font-semibold text-garden-content-loud underline transition-colors hover:text-garden-accent-2 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-forest-content-loud dark:hover:text-forest-accent">
                  {title}
                </h3>
              ) : (
                <h3 className="text-sm font-semibold text-garden-content-loud dark:text-forest-content-loud">
                  {title}
                </h3>
              )}
            </TitleWrapper>
          </div>
          <p className="text-sm text-garden-content-loud sm:mt-1 dark:text-forest-content-loud">{description}</p>
          <Link href={sourceCodeLink} isExternal>
            <div className="mt-1 flex items-center gap-1">
              <IconContext.Provider value={{ className: "size-3.5 shrink-0", size: "14" }}>
                <CiLink />
              </IconContext.Provider>
              Source code
            </div>
          </Link>
          <div className="mt-2">
            <DotsList items={skills} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default Project;
