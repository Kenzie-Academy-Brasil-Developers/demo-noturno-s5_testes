import { useState } from "react";

const List = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.length <= 10) {
      setUsers([...users, inputValue]);
    } else {
      setInputValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite um nome"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button disabled={!inputValue} onClick={handleAdd}>
        Adicionar Usuários
      </button>
      <ol>
        {users.map((user, index) => {
          return <li key={index}>{user}</li>;
        })}
      </ol>
    </div>
  );
};

export default List;
