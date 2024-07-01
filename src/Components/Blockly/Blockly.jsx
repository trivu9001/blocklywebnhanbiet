import React, { useEffect, useRef, useState } from "react";
import { save, load } from "../../BlocklyJS/serialization";
import * as Blockly from "blockly";
import { GetAllDefineBlock } from "../../Api/block";
import "./blockly.css";
const BlocklyComponent = (props) => {
  const { toolbox, workspace, setWorkspaceReady, answerType } = props;
  const [error, setError] = useState(false);
  const [toolboxParse, setToolboxParse] = useState(null);
  const [workspaceParse, setWorkspaceParse] = useState(null);
  const [defineBlock, setDefineBlock] = useState([]);

  const blocklyDivRef = useRef(null);
  const wsRef = useRef(null);
  const initial = async () => {
    try {
      const res = await GetAllDefineBlock();
      if (res.resultCode === 0) {
        setDefineBlock(res.data);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    initial();
  }, []);

  useEffect(() => {
    if (defineBlock.length > 0) {
      defineBlock.forEach((blockDef) => {
        const blockJson = JSON.parse(blockDef.blockly);
        Blockly.Blocks[blockDef.typeof] = {
          init: function () {
            this.jsonInit(blockJson);
          },
        };
      });
    }
    try {
      setToolboxParse(JSON.parse(toolbox));
      setWorkspaceParse(JSON.parse(workspace));
      setError(false);
    } catch (error) {
      alert(error);
      setError(true);
    }
  }, [toolbox, workspace, defineBlock]);

  useEffect(() => {
    if (
      !blocklyDivRef.current ||
      error ||
      !toolboxParse ||
      !workspaceParse ||
      defineBlock.length === 0
    )
      return;

    if (wsRef.current) {
      wsRef.current.dispose();
    }

    const blocklyDiv = blocklyDivRef.current;
    const newWorkspace = Blockly.inject(blocklyDiv, {
      toolbox: toolboxParse,
      trashcan: true,
      grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.5,
      },
    });
    load(newWorkspace, workspaceParse);
    wsRef.current = newWorkspace;

    if (setWorkspaceReady) {
      setWorkspaceReady(newWorkspace);
    }

    // Lắng nghe sự kiện thay đổi trên workspace
    newWorkspace.addChangeListener((event) => {
      if (event.type !== Blockly.Events.UI) {
        setWorkspaceReady(newWorkspace); // Cập nhật workspace mỗi khi có thay đổi
      }
    });
    newWorkspace.addChangeListener((event) => {
      if (event.type == Blockly.Events.BLOCK_CREATE) {
        var blockType = answerType;
        console.log(blockType);
        var blocks = newWorkspace.getAllBlocks(false);
        var count = blocks.filter((block) => block.type === blockType).length;

        // Nếu đã tồn tại một block cùng loại, hủy sự kiện tạo block
        if (count > 1) {
          var createdBlockIds = event.ids;
          createdBlockIds.forEach(function (id) {
            var block = newWorkspace.getBlockById(id);
            if (block && block.type === blockType) {
              setTimeout(() => block.dispose(true), 1); // Xóa block mới tạo
            }
          });
          alert("Chỉ có một block câu hỏi được tồn tại.");
        }
      }
    });
  }, [toolboxParse, workspaceParse, error, defineBlock, setWorkspaceReady]);

  if (error) {
    return <div>Blockly có vấn đề, vui lòng kiểm tra lại.</div>;
  }
  return <div ref={blocklyDivRef} id="blocklyDiv"></div>;
};

export default BlocklyComponent;
