import { App } from 'vue'

import { formatUtcString } from '@/utils/date-format'
export default function registerProperties(app) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value) {
      return formatUtcString(value)
    },
  }
}
