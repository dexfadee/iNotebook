import React from 'react';
import Notes from './Notes';

const Home = (props) => {

  return (
    <div className='bg-white dark:bg-gray-900 overflow-hidden'>
    <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home