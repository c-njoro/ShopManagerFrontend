import Structure from "@/components/Structure";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Structure>
          <Component {...pageProps} />
        </Structure>
      </QueryClientProvider>
    </AuthProvider>
  );
}
