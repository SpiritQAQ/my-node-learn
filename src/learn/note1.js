/*
 * qz99 nodeJs
 * global variables
 */
// console.log(__dirname)
// console.log(__filename)

/*
 * 事件是node.js的核心，node.js是基于事件驱动的
 *
 */

var events = require('events')
var util = require('util') // node核心库 工具库


var myEmmiter = new events.EventEmitter()

myEmmiter.on('speak', (msg) => {
  console.log(`Im ${msg}`)
})


var Person = function (name) {
  this.name = name
}

util.inherits(Person, events.EventEmitter) // 继承 extend

var abby = new Person('Abby')
var bob = new Person('Bob')
var chandler = new Person('Chandler')

var persons = [abby, bob, chandler]

// persons.forEach(person => {
//   myEmmiter.emit('speak', person.name)
// });

persons.forEach(person => {
  person.on('speak', (message) => {
    console.log(`${person.name} said: ${message}`)
  })
});
abby.emit('speak', 'cnm')
chandler.emit('speak', 'fuck')