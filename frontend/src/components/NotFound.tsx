import React from 'react';
import '../styles/NotFound.css';
import { useNavigate } from 'react-router-dom';


const NotFound: React.FC = () => {

  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  return (	
<div className="background-img">
		<div className="space"></div>
			<div className="wrapper">
				<div className="img-wrapper">
					<span>44</span>
				</div>
				<p>The page you are trying to search has been moved to another universe.</p>
				<button type="button" onClick={handleGoToHome}>GET ME HOME</button>
			</div>
		</div>
  );
};

export default NotFound;
