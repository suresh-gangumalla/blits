import Blits from '@lightningjs/blits'

import StaticItems from './pages/StaticItems'
import Layout from './pages/Layout'

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  state() {
    return {
      counter: 0,
    }
  },
  hooks: {
    init() {
      this.$listen('take-snapshot', async (name) => {
        window.snapshot(name, {})
        this.counter++
        if (this.counter >= 2) {
          // Invoke doneTests
          this.$setTimeout(() => {
            window.doneTests()
          }, 1000)
        }
      })
    },
  },
  routes: [
    { path: '/', component: StaticItems },
    {
      path: '/layout',
      component: Layout,
    },
  ],
})
