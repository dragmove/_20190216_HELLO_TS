import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};

class RichTextEditor extends Component {
  editor = null;

  constructor(props) {
    super(props);

    const _ = this;

    _.state = {
      editorState: EditorState.createEmpty()
    };

    _.setEditor = editor => {
      _.editor = editor;
    };

    _.onChange = editorState => _.setState({ editorState });

    _.focusEditor = () => {
      if (_.editor) _.editor.focus();
    };

    _.handleKeyCommand = _._handleKeyCommand.bind(_);
  }

  componentDidMount() {
    this.focusEditor();
  }

  _handleKeyCommand(command, editorState) {
    const _ = this;

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      _.onChange(newState);
      return true;
    }

    return false;
  }

  render() {
    const _ = this;

    return (
      <div className="rich-text-editor" style={styles.editor} onClick={_.focusEditor}>
        <Editor
          ref={_.setEditor}
          editorState={_.state.editorState}
          handleKeyCommand={_.handleKeyCommand}
          onChange={_.onChange}
        />
      </div>
    );
  }
}

export default RichTextEditor;
