import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "../Notes-components/NotesList";
import Search from "../Notes-components/Search";
import AddNote from "../Notes-components/AddNote";
import "../../styles/Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    if (savedNotes.length > 0) {
      setNotes(savedNotes);
    }
  }, ["notes"]);

  useEffect(() => {
    const saveNotes = () => {
      localStorage.setItem("notes", JSON.stringify(notes));
    };

    saveNotes();

    return saveNotes;
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  return (
    <>
      <div className="search">
        <Search handleSearchNote={setSearchText} />
      </div>
      <div className="notes-area">
        {notes.length === 0 ? (
          <div className="NoNotes">
            <AddNote handleAddNote={addNote} />
          </div>
        ) : (
          <div className="Noter">
            <NotesList
              notes={notes.filter((note) =>
                note.text.toLowerCase().includes(searchText.toLowerCase())
              )}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
