import Blits from '@lightningjs/blits'

import StaticItems from './pages/StaticItems'

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  routes: [{ path: '/', component: StaticItems }],
})
