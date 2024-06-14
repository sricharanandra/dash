import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";

const Note = ({ id, text, date, handleDeleteNote }) => {
  return (
    <div className="note">
      <div className="note-text">{text}</div>
      <div className="note-footer">
        <div className="date">{date}</div>

        <div className="delete-button">
          <IconContext.Provider
            value={{
              style: {
                height: "15px",
                width: "15px",
                backgroundColor: "#e5e7eb ",
              },
              className: "global-class-name",
            }}
          >
            <button className="del-button" onClick={() => handleDeleteNote(id)}>
              <MdDeleteForever />
            </button>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Note;
