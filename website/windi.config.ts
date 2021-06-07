import typo from 'windicss/plugin/typography'
export default {
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),

            h2: {
              color: theme('colors.gray.800')
            },
            h3: {
              color: theme('colors.gray.800')
            },
            strong: {
              color: theme('colors.gray.800')
            },
            a: {
              color: theme('colors.green.500'),
              '&:hover': {
                color: theme('colors.green.600')
              }
            }
          }
        }
      })
    }
  },

  plugins: [typo]
}
