import $ from 'jquery'
import './app1.css'
import Model from './base/Model'
import View from './base/View'

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
const c = {
  v: null,
  initV() {
    // 视图相关 都放到 v
    c.v = new View({
      el: c.container,
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
      render(n) {
        if (c.v.el.children.length !== 0) {
          c.v.el.empty()
        }
        $(v.html.replace('{{n}}', n)).appendTo($(c.v.el))
      },
    })
  },
  init(container) {
    c.container = container
    this.initV()

    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      c.v.render(m.data.n)
    })
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
    for (let key in c.events) {
      const value = c[c.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      c.v.el.on(part1, part2, value)
    }
  },
}

export default c
