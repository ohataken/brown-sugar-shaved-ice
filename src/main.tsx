import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PlayContainer from './PlayContainer.tsx'
import CardShowContainer from './CardShowContainer.tsx'
import TagsIndexContainer from './TagsIndexContainer.tsx'
import TagContainer from './TagContainer.tsx'
import TagPlayContainer from './TagPlayContainer.tsx'
import TagCardsContainer from './TagCardsContainer.tsx'
import OwnerCardEdit from './OwnerCardEdit.tsx'
import OwnerCardContainer from './OwnerCardContainer.tsx'
import OwnerDraftsContainer from './OwnerDraftsContainer.tsx'
import OwnerDraftEdit from './OwnerDraftEdit.tsx'
import OwnerTagsContainer from './OwnerTagsContainer.tsx'
import OwnerTagCardsContainer from './OwnerTagCardsContainer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/play" element={<PlayContainer />} />
        <Route path="/cards/:uuid" element={<CardShowContainer />} />
        <Route path="/tags" element={<TagsIndexContainer />} />
        <Route path="/tags/:slug" element={<TagContainer />} />
        <Route path="/tags/:slug/play" element={<TagPlayContainer />} />
        <Route path="/tags/:slug/cards" element={<TagCardsContainer />} />
        <Route path="/owner/card/:uuid/edit" element={<OwnerCardEdit />} />
        <Route path="/owner/cards/:uuid" element={<OwnerCardContainer />} />
        <Route path="/owner/drafts" element={<OwnerDraftsContainer />} />
        <Route path="/owner/drafts/:uuid/edit" element={<OwnerDraftEdit />} />
        <Route path="/owner/tags" element={<OwnerTagsContainer />} />
        <Route path="/owner/tags/:slug/cards" element={<OwnerTagCardsContainer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
