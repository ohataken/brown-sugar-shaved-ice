import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PlayContainer from './PlayContainer.tsx'
import TagPlayContainer from './TagPlayContainer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/play" element={<PlayContainer />} />
        <Route path="/tags/:slug/play" element={<TagPlayContainer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
