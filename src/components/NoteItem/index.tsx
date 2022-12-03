import React, { useState } from "react";
import "./index.css";
import type { INoteItem } from "../../model";
const MAX_BODY_LENGTH = 60;

type IProps = {
  nodeItem: INoteItem;
  onChangeActiveId: (id: any) => void;
  activeId: number;
};

export default function NoteItem(props: IProps): React.ReactElement | null {
  const { title, id, body, updated } = props.nodeItem;

  const onClickNoteItem = () => {
    props.onChangeActiveId(id);
  };

  return (
    <div
      className={`notes__list-item ${
        id === props.activeId ? "notes__list-item--selected" : ""
      }`}
      onClick={onClickNoteItem}
    >
      <div className="notes__small-title">{title}</div>
      <div className="notes__small-body">
        {body?.substring(0, MAX_BODY_LENGTH)}
        {body?.length > MAX_BODY_LENGTH ? "..." : ""}
      </div>
      <div className="notes__small-updated">
        {new Date(updated).toLocaleString("zh-CN", {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </div>
    </div>
  );
}
