"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function PreviewSelectionBridge() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<HTMLElement | null>(null);
  const enabled = searchParams.get("cmsPreview") === "1";
  useEffect(() => {
    if (!enabled) return;
    const sectionAt = (target: EventTarget | null) => target instanceof Element ? target.closest<HTMLElement>("[data-cms-section]") : null;
    const onMove = (event: PointerEvent) => setSelected(sectionAt(event.target));
    const onClick = (event: MouseEvent) => { const section = sectionAt(event.target); if (!section) return; event.preventDefault(); event.stopPropagation(); window.parent.postMessage({ type: "kodesk-cms-select", section: section.dataset.cmsSection }, "*"); };
    document.addEventListener("pointermove", onMove, true); document.addEventListener("click", onClick, true);
    return () => { document.removeEventListener("pointermove", onMove, true); document.removeEventListener("click", onClick, true); };
  }, [enabled]);
  if (!enabled || !selected) return null;
  const rect = selected.getBoundingClientRect();
  return <div aria-hidden="true" className="cms-preview-outline" style={{ left: rect.left + window.scrollX, top: rect.top + window.scrollY, width: rect.width, height: rect.height }}><span>{selected.dataset.cmsSection?.replace(".", " · ")}</span></div>;
}
