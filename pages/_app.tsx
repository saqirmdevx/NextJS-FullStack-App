import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import client from "../src/utils/apolloClient";
import NavBar from "../src/components/NavBar"
import { ThemeProvider } from 'theme-ui';
import { theme } from '../theme';
import UserProvider from '../src/auth/AuthProvider';

import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fas } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false
library.add(fas)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <UserProvider> {/** In this component we will handle login */}
          <NavBar />
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
