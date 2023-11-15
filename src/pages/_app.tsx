import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from 'react-query'


export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={theme} >
      <QueryClientProvider client={queryClient} >
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
