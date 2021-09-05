import { useState } from 'react';
import styled from 'styled-components';
import TreeView from './TreeView';
import data from './nodes';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const TreeViewContainer = styled.div`
  min-width: 350px;
`;

const FormContainer = styled.div`
  border-left: 1px dashed #999;
  padding: 16px;
  width: 350px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 8px;
  height: 24px;
`;

const NoSelectedNodeContainer = styled.div`
  border-left: 1px dashed #999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 350px;
`;

const NoSelectedNodeMessage = styled.h1`
  font-size: 14px;
  font-weight: 100;
  text-align: center;
  color: #999;
`;

const Playground = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <Container>
      <TreeViewContainer>
        <TreeView data={data} onNodeClick={handleNodeClick} />
      </TreeViewContainer>
      {selectedNode?.id && (
        <FormContainer>
          <Label htmlFor="name_field">Name</Label>
          <Input
            id="name_field"
            type="text"
            placeholder="Title"
            value={selectedNode.name}
            onChange={() => {}}
          />
          <Label htmlFor="weight_field">Weight</Label>
          <Input
            id="weight_field"
            type="text"
            placeholder="Weight"
            value={selectedNode.weight}
            onChange={() => {}}
          />
        </FormContainer>
      )}
      {!selectedNode && (
        <NoSelectedNodeContainer>
          <NoSelectedNodeMessage>
            To modify node fields please select one from the tree
          </NoSelectedNodeMessage>
        </NoSelectedNodeContainer>
      )}
    </Container>
  );
};

export default Playground;
