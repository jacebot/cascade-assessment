'use strict'

const fs = require('fs')
const path = require('path')
const os = require('os')

const EVENT_LOG_PATH = path.join(__dirname, 'event_log.txt')

const EVENT = {
  login: 'LOGIN',
  failed: 'LOGIN FAILED'
}

function reset () {
  fs.writeFileSync(EVENT_LOG_PATH, '')
}

function append (event) {
  fs.appendFileSync(EVENT_LOG_PATH, JSON.stringify(event) + os.EOL)
}

function getEvents () {
  const eventLines = fs.readFileSync(EVENT_LOG_PATH, 'utf-8')

  return eventLines
    .split(os.EOL)
    .filter((eventLineStr) => eventLineStr.length)
    .map((eventLineStr) => {
      let eventLine = {}
      try {
        eventLine = JSON.parse(eventLineStr)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
      }
      return eventLine
    })
}

function dateQuery (start, end = 0, noTimeout = false) {
  let events = getEvents()
  let dateObjA = new Date()
  let dateObjB = new Date()

  const startDate = dateObjA.setDate(dateObjA.getDate() - start);
  const endDate = dateObjB.setDate(dateObjB.getDate() - end);

  if (noTimeout) {
    return events
            .filter((e, i) => e.created <= endDate && 
                              e.created >= startDate && 
                              e.type !== 'SESSION TIMEOUT')
  } else {
    return events
            .filter((e, i) => e.created <= endDate && e.created >= startDate)
  }
}

module.exports = {
  reset,
  append,
  dateQuery,
  getEvents,

  EVENT
}
