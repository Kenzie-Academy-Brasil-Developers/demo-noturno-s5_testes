const Card = ({ name, city, showInfo = false }) => {
  return (
    <div>
      <h1>{name}</h1>
      {showInfo && <p>{city}</p>}
    </div>
  );
};

export default Card;
