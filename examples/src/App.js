import Blits from '@lightningjs/blits'

import StaticItems from './pages/StaticItems'
import RandomBlocks from './pages/RandomBlocks'

export default Blits.Application({
  template: `
    <Element w="1920" h="1080">
      <RouterView />
    </Element>
  `,
  state() {
    return {
      counter: 1,
      totalTests: 2,
    }
  },
  hooks: {
    init() {
      this.$listen('move-to-next', () => {
        if (this.counter >= this.totalTests) {
          window.doneTests()
        } else {
          // navigate to next route
          this.$router.to('/random')
        }
        this.counter++
      })
    },
  },
  routes: [
    { path: '/', component: StaticItems },
    {
      path: '/random',
      component: RandomBlocks,
    },
  ],
})
