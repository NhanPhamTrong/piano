import { NoteList } from "./NoteList"

export const Note = (props) => {
    const ClickNote = (e) => {
        NoteList.forEach((note) => {
            if (note.name === e.target.getAttribute("name")) {
                new Audio(note.audio).play()
            }
        })
    }

    return (
        <button className={props.className + (props.isActive ? " active" : "")} type="button" name={props.name} onClick={ClickNote}></button>
    )
}