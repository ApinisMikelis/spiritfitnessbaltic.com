import { PropsWithChildren, useEffect, useRef } from "react";

export type Position = { x: number; y: number };

export type CursorAnimationConfig = {
  starAnimationDuration: number;
  minTimeBetweenStars: number;
  minDistanceBetweenStars: number;
  glowDuration: number;
  maxGlowPointSpacing: number;
  colors: string[];
  paths?: string[];
};

export type CursorAnimationProps = PropsWithChildren & {
  config?: Partial<CursorAnimationConfig & { animations: string[] }>;
};

const defaultConfig: CursorAnimationConfig = {
  starAnimationDuration: 1500,
  minTimeBetweenStars: 250,
  minDistanceBetweenStars: 75,
  glowDuration: 75,
  maxGlowPointSpacing: 10,
  colors: ["#BB0C70", "#B2D9FF", "#23C288", "#FFE600", "#FF7B43", "#FFFFFF"],
  paths: [
    "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    "M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z",
    "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  ],
};

export const CursorAnimation = ({
  children,
  config: userConfig,
}: CursorAnimationProps) => {
  const config = { ...defaultConfig, ...userConfig };
  const containerRef = useRef<HTMLDivElement>(null);
  let starCount = 0;

  const origin: Position = { x: 0, y: 0 };
  const last = useRef<{
    starTimestamp: number;
    starPosition: Position;
    mousePosition: Position;
  }>({
    starTimestamp: Date.now(),
    starPosition: origin,
    mousePosition: origin,
  });

  const px = (val: number | string) => `${val}px`;
  const ms = (val: number | string) => `${val}ms`;
  const distance = (a: Position, b: Position) =>
    Math.hypot(b.x - a.x, b.y - a.y);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fall-1 {
        0% { transform: translate(0px, 0px) rotateX(45deg) rotateY(30deg) rotateZ(0deg) scale(0.25); opacity: 0; }
        5% { transform: translate(10px, -10px) rotateX(45deg) rotateY(30deg) rotateZ(0deg) scale(1); opacity: 1; }
        100% { transform: translate(25px, 200px) rotateX(180deg) rotateY(270deg) rotateZ(90deg) scale(1); opacity: 0; }
      }
      @keyframes fall-2 {
        0% { transform: translate(0px, 0px) rotateX(-20deg) rotateY(10deg) scale(0.25); opacity: 0; }
        10% { transform: translate(-10px, -5px) rotateX(-20deg) rotateY(10deg) scale(1); opacity: 1; }
        100% { transform: translate(-10px, 160px) rotateX(-90deg) rotateY(45deg) scale(0.25); opacity: 0; }
      }
      @keyframes fall-3 {
        0% { transform: translate(0px, 0px) rotateX(0deg) rotateY(45deg) scale(0.5); opacity: 0; }
        15% { transform: translate(7px, 5px) rotateX(0deg) rotateY(45deg) scale(1); opacity: 1; }
        100% { transform: translate(20px, 120px) rotateX(-180deg) rotateY(-90deg) scale(0.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    const getRelativeMouse = (clientX: number, clientY: number): Position => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return { x: clientX, y: clientY };
      return { x: clientX - bounds.left, y: clientY - bounds.top };
    };

    const handleMouseMove = (e: MouseEvent | Touch) => {
      const raw =
        "clientX" in e
          ? { x: e.clientX, y: e.clientY }
          : { x: (e as Touch).clientX, y: (e as Touch).clientY };

      const mouse = getRelativeMouse(raw.x, raw.y);
      const now = Date.now();

      adjustLastMousePosition(mouse);

      if (
        distance(last.current.starPosition, mouse) >=
          config.minDistanceBetweenStars ||
        now - last.current.starTimestamp > config.minTimeBetweenStars
      ) {
        createRandomSVG(mouse);
        updateLastStar(mouse);
      }

      createGlow(last.current.mousePosition, mouse);
      last.current.mousePosition = mouse;
    };

    const wrappedMouseMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e && e.touches[0]) {
        handleMouseMove(e.touches[0]);
      } else if (!("touches" in e)) {
        handleMouseMove(e);
      }
    };

    const node = containerRef.current;
    node?.addEventListener("mousemove", wrappedMouseMove);
    node?.addEventListener("touchmove", wrappedMouseMove);

    return () => {
      node?.removeEventListener("mousemove", wrappedMouseMove);
      node?.removeEventListener("touchmove", wrappedMouseMove);
      document.head.removeChild(style);
    };
  }, [config]);

  const createRandomSVG = (pos: Position) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const animations = ["fall-1", "fall-2", "fall-3"];

    svg.setAttribute("viewBox", "0 0 28 28");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("stroke", "currentColor");

    svg.style.cssText = `
      position: absolute;
      left: ${px(pos.x)};
      top: ${px(pos.y)};
      width: 28px;
      height: 28px;
      pointer-events: none;
      z-index: 50;
      stroke: ${config.colors[Math.floor(Math.random() * config.colors.length)]};
      fill: none;
      animation-name: ${animations[starCount % animations.length]};
      animation-duration: ${ms(config.starAnimationDuration)};
      animation-fill-mode: forwards;
      animation-timing-function: ease-out;
    `;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    const paths = config.paths!;
    path.setAttribute("d", paths[starCount % paths.length]!);
    svg.appendChild(path);
    containerRef.current?.appendChild(svg);

    setTimeout(() => {
      containerRef.current?.removeChild(svg);
    }, config.starAnimationDuration);

    starCount++;
  };

  const createGlowPoint = (pos: Position) => {
    const glow = document.createElement("div");
    glow.className = "absolute pointer-events-none rounded-full";
    glow.style.left = px(pos.x);
    glow.style.top = px(pos.y);
    glow.style.boxShadow = "0 0 0.6rem 0.6rem #abcdef";

    containerRef.current?.appendChild(glow);
    setTimeout(() => {
      containerRef.current?.removeChild(glow);
    }, config.glowDuration);
  };

  const createGlow = (from: Position, to: Position) => {
    const quantity = determinePointQuantity(distance(from, to));
    Array.from({ length: quantity }).forEach((_, i) => {
      const x = from.x + ((to.x - from.x) / quantity) * i;
      const y = from.y + ((to.y - from.y) / quantity) * i;
      createGlowPoint({ x, y });
    });
  };

  const updateLastStar = (pos: Position) => {
    last.current.starTimestamp = Date.now();
    last.current.starPosition = pos;
  };

  const adjustLastMousePosition = (pos: Position) => {
    if (
      last.current.mousePosition.x === 0 &&
      last.current.mousePosition.y === 0
    ) {
      last.current.mousePosition = pos;
    }
  };

  const determinePointQuantity = (dist: number) =>
    Math.max(Math.floor(dist / config.maxGlowPointSpacing), 1);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-full">
      {children}
    </div>
  );
};

CursorAnimation.displayName = "CursorAnimation";
