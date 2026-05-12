import { useId, useRef, useState } from "react";

interface StepTabsProps {
  steps: string[];
}

const StepTabs = ({ steps }: StepTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const tabId = (index: number) => `${id}-tab-${index}`;
  const panelId = (index: number) => `${id}-panel-${index}`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusableItems = Array.from(
      tabListRef.current?.querySelectorAll<HTMLButtonElement>(
        "button[role='tab']:not(:disabled)",
      ) ?? [],
    );
    const currentIndex = focusableItems.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        nextIndex = (currentIndex + 1) % focusableItems.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        nextIndex =
          (currentIndex - 1 + focusableItems.length) % focusableItems.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = focusableItems.length - 1;
        break;
    }

    if (nextIndex !== null) {
      focusableItems[nextIndex].focus({ preventScroll: true });
      setActiveIndex(nextIndex);
    }
  };

  return (
    <div>
      {/* Tab list */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Recipe steps"
        className="flex flex-wrap gap-2"
        onKeyDown={handleKeyDown}
      >
        {steps.map((_, index) => (
          <button
            key={index}
            id={tabId(index)}
            role="tab"
            type="button"
            aria-selected={activeIndex === index}
            aria-controls={panelId(index)}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              activeIndex === index
                ? "bg-primary text-white"
                : "border border-accent bg-background text-text hover:bg-accent/20",
            ].join(" ")}
          >
            Step {index + 1}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {steps.map((step, index) => (
        <div
          key={index}
          id={panelId(index)}
          role="tabpanel"
          aria-labelledby={tabId(index)}
          tabIndex={0}
          hidden={activeIndex !== index}
          className="mt-3 rounded-md border border-accent/30 p-3 text-text"
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepTabs;
