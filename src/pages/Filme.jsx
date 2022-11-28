import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import CardFilme from "../components/CardFilme";

import "./Filme.css";

const filmesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Filme = () => {
  const { id } = useParams();
  const [movie, setFilme] = useState(null);

  const getFilme = async (url) => {
    const resposta = await fetch(url);
    const data = await resposta.json();

    setFilme(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const filmeUrl = `${filmesURL}${id}?${apiKey}`;
    getFilme(filmeUrl);
  }, []);

  return (
    <div className="page-filme">
      {movie && (
        <>
          <CardFilme movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>

          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>

          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>

          <div className="descricao">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Filme;
