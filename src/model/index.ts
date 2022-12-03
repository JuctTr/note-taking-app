export interface INoteItem {
  id: number;
  title: string;
  body: string;
  updated: string;
  activeNote?: number;
}

export function getAllNotes() {
  const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
  return notes.sort((a: INoteItem, b: INoteItem) => {
    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
  });
}

export function saveNote(noteToSave: INoteItem): void {
  const notes = getAllNotes();
  const existing = notes.find((note: INoteItem) => note.id === noteToSave.id);

  // Edit/Update
  if (existing) {
    existing.title = noteToSave.title;
    existing.body = noteToSave.body;
    existing.updated = new Date().toISOString();
  } else {
    noteToSave.id = Math.floor(Math.random() * 1000000);
    noteToSave.updated = new Date().toISOString();
    notes.push(noteToSave);
  }

  localStorage.setItem("notesapp-notes", JSON.stringify(notes));
}

export function deleteNode(noteId: number) {
  const notes = getAllNotes();
  const newNotes = notes.filter((note: INoteItem) => note.id !== noteId);
  localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
}
