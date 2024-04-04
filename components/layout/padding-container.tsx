import { ReactNode } from "react";

function PaddingContainer({ children }: { children: ReactNode }) {
  return <div className="px-8 w-full max-w-7xl mx-auto">{children}</div>;
}

export default PaddingContainer;
