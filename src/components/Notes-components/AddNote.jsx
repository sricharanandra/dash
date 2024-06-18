import { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IconContext } from "react-icons";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };

  return (
    <div className="note-new">
      <textarea
        className="add-note-textarea"
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="add-note-footer">
        {characterLimit - noteText.length} Remaining
        <IconContext.Provider
          value={{
            style: {
              height: "25px",
              color: "white",
              backgroundColor: "#292b2f",
              width: "25px",
            },
            className: "global-class-name",
          }}
        >
          <button className="save" onClick={handleSaveClick}>
            <MdOutlineAddCircleOutline />
          </button>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default AddNote;
