import $ from 'jquery'
import './app1.css'
import Model from './base/Model'

const eventBus = $({}) // || $(window)

// 数据相关 都放到 m
const m = new Model({
  data: {
    n: parseInt(localStorage.getItem('n')),
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('n', m.data.n)
  },
})
// 其他都放在 c
const view = {
  el: null,
  html: `
    <div>
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div class="actions">
        <button id="add">+</button>
        <button id="minus">-</button>
        <button id="mul">*</button>
        <button id="divide">/</button>
      </div>
    </div>
  `,
  init(container) {
    view.el = $(container)
    view.render(m.data.n) // view = render(data)
    view.autoBindEvents()
    eventBus.on('m:updated', () => {
      view.render(m.data.n)
    })
  },
  render(n) {
    if (view.el.children.length !== 0) {
      view.el.empty()
    }
    $(view.html.replace('{{n}}', n)).appendTo($(view.el))
  },
  events: {
    'click #add': 'add',
    'click #minus': 'minus',
    'click #mul': 'mul',
    'click #divide': 'divide',
  },
  add() {
    m.update({ n: m.data.n + 1 })
  },
  minus() {
    m.update({ n: m.data.n - 1 })
  },
  mul() {
    m.update({ n: m.data.n * 2 })
  },
  divide() {
    m.update({ n: m.data.n / 2 })
  },
  autoBindEvents() {
    for (let key in view.events) {
      const value = view[view.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      view.el.on(part1, part2, value)
    }
  },
}

export default view
