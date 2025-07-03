const config = {
  url: 'http://localhost',
  port: 4173,
  routes: ['/', '/static-blocks'],
}

const executeTests = async (page) => {
  for (let route in config.routes) {
    page.goTo(route)
  }
}

export default executeTests
