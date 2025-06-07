import { useEffect, useState } from "react";
import "./App.css";
import CardPetWorld from "./components/CardPetWorld";
import axios from "axios";

interface Pet {
  id: number;
  name: string;
  description: string;
  type: string;
  imageUrl: string;
  hunger: number;
  happiness: number;
  health: number;
  energy: number;
  owner: {
    id: number;
    username: string;
  };
}

interface ResponseLogin {
  token: string;
  type: string;
  userId: number;
  username: string;
}

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get<Pet[]>(
          "http://localhost:8080/api/pets",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log("Fetched pets:", response);
        setPets(response.data);
        console.log("Pets state updated:", response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      console.log("User is logged in, fetching pets...");
    } else {
      console.log("User is not logged in, skipping pets fetch.");
    }
    fetchPets();
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      const response = await axios.post<ResponseLogin>(
        "http://localhost:8080/api/auth/login",
        {
          email: "tester@gmail.com",
          password: "1234",
        }
      );
      console.log("Login response:", response);
      if (response?.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Login successful, token stored:", response.data.token);
      } else {
        console.error("Login failed, no token received.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleLogin}
      >
        Login
      </button>
    );
  }

  if (pets.length === 0) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(pets)) {
    return <div>Error: Pets data is not an array.</div>;
  }

  return (
    <div className="pet-list flex flex-wrap justify-center gap-4 p-4">
      {pets.map((pet) => {
        console.log("Rendering pet:", pet);
        let name_modified = pet.name + " (ID: " + pet.id + ")";
        return (
          <CardPetWorld
            key={pet.id}
            id={pet.id}
            name={name_modified}
            description={pet.description}
            type={pet.type}
            imageUrl={pet.imageUrl}
            hunger={pet.hunger}
            happiness={pet.happiness}
            health={pet.health}
            energy={pet.energy}
            owner={pet.owner}
          />
        );
      })}
    </div>
  );
}

export default App;
