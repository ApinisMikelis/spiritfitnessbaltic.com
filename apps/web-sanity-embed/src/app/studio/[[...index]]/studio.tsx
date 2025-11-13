"use client";

import config from "@mono/studio/sanity.config";
import { NextStudio, type NextStudioProps } from "next-sanity/studio";

export default function Studio() {
  return <NextStudio config={config as NextStudioProps["config"]} />;
}
