import router from './router'
import {RouterProvider} from 'react-router-dom'
import './assets/styles/main.scss'

const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
