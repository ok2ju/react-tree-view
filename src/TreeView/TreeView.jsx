import { useEffect, useReducer } from 'react';
import ExpandIcon from './icons/Expand';
import CollapseIcon from './icons/Collapse';
import AddIcon from './icons/Add';
import RemoveIcon from './icons/Remove';
import { reducer, traverseTree } from './utils';
import { Tree, Node, NodeInfo, Controls, TogglerIconBox, Label, Content } from './styles';

const getExandableNodes = (tree) => {
  return traverseTree((acc, curr) => {
    return curr.children && curr.children.length ? [...acc, curr.id] : acc;
  })([], tree);
};

const TreeView = ({
  data,
  isExpandable,
  isSelectable,
  hasNodeControls,
  collapsedByDefault,
  onNodeClick,
  onAddNode,
  onRemoveNode,
}) => {
  const [state, setState] = useReducer(reducer, {
    selected: null,
    collapsed: [],
  });

  useEffect(() => {
    if (collapsedByDefault) {
      setState({ collapsed: getExandableNodes(data) });
    }
  }, [data, collapsedByDefault]);

  const handleNodeClick = (node) => () => {
    if (isSelectable) {
      setState({ selected: node.id });
    }

    if (onNodeClick) {
      onNodeClick(node)
    }
  };

  const handleAddNode = (parent) => () => {
    if (onAddNode) {
      onAddNode(parent);
    }
  };

  const handleRemoveNode = (nodeId) => () => {
    if (onRemoveNode) {
      onRemoveNode(nodeId);
    }
  };

  const handleExpandNode = (nodeId) => () => {
    setState({ collapsed: state.collapsed.filter(id => id !== nodeId ) });
  };

  const handleCollapseNode = (nodeId) => () => {
    setState({ collapsed: [...state.collapsed, nodeId] });
  };

  const constructNodes = (nodes) => {
    return nodes.map((node, idx) => (
      <Node key={idx}>
          <NodeInfo>
            {node.children?.length > 0 && isExpandable && (
              <TogglerIconBox>
                {state.collapsed.includes(node.id)
                  ? <ExpandIcon onClick={handleExpandNode(node.id)} />
                  : <CollapseIcon onClick={handleCollapseNode(node.id)} />
                }
              </TogglerIconBox>
            )}
            <Label
              selected={state.selected === node.id}
              onClick={handleNodeClick(node)}
            >
              {node.name}
            </Label>
            {hasNodeControls && (
              <Controls>
                <AddIcon onClick={handleAddNode(node.id)} />
                {!node.children?.length && <RemoveIcon onClick={handleRemoveNode(node.id)} />}
              </Controls>
            )}
          </NodeInfo>
          {node.children?.length > 0 && !state.collapsed.includes(node.id)
            ? <Content>{constructNodes(node.children)}</Content>
            : null
          }
        </Node>
    ));
  }

  return (
    <Tree>{constructNodes(data)}</Tree>
  );
};

TreeView.defaultProps = {
  data: [],
  isExpandable: true,
  isSelectable: true,
  hasNodeControls: true,
  collapsedByDefault: false,
};

export default TreeView;
