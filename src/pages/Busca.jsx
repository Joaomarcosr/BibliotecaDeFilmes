import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardFilme from "../components/CardFilme";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./GridFilme.css";

const Busca = () => {
  const [searchParams] = useSearchParams();

  const [movies, setFilmes] = useState([]);
  const query = searchParams.get("q");

  const getSearchMovies = async (url) => {
    const resposta = await fetch(url);
    const data = await resposta.json();

    setFilmes(data.results);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;

    getSearchMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="filmes-container">
        {movies.length === 0 && <p> Carregando... </p>}
        {movies.length > 0 &&
          movies.map((movie) => <CardFilme key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Busca;
