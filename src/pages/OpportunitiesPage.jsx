import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbarr';
import "../styles/OpportunitiesPage.css";
import { CiLocationOn } from "react-icons/ci";
import { FiBriefcase } from "react-icons/fi";
import { CiMoneyCheck1 } from "react-icons/ci";

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const { authState } = useContext(AuthContext);
  const { isAuthenticated } = authState;

  useEffect(() => {
    const fetchOpportunities = async () => {
      const res = await axios.get('http://localhost:8080/api/v1/opportunity/');
      setOpportunities(res.data);
    };
    fetchOpportunities();
  }, []);

  return (
    <div className='opportunities-page'>
    <Navbar />
    <h1>Opportunities</h1>
    <div className='opportunities-container'>
      <ul>
        {opportunities.map((opportunity) => (
          
          <li key={opportunity._id}>
            <h2>{opportunity.profileName}</h2>
            <p className='companyName'>{opportunity.companyName}</p>
            <div className='jobDetails'>
              <p> <span><CiLocationOn /></span> {opportunity.location.map((loc, index) => (
                <span key={index}>
                  {loc.string}
                  {index !== opportunity.location.length - 1 && ' | '}
                </span>
              ))}
              </p>
              <p> <span><FiBriefcase /></span>{opportunity.duration}</p>
              <p><span><CiMoneyCheck1 /></span>{opportunity.stipend.salary} {opportunity.stipend.currency} {opportunity.stipend.salaryType}</p>
            </div>
           
            <p className='startdate'>{opportunity.startDate}</p>
            {isAuthenticated ? (
              <button className='apply'><Link to={`/apply/${opportunity._id}`}>Apply</Link></button>
            ) : (
              <button className='apply'><Link to="/login">Login to Apply</Link></button>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default OpportunitiesPage;