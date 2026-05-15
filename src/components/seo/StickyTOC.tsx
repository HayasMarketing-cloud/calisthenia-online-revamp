import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

interface StickyTOCProps {
  items: TocItem[];
}

const StickyTOC = ({ items }: StickyTOCProps) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* Mobile chips */}
      <nav
        aria-label="Índice de la página"
        className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-2 bg-background/90 backdrop-blur border-b border-border/40 overflow-x-auto"
      >
        <ul className="flex gap-2 whitespace-nowrap">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeId === it.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/60 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop sticky TOC */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            En esta página
          </p>
          <ul className="space-y-1 border-l border-border">
            {items.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className={`block pl-4 -ml-px py-1.5 text-sm border-l-2 transition-colors ${
                    activeId === it.id
                      ? "border-primary text-primary font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default StickyTOC;
