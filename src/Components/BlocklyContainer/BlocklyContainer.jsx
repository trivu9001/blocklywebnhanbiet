import React, { useState } from "react";
import "./blocklycontainer.css";
import BlocklyComponent from "../Blockly/Blockly";
const BlocklyContainer = React.memo((props) => {
  const { toolbox, workspace, setWorkspaceReady, answerType } = props;
  return (
    <div className="blockly-container">
      <BlocklyComponent
        toolbox={toolbox}
        workspace={workspace}
        setWorkspaceReady={setWorkspaceReady}
        answerType={answerType}
      />
    </div>
  );
});

export default BlocklyContainer;
