
import {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Position = "top" | "bottom" | "left" | "right";
type Variant = "dark" | "light" | "primary" | "destructive";
type Animation = "fadeIn" | "scaleIn" | "slideUp" | "none";

export interface TooltipProps {
  /** The text or content shown inside the tooltip */
  content: ReactNode;
  /** Where the tooltip appears relative to the trigger */
  position?: Position;
  /** Visual style of the tooltip */
  variant?: Variant;
  /** Delay in ms before the tooltip shows */
  delay?: number;
  /** Animation when the tooltip appears */
  animation?: Animation;
  /** Shows a small arrow pointing to the trigger */
  arrow?: boolean;
  /** Prevents the tooltip from showing */
  disabled?: boolean;
  /** The element that triggers the tooltip */
  children: ReactNode;
  className?: string;
}

const GAP = 8; // px between trigger and tooltip (matches mb-2 / mt-2 / ml-2 / mr-2)

const variantStyles: Record<Variant, string> = {
  dark: "bg-zinc-900 text-white dark:ring-1 dark:ring-white/15",
  light: "bg-white text-zinc-900 ring-1 ring-zinc-200 shadow-md",
  primary: "bg-blue-600 text-white",
  destructive: "bg-red-600 text-white",
};

const arrowVariantStyles: Record<Variant, string> = {
  dark: "bg-zinc-900",
  light: "bg-white ring-1 ring-zinc-200",
  primary: "bg-blue-600",
  destructive: "bg-red-600",
};

const placementStyles: Record<Position, string> = {
  top: "bottom-full left-1/2 mb-2",
  bottom: "top-full left-1/2 mt-2",
  left: "right-full top-1/2 mr-2",
  right: "left-full top-1/2 ml-2",
};

const arrowPlacementStyles: Record<Position, string> = {
  top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
};

// Centers the tooltip on the trigger along the axis it is not offset on.
const centering: Record<Position, string> = {
  top: "translateX(-50%)",
  bottom: "translateX(-50%)",
  left: "translateY(-50%)",
  right: "translateY(-50%)",
};

// Where the tooltip starts from before it animates into place.
const slideOffset: Record<Position, string> = {
  top: "translateY(4px)",
  bottom: "translateY(-4px)",
  left: "translateX(4px)",
  right: "translateX(-4px)",
};

function getTransform(
  position: Position,
  animation: Animation,
  shown: boolean
): string {
  const base = centering[position];
  if (shown || animation === "none" || animation === "fadeIn") return base;
  if (animation === "scaleIn") return `${base} scale(0.9)`;
  return `${base} ${slideOffset[position]}`; // slideUp
}

export function Tooltip({
  content,
  position = "top",
  variant = "dark",
  delay = 200,
  animation = "fadeIn",
  arrow = true,
  disabled = false,
  children,
  className = "",
}: TooltipProps) {
  const id = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false); // mounted
  const [shown, setShown] = useState(false); // animated in
  const [actualPosition, setActualPosition] = useState<Position>(position);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const show = useCallback(() => {
    if (disabled) return;
    clearTimer();
    timer.current = setTimeout(() => setOpen(true), delay);
  }, [disabled, delay]);

  const hide = useCallback(() => {
    clearTimer();
    setShown(false);
    setOpen(false);
  }, []);

  // Clean up any pending timer on unmount.
  useEffect(() => clearTimer, []);

  // Hide if the tooltip becomes disabled while visible.
  useEffect(() => {
    if (disabled) hide();
  }, [disabled, hide]);

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hide]);

  // Smart positioning: flip to the opposite side if there's no room.
  useLayoutEffect(() => {
    if (!open || !wrapperRef.current || !tipRef.current) return;
    const trigger = wrapperRef.current.getBoundingClientRect();
    const tip = tipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let next = position;
    if (position === "top" && trigger.top - tip.height - GAP < 0) next = "bottom";
    else if (position === "bottom" && trigger.bottom + tip.height + GAP > vh)
      next = "top";
    else if (position === "left" && trigger.left - tip.width - GAP < 0)
      next = "right";
    else if (position === "right" && trigger.right + tip.width + GAP > vw)
      next = "left";
    setActualPosition(next);
  }, [open, position]);

  // Trigger the enter animation one frame after mounting.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Reset to the requested position whenever it changes.
  useEffect(() => setActualPosition(position), [position]);

  return (
    <span
      ref={wrapperRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={open ? id : undefined}
    >
      {children}

      {open && (
        <span
          ref={tipRef}
          id={id}
          role="tooltip"
          className={[
            "pointer-events-none absolute z-50 w-max max-w-xs rounded-md px-3 py-1.5 text-sm font-medium",
            placementStyles[actualPosition],
            variantStyles[variant],
            animation === "none"
              ? ""
              : "transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
          ].join(" ")}
          style={{
            opacity: shown || animation === "none" ? 1 : 0,
            transform: getTransform(actualPosition, animation, shown),
          }}
        >
          {content}
          {arrow && (
            <span
              aria-hidden="true"
              className={`absolute h-2 w-2 rotate-45 ${arrowPlacementStyles[actualPosition]} ${arrowVariantStyles[variant]}`}
            />
          )}
        </span>
      )}
    </span>
  );
}

export default Tooltip;