import _ from 'lodash'

const init = () => {
  const elem = document.createElement('div')
  elem.innerHTML = _.join(['育碧:', '我是', '你爹'], ' ')
  return elem
}

document.body.appendChild(init())
