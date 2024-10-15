import React, { useState, useContext, useEffect } from 'react';
import { LikesContext, likes } from './likeContext';
import { ThemeContext, themes } from "./themeContext";

export function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}> Toggle Theme </button>
      <ClickCounter />
    </ThemeContext.Provider>
  );
}

export function ClickCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  const theme = useContext(ThemeContext);
  return (
    <div
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "20px",
      }}
    >
      <p>You clicked {count} times </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ background: theme.foreground, color: theme.background }}
      >
        Click me
      </button>
    </div>
  );
}

export function LikeButton({name} : {name: string}) {
  const [color, setColor] = useState('gray');
  const {likes, updateLikes} = useContext(LikesContext);

  const handleClick = () => {
    setColor(color == 'red' ? 'gray' : 'red');
    updateLikes(name);
  };

  return (
    <div>
      <button onClick={handleClick} style={{color}}>♥</button>
    </div>
  );
}

export function LikeList() {
  const {likes, updateLikes} = useContext(LikesContext);

  return (
    <div>
      <h2> Likes </h2>
      <ul>
        {likes.map((like) => (
          <li key={like}> {like} </li>
        ))}
      </ul>
    </div>
  );
}