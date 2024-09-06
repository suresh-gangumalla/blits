/*
 * Copyright 2023 Comcast Cable Communications Management, LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import symbols from '../../lib/symbols.js'

const isObject = (v) => typeof v === 'object' && v !== null

const validateRoute = (route) => {
  if (!isObject(route)) {
    return `Expected an object, but received: ${route}`
  }

  // validate 'path' property
  if ('path' in route === false) {
    return 'The path key must be present in the route object'
  }
  if (typeof route['path'] !== 'string') {
    return `At path: path -- Expected a string, but received: ${route['path']}`
  }

  // validate 'params' property (options)
  if ('params' in route === true) {
    if (!isObject(route['params'])) {
      return `At path: params -- Expected an object, but received: ${route['params']}`
    }

    const params = route['params']
    const keys = Object.keys(params)
    let error

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (typeof key !== 'string') {
        error = `At path: params.${key} -- Expected a key of type string, but received: ${key}`
        break
      }
      // need to check, value of type other than string can also be accepted as params value
      if (typeof params[key] !== 'string') {
        error = `At path: params.${key} -- Expected a string, but received: ${params[key]}`
        break
      }
    }
    if (error !== undefined) {
      return error
    }
  }

  // validate 'options' property
  if ('options' in route === true) {
    if (!isObject(route['options'])) {
      return `At path: options -- Expected an object, but received: ${route['options']}`
    }

    const options = route['options']
    if ('inHistory' in options === true && typeof options['inHistory'] !== 'boolean') {
      return `At path: options.inHistory -- Expected a value of type boolean, but received: ${options['inHistory']}}`
    }
    if ('keepAlive' in options === true && typeof options['keepAlive'] !== 'boolean') {
      return `At path: options.keepAlive -- Expected a value of type boolean, but received: ${options['keepAlive']}}`
    }

    //Todo:: handle non required keys registered in options object
  }

  // validate 'data' property
  if ('data' in route === true) {
    if (!isObject(route['data'])) {
      return `At path: data -- Expected an object, but received: ${route['data']}`
    }

    const data = route['data']
    const keys = Object.keys(data)
    let error
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (typeof key !== 'string') {
        error = `At path: data.${key} -- Expected a key of type string, but received: ${key}`
        break
      }
    }
    if (error !== undefined) {
      return error
    }
  }

  // validate 'component' property
  if ('component' in route === true) {
    if (typeof route['component'] !== 'function') {
      return `At path: component -- Expected a function, but received: ${route['component']}`
    }
  }

  // validate hooks
  if ('hooks' in route === true) {
    if (!isObject(route['hooks'])) {
      return `At path: hooks -- Expected an object, but received: ${route['hooks']}`
    }

    const hooks = route['hooks']
    if ('before' in hooks === true && typeof hooks['before'] !== 'function') {
      return `At path: hooks.before -- Expected a function, but received: ${hooks['before']}`
    }

    //Todo:: handle non required keys registered in hooks object
  }
}

export default (component, routes) => {
  component[symbols.routes] = []
  Object.keys(routes).forEach((key) => {
    const route = routes[key]
    const validationErr = validateRoute(route)
    if (validationErr !== undefined) {
      throw new Error(validationErr)
    }
    component[symbols.routes][key] = {
      ...route,
      ...{
        // merge default route options with route specific options
        options: {
          ...{
            inHistory: true,
          },
          ...route.options,
        },
      },
    }
  })
}
