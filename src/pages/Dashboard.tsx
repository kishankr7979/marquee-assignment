import React, { useContext } from 'react'
import TodoApp from '../modules/TodoAppComponent';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import routerPaths from '../navigation';
import AuthContext from '../context/auth/AuthContext';
import { CLEAR_CONTEXT } from '../context/auth/action';
const Dashboard = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(AuthContext);
  const onLogoutClick = () => {
    // remove token from local storage, clear app context and navigate to login page
    if(window.confirm("Are you sure you want to logout")){
      dispatch({type: CLEAR_CONTEXT})
      localStorage.removeItem('todo-app-auth')
      navigate(routerPaths.Login);
    }
    else return;
  
  }
  return (
    <Parent>
      <div className='user-info'>
        <span>Welcome User : <strong>{state['userId']}</strong></span>
      </div>
      <TodoApp />
      <div className="logout-btn" onClick={onLogoutClick}>
        <LogoutIcon color='error'/>
        <span>Logout</span>
        </div>
    </Parent>
  )
}

export default Dashboard;

const Parent = styled.div`
  display: flex;
  position: relative;
  .user-info{
    position: absolute;
    left: 20px;
    top: 20px;
  }
  .logout-btn {
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 20px;
    align-items: center;
    gap: 4px;
    top: 20px;
    background: #f5f5f5;
    padding: 6px;
    border-radius: 6px;
  }
`;