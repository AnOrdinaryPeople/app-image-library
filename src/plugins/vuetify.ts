import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'
import type { App } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default (app: App<Element>) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
    },
  })

  app.use(vuetify)
}
