import * as React from 'react';
import Card from './Card';
import AlertDialogSlide from './AlertDialogSlide';
import './style.css';
import PetsIcon from '@mui/icons-material/Pets';

const cardImages = [
  { src: 'https://i.ibb.co/6v5WG94/cookie1.png' },
  { src: 'https://i.ibb.co/wrsGrw4/cookie2.png' },
  { src: 'https://i.ibb.co/LY6HjQ3/cookie3.png' },
  { src: 'https://i.ibb.co/T2xKZW8/cookie4.png' },
  { src: 'https://i.ibb.co/H4br5KZ/cookie5.png' },
  { src: 'https://i.ibb.co/QKtgzRL/cookie6.png' },
  { src: 'https://i.ibb.co/2nKmmFV/cookie7.png' },
  { src: 'https://i.ibb.co/tMzkLzk/cookie8.png' },
];

export default function App() {
  const [cards, setCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [firstChoice, setfirstChoice] = React.useState(null);
  const [secChoice, setsecChoice] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setfirstChoice(null);
    setsecChoice(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    firstChoice ? setsecChoice(card) : setfirstChoice(card);
  };

  React.useEffect(() => {
    shuffleCards();
  }, []);

  React.useEffect(() => {
    if (firstChoice && secChoice) {
      setDisabled(true);
      if (firstChoice.src === secChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log('no match');
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secChoice]);

  console.log(cards);

  const isMatched = (card) => {
    if (card.matched) {
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    if (cards.every(isMatched)) {
      console.log('yay you win!');
    }
  }, [cards]);

  const resetTurn = () => {
    setfirstChoice(null);
    setsecChoice(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>
        Cookie Match <AlertDialogSlide />
      </h1>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secChoice || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <br />
      <button onClick={shuffleCards}>
        <h2>
          <PetsIcon /> Reset
        </h2>
      </button>
    </div>
  );
}
