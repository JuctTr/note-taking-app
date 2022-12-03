function App() {
  const onAddNote = () => {};

  const onDeleteNote = () => {};

  const onUpdateNote = () => {};

  const onSaveNote = () => {};

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
    </div>
  );
}

export default App;
