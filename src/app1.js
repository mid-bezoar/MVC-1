import $ from 'jquery'
import './app1.css'

const $button1 = $('#add')
const $button2 = $('#minus')
const $button3 = $('#mul')
const $button4 = $('#divide')
const $number = $('#number')
const n = localStorage.getItem('n')
$number.text(n || 100)

$button1.on('click', () => {
  let n = parseInt($number.text())
  n += 1
  localStorage.setItem('n', n)
  $number.text(n)
})

$button2.on('click', () => {
  let n = parseInt($number.text())
  n -= 1
  localStorage.setItem('n', n)
  $number.text(n)
})

$button3.on('click', () => {
  let n = parseInt($number.text())
  n *= 2
  localStorage.setItem('n', n)
  $number.text(n)
})

$button4.on('click', () => {
  let n = parseInt($number.text())
  n /= 2
  localStorage.setItem('n', n)
  $number.text(n)
})
