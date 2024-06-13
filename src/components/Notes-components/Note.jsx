import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";

const Note = ({ id, text, date, handleDeleteNote }) => {
  return (
    <div className="note">
      <span className="note-text">{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <IconContext.Provider
          value={{
            style: { height: "15px", color: "#e5e7eb", width: "15px" },
            className: "global-class-name",
          }}
        >
          <button
            className="delete-button"
            onClick={() => handleDeleteNote(id)}
          >
            <MdDeleteForever />
          </button>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Note;
