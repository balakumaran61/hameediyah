import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { Credits } from './pages/Credits'
import { Nav } from './components/layout/Nav'
import { MobileBar } from './components/layout/MobileBar'
import { Cursor } from './components/layout/Cursor'
import { MotionRoot } from './components/layout/MotionRoot'

export function App() {
  return (
    <MotionRoot>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/*" element={<Menu />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <MobileBar />
      <Cursor />
    </MotionRoot>
  )
}
