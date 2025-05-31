import './App.css'
import CardPetWorld from './components/CardPetWorld'

function App() {
  return (
    <CardPetWorld
      id={1}
      name="Fluffy"
      description="A friendly pet"
      type="Dog"
      imageUrl="https://www.shutterstock.com/image-vector/8-bit-pixels-shiba-inu-260nw-2142635857.jpg"
      hunger={50}
      happiness={80}
      health={90}
      energy={70}
      owner={{ id: 1, username: 'petlover' }}
    />
  )
}

export default App
