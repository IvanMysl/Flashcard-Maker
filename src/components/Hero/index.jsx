"use client";
import React, { useState, useRef, useEffect } from "react";
import css from "./style.module.css";

const Hero = () => {
  const [cards, setCards] = useState([]);
  const [controls, setControls] = useState([]);
  const [controlForOther, setControlForOther] = useState(false);

  useEffect(() => {
    const savedCards = localStorage.getItem("cards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  useEffect(() => {
    const savedControls = localStorage.getItem("controls");
    if (savedControls) {
      setControls(JSON.parse(savedControls));
    }
  }, []);

  useEffect(() => {
    const savedControlForOther = localStorage.getItem("controlForOther");
    if (savedControlForOther !== null) {
      setControlForOther(JSON.parse(savedControlForOther) === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem("controls", JSON.stringify(controls));
  }, [controls]);

  useEffect(() => {
    localStorage.setItem("controlForOther", JSON.stringify(controlForOther));
  }, [controlForOther]);
  useEffect(() => {
    setControlForOther(cards.length !== 0);
  }, [cards.length]);
  const addCard = (front, back) => {
    const newCard = {
      id: Date.now(),
      front: front.trim(),
      back: back.trim(),
      flipped: false,
    };
    setCards([...cards, newCard]);
    setControlForOther(!controlForOther);
    setControls([...controls, true]);
  };
  const showContent = (idd) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.id === idd) {
          return { ...card, flipped: !card.flipped };
        }
        return card;
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const frontInput = e.target[0].value;
    const backInput = e.target[1].value;
    const check1 = frontInput.replaceAll(" ", "");
    const check2 = backInput.replaceAll(" ", "");
    if (check1 != "" && check2 != "") {
      addCard(frontInput, backInput);
      e.target.reset();
      e.target[0].className =
        "text-[1.56rem] leading-8 text-center mb-5 border-b-[2px] border-black w-64";
      e.target[1].className =
        "text-[1.56rem] leading-8 text-center mb-5 border-b-[2px] border-black w-64";
    } else {
      if (check1 == "") {
        e.target[0].className =
          "text-[1.56rem] leading-8 text-center mb-5 border-b-[2px] border-red-500 w-64";
      }
      if (check2 == "") {
        e.target[1].className =
          "text-[1.56rem] leading-8 text-center mb-5 border-b-[2px] border-red-500 w-64";
      }
    }
  };
  const delEl = (id) => {
    setCards(cards.filter((el) => el.id !== id));
  };
  const delAll = () => {
    setCards([]);
    setControls([]);
    setControlForOther(!controlForOther);
  };
  return (
    <>
      <section className={css.global}>
        <div className={css.container}>
          <div className="flex flex-col items-center h-90">
            <h1 className="mb-10 text-[2.50rem] leading-none mt-10">
              Додати картку
            </h1>
            <form
              onSubmit={handleSubmit}
              className={`w-72 flex flex-col justify-center items-center h-70 rounded-xl bg-stone-300 pt-2  pr-2  pb-2  pl-2`}
            >
              <input
                type="text"
                placeholder="Питання (front)"
                maxLength="24"
                className="text-[1.56rem] leading-8 text-center mb-5 border-b-[2px] border-black w-64"
              />
              <input
                type="text"
                placeholder="Відповідь (back)"
                maxLength="244"
                className="text-[1.56rem] leading-8 text-center mb-5 border-b-[2px] border-black w-64"
              />
              <input
                type="submit"
                value="Додати картку"
                className={`bg-neutral-500 text-[1.46rem] leading-8 text-center cursor-pointer rounded-xl w-55 flex items-center h-10 hover:bg-cyan-200 hover:text-neutral-500`}
              />
            </form>
          </div>
          <div className="flex flex-col items-center">
            <h2
              className={
                controlForOther
                  ? "mb-10 text-[2.50rem] leading-none mt-10"
                  : "hidden"
              }
              id="zag"
            >
              Всього карток: {cards.length}
            </h2>
            {/* <ul className="grid grid-cols-[repeat(3,_1fr)] gap-4 p-0 mb-20 card__list"> */}
            <ul className={css.card__list}>
              {cards.map((card) => (
                <li
                  onClick={() => showContent(card.id)}
                  key={card.id}
                  className={`relative [transform-style:preserve-3d] transition-transform duration-600 cursor-pointer max-w-[19.00rem] w-full h-90 bg-cyan-400 rounded-xl flex flex-col justify-center items-center ${
                    card.flipped ? "rotate-y-360" : ""
                  }`}
                >
                  <div className={"flex flex-col justify-center items-center"}>
                    <h3
                      className={
                        !card.flipped
                          ? "text-[1.56rem] leading-8 text-center mb-2"
                          : "hidden"
                      }
                    >
                      Питання
                    </h3>
                    <p
                      className={
                        !card.flipped ? "mb-5 w-70 text-center" : "hidden"
                      }
                    >
                      {card.front}
                    </p>
                    <h3
                      className={
                        card.flipped
                          ? "text-[1.56rem] leading-8 text-center mb-2"
                          : "hidden"
                      }
                    >
                      Відповідь
                    </h3>
                    <p
                      className={
                        card.flipped ? "mb-10 w-70 text-center" : "hidden"
                      }
                    >
                      {card.back}
                    </p>
                  </div>
                  <button
                    onClick={() => delEl(card.id)}
                    className="bg-fuchsia-300 text-[1.06rem] leading-8 text-center cursor-pointer rounded-xl w-40 flex items-center justify-center h-10 hover:bg-cyan-200 hover:text-neutral-500"
                  >
                    Видалити картку
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={
              controlForOther ? "flex justify-center items-center" : "hidden"
            }
          >
            <button
              onClick={delAll}
              className="mb-20 bg-neutral-500 text-[1.46rem] leading-8 cursor-pointer rounded-xl w-[200px] h-10 flex items-center justify-center hover:bg-cyan-200 hover:text-neutral-500"
            >
              Видалити все
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
