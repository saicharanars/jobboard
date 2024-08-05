import { Suspense } from "react";
import ClientAuthHandler from "./ClientAuthHandler";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientAuthHandler />
    </Suspense>
  );
}
