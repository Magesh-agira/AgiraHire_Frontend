import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavigation from './SideNavigation';

const Home = ({ loggedIn, email }) => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
      // Log out logic
    } else {
      // Navigate to login page
      navigate('/login');
    }
  };

  return (
    <div className="mainContainer">
       {/* <SideNavigation /> */}
      <div className={'titleContainer'}>
        <div>Welcome</div> {/* Updated text */}
      </div>
      {/* Updated text */}
      <div className={'contentContainer'}>
        <div>AgiraHire home page.</div>
      </div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

export default Home;
