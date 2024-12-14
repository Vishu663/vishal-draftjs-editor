import { useState, useEffect, useRef } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./styles.css";

const CustomEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const styleMap = {
    RED: {
      color: "red",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
  };

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const onChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const selectionState = newEditorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const blockText = block.getText();

    if (blockText.startsWith("# ")) {
      const newContentState = Modifier.replaceText(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: blockText.length,
        }),
        blockText.substring(2)
      );

      const updatedEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "change-block-type"
      );

      const finalEditorState = RichUtils.toggleBlockType(
        updatedEditorState,
        "header-one"
      );
      setEditorState(finalEditorState);
      return;
    }

    if (blockText.startsWith("* ")) {
      const newContentState = Modifier.replaceText(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: blockText.length,
        }),
        blockText.substring(2)
      );

      const updatedEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "apply-entity"
      );

      const finalEditorState = RichUtils.toggleInlineStyle(
        updatedEditorState,
        "BOLD"
      );
      setEditorState(finalEditorState);
      return;
    }

    if (blockText.startsWith("** ")) {
      const newContentState = Modifier.replaceText(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: blockText.length,
        }),
        blockText.substring(3)
      );

      const updatedEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "apply-entity"
      );

      const finalEditorState = EditorState.setInlineStyleOverride(
        updatedEditorState,
        editorState.getCurrentInlineStyle().has("RED")
          ? editorState.getCurrentInlineStyle().remove("RED")
          : editorState.getCurrentInlineStyle().add("RED")
      );

      setEditorState(finalEditorState);
      return;
    }

    if (blockText.startsWith("*** ")) {
      const newContentState = Modifier.replaceText(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: blockText.length,
        }),
        blockText.substring(4)
      );

      const updatedEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "apply-entity"
      );

      const finalEditorState = EditorState.setInlineStyleOverride(
        updatedEditorState,
        editorState.getCurrentInlineStyle().has("UNDERLINE")
          ? editorState.getCurrentInlineStyle().remove("UNDERLINE")
          : editorState.getCurrentInlineStyle().add("UNDERLINE")
      );

      setEditorState(finalEditorState);
      return;
    }

    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
    alert("Editor content saved!");
  };

  return (
    <>
      <div className="editor-main">
        <div className="editor-header">
          <div></div>
          <h5>Demo Editor by Vishal</h5>
          <button onClick={handleSave}>Save</button>
        </div>
        <div className="editor-container" onClick={focusEditor}>
          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={onChange}
            customStyleMap={styleMap} // Attach custom style map
          />
        </div>
      </div>
    </>
  );
};

export default CustomEditor;
