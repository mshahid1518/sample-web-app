import React from 'react'
import ReactDOM from 'react-dom'
import ToDoList from './components/App.jsx'
import axios from 'axios'
import hljs from 'highlight-lite'

const fileURL = filePath => `https://api.github.com/repos/goby-lang/sample-web-app/contents/${filePath}`
// const fileURL = 'https://api.github.com/repos/goby-lang/sample-web-app/contents/server.gb'
const styleURL = style => `/css/code-style/${style}.css`

const codeFiles = {
  'server-code': 'server.gb',
  'model-code': 'model.gb'
}

axios.all(Object.values(codeFiles).map(file => axios.get(fileURL(file))))
  .then(responses => {
  const codes = responses.map(response => atob(response.data.content))
  const $codeBlock = document.getElementById('render-code')
  const $style     = document.getElementById('code-style')

  const codeObj = {
    'server-code': codes[0],
    'model-code': codes[1]
  }

  $codeBlock.innerHTML = codes[0]
  hljs.highlightBlock($codeBlock)

  for (let id of Object.keys(codeFiles)) {
    document.getElementById(id).addEventListener('click', event => {
      document.querySelector('li.active').className = ''
      document.getElementById(id).className = 'active'
      $codeBlock.innerHTML = codeObj[id]
      hljs.highlightBlock($codeBlock)
    })
  }
})
// getCodeContent('server').then((response) => {
//   let code = atob(response.data.content)
//   const $codeBlock = document.getElementById('render-code')
//   const $style = document.getElementById('code-style')

//   $codeBlock.innerHTML = code
//   hljs.highlightBlock($codeBlock)

  // Change Style
  // setTimeout(() => {
  //   $style.href = '/css/tomorrow-night-blue.css'
  // }, 5000)
// })

window.addEventListener('load', function() {
  ReactDOM.render(
    <ToDoList />,
    document.getElementById('app')
  )
})
