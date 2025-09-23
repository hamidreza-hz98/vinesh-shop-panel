"use client";

import React from "react";

export default function ClientOnly({ children }) {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;
  return <>{children}</>;
}