'use strict'

const UserEvent = require('../_helpers/userEventLogger')

// Current state (starts with empty, it's usually stored in a DB)
const users = {}

function getAll () {
  return users
}

function login (userId) {
  UserEvent.append({
    type: UserEvent.EVENT.login,
    user_id: userId,
    created: Date.now()
  })
}

function failed (userId) {
  UserEvent.append({
    type: UserEvent.EVENT.failed,
    user_id: userId,
    created: Date.now()
  })
}

module.exports = {
  get: getAll,
  login,
  failed
}
