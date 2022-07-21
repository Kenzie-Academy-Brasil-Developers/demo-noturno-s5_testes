import axios from "axios";
import { useState } from "react";

const CardDigimon = () => {
  const [input, setInput] = useState("");
  const [digimon, setDigimon] = useState([]);
  const [error, setError] = useState(false);

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `https://digimon-api.vercel.app/api/digimon/name/${input}`
      );
      setDigimon(response.data);
    } catch (error) {
      setDigimon([]);
      setError(true);
    }
  };

  return (
    <div>
      <h3>Procure o seu Digimon</h3>
      <input
        placeholder="Ex.: Agumon"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleFetch}>Buscar Digimon</button>
      {error && <span>Algo deu errado</span>}
      <ul>
        {digimon?.map((digimon) => (
          <li key={digimon.name}>
            <img src={digimon.img} alt={digimon.name} />
            <p>{digimon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardDigimon;
