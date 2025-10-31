import log from './plugins/log.js'

export const plugins = {
  // log plugin added by default
  log,
}

const registerPlugin = (plugin, nameOrOptions = '', options = {}) => {
  // map name and options depending on the arguments provided
  let name = undefined
  if (typeof nameOrOptions === 'object') {
    options = nameOrOptions
  } else {
    name = nameOrOptions
  }
}

export default registerPlugin
