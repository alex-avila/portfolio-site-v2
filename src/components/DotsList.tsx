function DotsList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map(item => (
        <li
          key={item}
          className="relative inline-block pe-4 text-xs text-garden-content-loud before:absolute before:end-1.5 before:top-[calc(50%+1px)] before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-garden-content-quiet last:pe-0 last-of-type:before:hidden dark:text-forest-content-loud dark:before:bg-forest-content-quiet"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default DotsList;
