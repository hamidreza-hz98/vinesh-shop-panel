"use client"

import React from "react";
import ReactQuill, { Quill } from "react-quill-new";
import QuillTableBetter from "quill-table-better";

import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.bubble.css";
import "quill-table-better/dist/quill-table-better.css";

Quill.register(
  {
    "modules/table-better": QuillTableBetter,
  },
  true
);



const RichTextEditor = ({ text = "", onChange }) => {
  const quillEditRef = React.useRef(null);

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: 1 }, { header: 2 }], // custom button values
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["link", "image"],
          [{ list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          // ['tableUI']
          ["table-better"], // 添加表格工具按钮
        ],
      },
      table: false,
      "table-better": {
        language: "en_US",
        menus: ["column", "row", "merge", "table", "cell", "wrap", "delete"],
        toolbarTable: true,
      },
      keyboard: {
        bindings: QuillTableBetter.keyboardBindings,
      },
    }),
    []
  );

  return (
      <ReactQuill
          ref={quillEditRef}
          onChange={onChange}
          key={`edit`}
          id={`edit`}
          theme={"snow"}
          // value={value}
          modules={modules}
        />
  );
};

export default RichTextEditor;
