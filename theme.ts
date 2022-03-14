import type { Theme } from 'theme-ui'
import { tailwind } from "@theme-ui/presets"

const makeTheme = <T extends Theme>(t: T) => t

export const theme: Theme = makeTheme({
  ...tailwind,
  links: {
    nav: {
      px: 2,
      py: 1,
      marginLeft: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
  },
  buttons: {
    link: {
      cursor: "pointer",
    },
  },
  box: {
    blog: {
      border: "1px solid black",
      borderRadius: "8px",
      padding: "6px 18px",
      margin: "18px",
    },
    form: {
      border: "1px solid black",
      borderRadius: "8px",
      padding: "12px"
    }
  },
  styles: {
    ...tailwind.styles
  }
})
