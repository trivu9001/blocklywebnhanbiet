import React, { useState } from "react";
import "./blocklycontainer.css";
import BlocklyComponent from "../Blockly/Blockly";
const BlocklyContainer = React.memo((props) => {
  const { toolbox, workspace, setWorkspaceReady } = props;
  return (
    <div className="blockly-container">
      <BlocklyComponent
        toolbox={toolbox}
        workspace={workspace}
        setWorkspaceReady={setWorkspaceReady}
      />
    </div>
  );
});

export default BlocklyContainer;
