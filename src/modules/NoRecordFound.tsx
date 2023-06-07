import React from 'react'
import styled from 'styled-components';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
const NoRecordFound = () => {
  return (
    <NoRecordFoundContainer>
        <RuleFolderIcon fontSize='large'/>
        <span>No Todos yet, please create some!</span>
    </NoRecordFoundContainer>
  )
}

export default NoRecordFound;

const NoRecordFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  span {
    font-size: 20px;
  }
`;