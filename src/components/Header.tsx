const links = [
  {
    id: "about",
    name: "About",
  },
  {
    id: "skills",
    name: "Skills",
  },
  {
    id: "experience",
    name: "Experience",
  },
  {
    id: "projects",
    name: "Projects",
  },
];

function Header() {
  // TODO: make navigation actually work, w/smooth scroll, transitions, accessibility
  return (
    <header className="sticky inset-x-0 top-0 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start">
      <nav className="relative mx-auto mt-4 flex w-max max-w-2xl items-center justify-between rounded-[2rem] border border-gray-200 bg-white py-2.5 md:px-4 md:py-0 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="hs-collapse grow basis-full overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-end gap-2">
            {links.map((link) => (
              <a
                key={link.id}
                className="border-b-2 border-transparent px-4 py-0.5 text-gray-500 hover:text-gray-800 focus:outline-none aria-selected:border-gray-800 aria-selected:font-medium aria-selected:text-gray-800 md:px-1 md:py-3 dark:text-neutral-400 dark:hover:text-neutral-200 dark:aria-selected:border-neutral-200 dark:aria-selected:text-neutral-200"
                href={`#${link.id}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
