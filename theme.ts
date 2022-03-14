import type { Theme } from 'theme-ui'
import { tailwind } from "@theme-ui/presets"

const makeTheme = <T extends Theme>(t: T) => t

export const theme: Theme = makeTheme({
  ...tailwind,
  links: {
    nav: {
      width: "100%",
      px: 2,
      py: 1,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      textDecoration: "underline",
    },
  },
  buttons: {
    link: {
      cursor: "inherit",
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