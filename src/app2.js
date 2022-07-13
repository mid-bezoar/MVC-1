import $ from 'jquery'
import './app2.css'

const html = `
  <section id="app2">
    <ol class="tab-bar">
      <li><span>1111111</span></li>
      <li><span>2222222</span></li>
    </ol>
    <ol class="tab-content">
      <li>内容1</li>
      <li>内容2</li>
    </ol>
  </section>
`

const $element = $(html).appendTo($('body>.page'))

const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')
const index = localStorage.getItem('app2.index') ?? 0

$tabBar.on('click', 'li', (e) => {
  const $li = $(e.currentTarget)
  $li.addClass('selected').siblings().removeClass('selected')
  const index = $li.index()
  localStorage.setItem('app2.index', index)
  // 找到 content 儿子们 第index变为block，他的兄弟姐妹就变成none
  $tabContent.children().eq(index).addClass('active').siblings().removeClass('active')
})

$tabBar.children().eq(index).trigger('click')
