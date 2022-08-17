import { Note } from "./Note"
import "./App.scss"
// import { WhiteNoteList } from "./WhiteNoteList"
// import { BlackNoteList } from "./BlackNoteList"
import { NoteList } from "./NoteList"
import { Kobo } from "./sheets/Kobo"
import { useState } from "react"

export const App = () => {    
    const [noteList, setNoteList] = useState(NoteList)

    const ActiveNote = (name, delay) => {
        let chosenNote = NoteList.map((note) => {
            if (note.name === name) {
                note.isActive = true
            }
            return note
        })
        setNoteList(chosenNote)
        
        setTimeout(() => {
            let chosenNote = NoteList.map((note) => {
                if (note.name === name) {
                    note.isActive = false
                }
                return note
            })
            setNoteList(chosenNote)
        }, delay)
    }

    const GetNote = (list) => {
        let delay = 0
        Kobo.forEach((item) => {
            item.name.forEach((i) => {
                NoteList.forEach((note) => {
                    if (i === note.name) {
                        setTimeout(() => {
                            ActiveNote(i, item.delay)
                            new Audio(note.audio).play()
                        }, delay)
                    }
                })
            })
            delay += item.delay
        })
    }

    return (
        <div className="container">
            {noteList.map((note, index) => {
                return (
                    <Note key={index} className="white-note" isActive={note.isActive} name={note.name} />
                )
            })}
            <button className="activate" type="button" onClick={GetNote}></button>
        </div>
    )
}