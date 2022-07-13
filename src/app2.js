import $ from 'jquery'
import './app2.css'

const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')

$tabBar.on('click', 'li', (e) => {
  const $li = $(e.currentTarget)
  const index = $li.index()
  $li.addClass('selected').siblings().removeClass('selected')
  // 找到 content 儿子们 第index变为block，他的兄弟姐妹就变成none
  $tabContent.children().eq(index).addClass('active').siblings().removeClass('active')
})

$tabBar.children().eq(0).trigger('click')
