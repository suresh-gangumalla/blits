import { techWords, colors } from './data'

const pick = (dict) => dict[Math.round(Math.random() * 1000) % dict.length]

// element counter
let count = 1

export const createItems = (amount) => {
  const items = []

  let x = 0
  let y = 0

  const itemsPerRow = 38
  const itemOverlapX = 50

  for (let i = 0; i <= amount; i++) {
    items.push({
      id: 'key' + count++,
      x: x,
      y: y,
      w: 200,
      h: 40,
      color: pick(colors),
      textColor: pick(colors),
      text: pick(techWords),
    })
    const row = Math.floor(i / itemsPerRow)
    const col = i % itemsPerRow
    x = col * itemOverlapX
    y = row * 40
  }
  return items
}
