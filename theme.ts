import type { Theme } from 'theme-ui'
import { tailwind } from "@theme-ui/presets"
import { keyframes } from '@emotion/react'

const makeTheme = <T extends Theme>(t: T) => t

const skeletonAnimation = keyframes({ from: { backgroundColor: "gray" }, to: { backgroundColor: "silver" } })
const textSkeletonAnimation = keyframes({ from: { color: "gray" }, to: { color: "silver" } })

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
      margin: "18px auto",
      width: "55%"
    },
    form: {
      border: "1px solid black",
      borderRadius: "8px",
      padding: "12px"
    },
    skeleton: {
      width: "100%",
      height: "0.8rem",
      marginBottom: "0.5rem",
      variant: "box.skeletonAnimation"
    },
    skeletonAnimation: {
      animationName: skeletonAnimation,
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationDirection: 'alternate',
      animationTimingFunction: "linear"
    },
    textSkeletonAnimation: {
      animationName: textSkeletonAnimation,
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationDirection: 'alternate',
      animationTimingFunction: "linear"
    }
  },
  styles: {
    ...tailwind.styles
  }
})
