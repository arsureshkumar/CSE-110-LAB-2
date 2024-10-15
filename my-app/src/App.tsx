import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter, LikeButton, LikeList, ToggleTheme } from "./hooksExercise";
import { LikesContext } from './likeContext';
import { useState } from 'react';
import { ThemeContext, themes } from './themeContext';

function App() {
  const [currentLikes, setCurrentLikes] = useState<any[]>([]);

  const updateLikes = (like: any) => {
    console.log(currentLikes);
    setCurrentLikes((currentLikes) => {
      if (currentLikes.includes(like)) {
        return currentLikes.filter((l: any) => l !== like); // Remove like if it exists
      } else {
        return [...currentLikes, like]; // Add like if it doesn't exist
      }
    });
  };

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  return (
    <div className='app-container'>
      <LikesContext.Provider value={{ likes: currentLikes, updateLikes }}>
        <ThemeContext.Provider value={themes.light}>
          <form className="note-form" onSubmit={createNoteHandler}>
            <div>
              <input
                placeholder="Note Title"
                onChange={(event) =>
                  setCreateNote({ ...createNote, title: event.target.value })}
                required>
              </input>
            </div>

            <div>
              <textarea
                onChange={(event) =>
                  setCreateNote({ ...createNote, content: event.target.value })}
                required>
              </textarea>
            </div>

            <div>
              <select
                onChange={(event) =>
                  setCreateNote({ ...createNote, label: event.target.value as Label})}
                required>
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
            </div>

            <div><button type="submit">Create Note</button></div>
          </form>

          <div className="notes-grid">
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-item"
              >
                <div className="notes-header">
                  <LikeButton name={note.title}/>
                  <button>x</button>
                </div>
                <h2 contentEditable> {note.title} </h2>
                <p contentEditable> {note.content} </p>
                <p contentEditable> {note.label} </p>
              </div>
            ))}
          </div>
          <ToggleTheme />
          <LikeList />
        </ThemeContext.Provider>
      </LikesContext.Provider>
    </div>

  );
}

export default App;