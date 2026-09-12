import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PlayContainer from './PlayContainer.tsx'
import TagsContainer from './TagsContainer.tsx'
import TagPlayContainer from './TagPlayContainer.tsx'
import OwnerCardEdit from './OwnerCardEdit.tsx'
import OwnerDraftsContainer from './OwnerDraftsContainer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/play" element={<PlayContainer />} />
        <Route path="/tags" element={<TagsContainer />} />
        <Route path="/tags/:slug/play" element={<TagPlayContainer />} />
        <Route path="/owner/card/:uuid/edit" element={<OwnerCardEdit />} />
        <Route path="/owner/drafts" element={<OwnerDraftsContainer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
