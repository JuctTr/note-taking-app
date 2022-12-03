import { useState, useRef } from "react";
import NoteItem from "./components/NoteItem";
import EditArea from "./components/EditArea";
import { getAllNotes, INoteItem, saveNote, deleteNode } from "./model";
import useOnLoad from "./common/hook/useOnLoad";

function App() {
  console.log(
    "【App】render",
    "开发阶段处于严格模式，每一次渲染会有两次，生产环境就不会"
  );
  const [noteList, setNoteList] = useState<INoteItem[]>([]);
  let [activeId, setActiveId] = useState<number>(-1);
  const editAreaRef = useRef(null);

  const onAddNote = () => {
    saveNote({
      id: -1,
      title: "新建笔记...",
      body: "开始记录...",
      updated: new Date().toISOString(),
    });
    onUpdateNote();
  };

  const onDeleteNote = () => {
    let str =
      noteList.length <= 0 ? "没有笔记可删除了～" : "确认要删除该笔记吗?";
    const modal = confirm(str);

    if (noteList.length > 0 && modal) {
      deleteNode(activeId);
      onUpdateNote();
    }
  };

  const onUpdateNote = (item?: Partial<INoteItem>) => {
    if (item) saveNote(item as INoteItem);
    let allNotes = getAllNotes();
    setNoteList(allNotes);
    if (allNotes.length > 0) setActiveId(allNotes[0].id);
    return allNotes;
  };

  const onSaveNote = () => onUpdateNote(editAreaRef.current);

  const onChangeActiveId = (id: number) => setActiveId(id);

  useOnLoad(() => onUpdateNote());

  return (
    <div className="App">
      <div className="notes__sidebar">
        <button onClick={onAddNote} className="notes__add" type="button">
          添加新的笔记 📒
        </button>
        <button onClick={onDeleteNote} className="notes__add">
          删除选中的笔记
        </button>
        <button onClick={onSaveNote} className="notes__add">
          保存
        </button>
      </div>
      <div className="notes__list">
        {noteList.map((item) => (
          <NoteItem
            key={item.id}
            nodeItem={item}
            onChangeActiveId={onChangeActiveId}
            activeId={activeId}
          />
        ))}
      </div>
      <EditArea activeId={activeId} ref={editAreaRef} />
    </div>
  );
}

export default App;
