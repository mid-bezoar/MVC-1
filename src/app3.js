import $ from 'jquery'
import './app3.css'

const html = `
  <section id="app3">
    <div class="square"></div>
  </section>
`

const $element = $(html).appendTo($('body>.page'))

const $square = $('#app3 .square')
const active = localStorage.getItem('app3.active') === 'yes'

// if (active) {
//   $square.addClass('active')
// } else {
//   $square.removeClass('active')
// }
// 等价于下面的
$square.toggleClass('active', active)

$square.on('click', () => {
  if ($square.hasClass('active')) {
    $square.removeClass('active')
    localStorage.setItem('app3.active', 'no')
  } else {
    $square.addClass('active')
    localStorage.setItem('app3.active', 'yes')
  }
})
