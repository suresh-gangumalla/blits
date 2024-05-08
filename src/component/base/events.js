/*
 * Copyright 2024 Comcast Cable Communications Management, LLC
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
import eventListeners from '../../lib/eventListeners'

export default {
  $emit: {
    value: function (event, params) {
      eventListeners.executeListeners(event, params)
    },
    writable: false,
    enumerable: true,
    configurable: false,
  },
  $listen: {
    value: function (event, callback) {
      eventListeners.registerListener(this, event, callback)
    },
    writable: false,
    enumerable: true,
    configurable: false,
  },
  setListenersExecution: {
    value: function (v) {
      this[symbols.executeListeners] = v
      setListenersExecutionOnChildren(this[symbols.children], v)
    },
    writable: false,
    enumerable: true,
    configurable: false,
  },
}

const setListenersExecutionOnChildren = function (children, v) {
  for (let i = 0; i < children.length; i++) {
    if (!children[i]) return

    // call setListenersExecution when method is available on child
    if (
      children[i].setListenersExecution &&
      typeof children[i].setListenersExecution === 'function'
    ) {
      children[i].setListenersExecution(v)
    }

    // recursively call setListenersExecution when it's an object of items (happens when using a forloop construct)
    else if (Object.getPrototypeOf(children[i]) === Object.prototype) {
      setListenersExecutionOnChildren(Object.values(children[i]), v)
    }
  }
}
