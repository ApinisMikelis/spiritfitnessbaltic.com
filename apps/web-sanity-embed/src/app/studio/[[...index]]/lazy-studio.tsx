"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(() => import("./studio"), { ssr: false });

export function StudioLazy() {
  return <Studio />;
}

export default StudioLazy;
