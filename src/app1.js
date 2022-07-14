import $ from 'jquery'
import './app1.css'

// 数据相关 都放到 m
const m = {
  data: {
    n: parseInt(localStorage.getItem('n')),
  },
}
// 视图相关 都放到 v
const v = {
  el: null,
  container: null,
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
  init(container, n) {
    v.el = $(container)
  },
  render(n) {
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html.replace('{{n}}', n)).appendTo($(v.el))
  },
}
// 其他都放在 c
const c = {
  init(container) {
    v.init(container)
    v.render(m.data.n) // view = render(data)
    c.autoBindEvents()
  },
  events: {
    'click #add': 'add',
    'click #minus': 'minus',
    'click #mul': 'mul',
    'click #divide': 'divide',
  },
  add() {
    m.data.n += 1
  },
  minus() {
    m.data.n -= 1
  },
  mul() {
    m.data.n *= 2
  },
  divide() {
    m.data.n /= 2
  },
  autoBindEvents() {
    for (let key in c.events) {
      const value = c[c.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      v.el.on(part1, part2, value)
    }
  },
}

export default c
