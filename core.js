console.info('My Calculator, Welcome!')

// DISPLAY VISORS
const displayExpressionElement = document.getElementById('display-expression')
const displayResultElement = document.getElementById('display-result')

// NUMBER BUTTONS
const zeroButton = document.getElementById('zero')
const oneButton = document.getElementById('one')
const twoButton = document.getElementById('two')
const threeButton = document.getElementById('three')
const fourButton = document.getElementById('four')
const fiveButton = document.getElementById('five')
const sixButton = document.getElementById('six')
const sevenButton = document.getElementById('seven')
const eightButton = document.getElementById('eight')
const nineButton = document.getElementById('nine')

// OPERATOR BUTTONS
const sumButton = document.getElementById('sum')
const subButton = document.getElementById('sub')
const divButton = document.getElementById('div')
const multButton = document.getElementById('mult')
const equalButton = document.getElementById('equal')

// OTHER BUTTONS
const acButton = document.getElementById('clear')
const commaButton = document.getElementById('comma')

let result = '0'
let expression = '0'

// HELPERS
function formatExpression(expression) {
  return expression.replace('/', '÷').replace('*', '×')
}

function updateDisplayResult(value) {
  displayResultElement.innerText = formatExpression(value)
}

function updateDisplayExpression(value) {
  displayExpressionElement.innerText = formatExpression(value)
}

function clearValue() {
  result = '0'
  expression = '0'
  updateDisplayExpression('')
  updateDisplayResult('0')
}

// SETTERS
function setOperator(operator) {
  const endsWithOperator = /[+\-/*.]$/.test(expression)

  if (endsWithOperator) {
    expression = expression.slice(0, -1)
  }

  switch (operator) {
    case 'sum':
      expression += '+'
      break
    case 'sub':
      expression += '-'
      break
    case 'div':
      expression += '/'
      break
    case 'mult':
      expression += '*'
      break
  }

  updateDisplayResult(expression)
}

function setTerm(value) {
  if (expression.startsWith('0') && !expression.includes('.')) {
    expression = value
  } else if (false) {
    // para cumprir esse if a expressao deve:
    // -> finalizar com 0, antes dele deve conter um operador;
    // caso contrario o else abaixo é executado
  } else {
    expression += value
  }

  updateDisplayResult(expression)
}

function handleNumberClick(ev) {
  const value = ev.target.innerHTML
  setTerm(value)
}

function setComma() {
  const endsWithNumber = /\d$/.test(expression)
  const lastTerm = expression.split(/[+\-*/]/).slice(-1)[0]

  if (endsWithNumber && !lastTerm.includes('.')) {
    expression += '.'
  }

  updateDisplayResult(expression)
}

function setResult() {
  const endsWithOperator = /[+\-/*,]$/.test(expression)

  if (expression === '0') {
    return
  }

  if (endsWithOperator) {
    expression = expression.slice(0, -1)
  }

  result = String(eval(expression))
  updateDisplayExpression(expression)

  expression = result
  updateDisplayResult(result)
}

// LISTENERS
zeroButton.onclick = handleNumberClick
oneButton.onclick = handleNumberClick
twoButton.onclick = handleNumberClick
threeButton.onclick = handleNumberClick
fourButton.onclick = handleNumberClick
fiveButton.onclick = handleNumberClick
sixButton.onclick = handleNumberClick
sevenButton.onclick = handleNumberClick
eightButton.onclick = handleNumberClick
nineButton.onclick = handleNumberClick

sumButton.onclick = () => setOperator('sum')
subButton.onclick = () => setOperator('sub')
divButton.onclick = () => setOperator('div')
multButton.onclick = () => setOperator('mult')
equalButton.onclick = setResult

acButton.onclick = clearValue
commaButton.onclick = setComma
