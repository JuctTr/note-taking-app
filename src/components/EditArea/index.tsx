import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./index.css";
import { getAllNotes, INoteItem } from "../../model";

type IProps = {
  // onUpdateNote: (item: Partial<INoteItem>) => void;
  activeId: number;
};

function EditArea(
  { activeId }: IProps,
  ref: React.Ref<unknown> | undefined
): React.ReactElement | null {
  const [value, setValue] = useState<string>("");
  const [bodyValue, setBodyValue] = useState<string>("");

  useEffect(() => {
    const nodes = getAllNotes();
    nodes.forEach((item: INoteItem) => {
      if (item.id === activeId) {
        setValue(item.title);
        setBodyValue(item.body);
      }
    });
  }, [activeId]);

  useImperativeHandle(ref, () => ({
    id: activeId,
    title: value,
    body: bodyValue,
  }));

  // const onBlur = (event: React.BaseSyntheticEvent) => {
  //   // const currentValue = event.target.value;
  //   onUpdateNote({
  //     id: activeId,
  //     title: value,
  //     body: bodyValue,
  //   });
  // };
  // const onBodyBlur = (event: React.BaseSyntheticEvent) => {
  //   // const currentValue = event.target.value;
  //   onUpdateNote({
  //     id: activeId,
  //     title: value,
  //     body: bodyValue,
  //   });
  // };

  return (
    <div className="notes__preview">
      <input
        className="notes__title"
        type="text"
        onInput={(e) => setValue(e.target.value)}
        value={value}
        // onBlur={onBlur}
        placeholder="新笔记..."
      />
      <textarea
        className="notes__body"
        value={bodyValue}
        onInput={(e) => setBodyValue(e.target.value)}
        // onBlur={onBodyBlur}
        placeholder="编辑笔记..."
      ></textarea>
    </div>
  );
}

export default forwardRef(EditArea);
