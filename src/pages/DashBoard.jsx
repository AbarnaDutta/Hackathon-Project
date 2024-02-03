import React from 'react'
import LoggedInNavBar from '../components/LoggedInNavBar'
import CreateOrganizationPage from '../components/CreateOrganisation';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function DashBoard() {

    function navigateToCreateOrganisation() {
        navigate('/createOrganisation');
    }

    return (
        <div>
            <LoggedInNavBar />
            <div className='flex justify-center items-center h-screen'>
                <Link to={'/createOrganisation'}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Create Organisation
                    </button>
                </Link>
            </div>
        </div>
    )
}
