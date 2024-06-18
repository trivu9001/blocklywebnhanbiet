import * as Blockly from "blockly/core";
import { json } from "react-router-dom";

const storageKey = "mainWorkspace";

export const save = function (workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  return JSON.stringify(data);
};

export const load = function (workspace, dataWorkspace) {
  // Don't emit events during loading.
  Blockly.Events.disable();
  Blockly.serialization.workspaces.load(dataWorkspace, workspace, false);
  Blockly.Events.enable();
};

export const checkAnswer = function (workspace) {
  var blocks = workspace.getAllBlocks();
  var correct = false;
  blocks.forEach((block) => {
    if (block.type === "cat_sound_question") {
      var answerBlock = block.getInputTargetBlock("ANSWER");
      if (answerBlock && answerBlock.type === "test") {
        var answerValue = answerBlock.getFieldValue("test");
        console.log(answerBlock, answerValue);
        if (answerValue === "OPTIONNAME1") {
          correct = true;
        }
      }
    }
  });
  return correct;
};
