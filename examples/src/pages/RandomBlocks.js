import Blits from '@lightningjs/blits'
import { createItems } from '../utils/helpers'

export default Blits.Component('RandomBlocks', {
  template: `
    <Element>
      <Element :for="item in $items" w="$item.w" h="$item.h" color="$item.color" x="$item.x" y="$item.y" key="$item.id">
        <Text :content="$item.text" :color="$item.textColor" alpha="0.8" :size="26" font="lato" x="5" y="2" ref="text" />
      </Element>
    </Element>
  `,
  state() {
    return {
      items: [],
    }
  },
  hooks: {
    async ready() {
      this.items = createItems(1000)
      this.$setTimeout(async () => {
        this.items = []
        await window.memory('Random-blocks')
        this.$emit('move-to-next')
      }, 1000)
    },
  },
})
