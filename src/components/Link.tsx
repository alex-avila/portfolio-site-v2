interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  textSize?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}
function Link({ href, textSize = "text-xs", isExternal, children, ...props }: LinkProps) {
  const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a
      className={
        `${textSize} ` +
        "text-garden-content-quiet underline transition-colors hover:text-garden-accent-2 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-forest-content-quiet dark:hover:text-forest-accent"
      }
      href={href}
      target={isExternal ? "_blank" : undefined}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
}

export default Link;
