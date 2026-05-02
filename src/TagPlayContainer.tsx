import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';
import ScoreBoard from './components/ScoreBoard';
import Card from './components/Card';
import AnswerInput from './components/AnswerInput';
import RevealButton from './components/RevealButton';
import SkipButton from './components/SkipButton';

type CardData = components['schemas']['Card'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function TagPlayContainer() {
  const { slug } = useParams<{ slug: string }>();
  const [cards, setCards] = useState<CardData[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [skipped, setSkipped] = useState(0);

  useEffect(() => {
    if (!slug) return;
    client
      .GET('/api/tags/{tag_slug}/cards', { params: { path: { tag_slug: slug } } })
      .then(({ data }) => {
        if (data) setCards(shuffle(data));
      });
  }, [slug]);

  const current = cards[index];

  const handleInputChange = (value: string) => {
    if (current && value === current.name) {
      if (!revealed) setCorrect((c) => c + 1);
      setIndex((i) => i + 1);
      setInput('');
      setRevealed(false);
    } else {
      setInput(value);
    }
  };

  const handleReveal = () => {
    if (!revealed) {
      setViewed((v) => v + 1);
      setRevealed(true);
    }
  };

  const handleSkip = () => {
    setSkipped((s) => s + 1);
    setIndex((i) => i + 1);
    setInput('');
    setRevealed(false);
  };

  return (
    <section className="section">
      <div className="container">
        <ScoreBoard correct={correct} viewed={viewed} skipped={skipped} total={cards.length} />
        {current && (
          <>
            <Card name={current.name} pinyin={current.pinyin} revealed={revealed} />
            <AnswerInput value={input} onChange={handleInputChange} />
            <RevealButton onClick={handleReveal} disabled={revealed} />
            <SkipButton onClick={handleSkip} />
          </>
        )}
      </div>
    </section>
  );
}

export default TagPlayContainer;
