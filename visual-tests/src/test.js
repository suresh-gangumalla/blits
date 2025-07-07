import chalk from 'chalk'

const config = {
  url: 'http://localhost',
  routes: [
    {
      path: '/',
      purpose: 'snap',
      name: 'Static Blocks',
    },
    {
      path: 'layout',
      purpose: 'snap',
      name: 'Layout Example',
    },
  ],
}

let testsCounter = 0

export const executeTests = async (page, port) => {
  if (testsCounter < config.routes.length) {
    const route = config.routes[testsCounter++]
    console.log(chalk.gray(`Going to run ${route.path} test`))
    await page.goto(`http://localhost:${port}/#/${route.path}`)

    // Handles performance tests
    if (route.purpose === 'perf') {
      console.log('Peformance Tests Hanlding')
    }
  }
}
