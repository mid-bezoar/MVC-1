import $ from 'jquery'
import './app2.css'

const eventBus = $({}) // || $(window)

// 数据相关 都放到 m
const m = {
  data: {
    index: parseInt(localStorage.getItem('app2.index')) || 0,
  },
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('index', m.data.index)
  },
  get() {},
}

// 视图相关 都放到 v
const v = {
  el: null,
  html: (index) => {
    return `
    <div>
      <ol class="tab-bar">
        <li class='${index === 0 ? 'selected' : ''}' data-index='0'><span>1111111</span></li>
        <li class='${index === 1 ? 'selected' : ''}' data-index='1'><span>2222222</span></li>
      </ol>
      <ol class="tab-content">
        <li class='${index === 0 ? 'active' : ''}'>内容1</li>
        <li class='${index === 1 ? 'active' : ''}'>内容2</li>
      </ol>
    </div>
  `
  },
  init(container) {
    v.el = $(container)
  },
  render(index) {
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html(index)).appendTo($(v.el))
  },
}

// 其他都放在 c
const c = {
  init(container) {
    v.init(container)
    v.render(m.data.index) // view = render(data)
    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      v.render(m.data.index)
    })
  },
  events: {
    'click .tab-bar li': 'x',
  },
  x(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    m.update({ index: index })
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
