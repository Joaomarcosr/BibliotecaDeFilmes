import { useState, useEffect } from "react";
import CardFilme from "../components/CardFilme";
import "./GridFilme.css";

const filmesURL = import.meta.env.VITE_API;
const apiChave = import.meta.env.VITE_API_KEY;

const Inicial = () => {
  const [topFilmes, setTopFilmes] = useState([]);

  const getTopAvaliadosFilmes = async (url) => {
    const resposta = await fetch(url);
    const data = await resposta.json();

    setTopFilmes(data.results);
  };

  useEffect(() => {
    const topAvaliadosUrl = `${filmesURL}top_rated?${apiChave}`;
    getTopAvaliadosFilmes(topAvaliadosUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="filmes-container">
        {topFilmes.length === 0 && <p> Carregando... </p>}
        {topFilmes.length > 0 &&
          topFilmes.map((movie) => <CardFilme key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Inicial;
