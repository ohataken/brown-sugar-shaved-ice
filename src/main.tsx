import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PlayContainer from './PlayContainer.tsx'
import CardShowContainer from './CardShowContainer.tsx'
import TagsIndexContainer from './TagsIndexContainer.tsx'
import TagShowContainer from './TagShowContainer.tsx'
import TagPlayContainer from './TagPlayContainer.tsx'
import TagCardsIndexContainer from './TagCardsIndexContainer.tsx'
import OwnerCardEditContainer from './OwnerCardEditContainer.tsx'
import OwnerCardShowContainer from './OwnerCardShowContainer.tsx'
import OwnerDraftsIndexContainer from './OwnerDraftsIndexContainer.tsx'
import OwnerDraftEditContainer from './OwnerDraftEditContainer.tsx'
import OwnerTagsIndexContainer from './OwnerTagsIndexContainer.tsx'
import OwnerTagCardsIndexContainer from './OwnerTagCardsIndexContainer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/play" element={<PlayContainer />} />
        <Route path="/cards/:uuid" element={<CardShowContainer />} />
        <Route path="/tags" element={<TagsIndexContainer />} />
        <Route path="/tags/:slug" element={<TagShowContainer />} />
        <Route path="/tags/:slug/play" element={<TagPlayContainer />} />
        <Route path="/tags/:slug/cards" element={<TagCardsIndexContainer />} />
        <Route path="/owner/card/:uuid/edit" element={<OwnerCardEditContainer />} />
        <Route path="/owner/cards/:uuid" element={<OwnerCardShowContainer />} />
        <Route path="/owner/drafts" element={<OwnerDraftsIndexContainer />} />
        <Route path="/owner/drafts/:uuid/edit" element={<OwnerDraftEditContainer />} />
        <Route path="/owner/tags" element={<OwnerTagsIndexContainer />} />
        <Route path="/owner/tags/:slug/cards" element={<OwnerTagCardsIndexContainer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
