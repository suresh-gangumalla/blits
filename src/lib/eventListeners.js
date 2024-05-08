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

import symbols from './symbols'

const eventsMap = new Map()

export default {
  registerListener(component, event, cb) {
    let componentsMap = eventsMap.get(event)
    if (!componentsMap) {
      componentsMap = new Map()
      eventsMap.set(event, componentsMap)
    }

    let callbacks = componentsMap.get(component)
    if (!callbacks) {
      callbacks = new Set()
      componentsMap.set(component, callbacks)
    }

    callbacks.add(cb)
  },
  executeListeners(event, params) {
    const componentsMap = eventsMap.get(event)
    if (componentsMap) {
      componentsMap.forEach((callbacks, component) => {
        if (component[symbols.executeListeners]) {
          callbacks.forEach((cb) => {
            cb(params)
          })
        }
      })
    }
  },
  removeListeners(component) {
    eventsMap.forEach((componentMap) => {
      const callbacks = componentMap.get(component)
      if (callbacks) {
        callbacks.clear()
        // deleting component key for current event component map
        componentMap.delete(component)
      }
    })
  },
}
