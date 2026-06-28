import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import ApplicationForm from './components/ApplicationForm'
import ApplicationList from './components/ApplicationList'

function App() {
  const [refresh, setRefresh] = useState(0);
   const [editApplication, setEditApplication] = useState(null);

  const handleSave = ()=>{
     setEditApplication(null);
    setRefresh(prev => !prev);
  }

  const handleEdit = (application) => {
    setEditApplication(application); // Form mai data bhejo
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Form tak scroll karo
  };

  return (
    <>
    <div className="min-h-screen bg-grey-100">
      <Navbar />

      <div className="max-w-5x1 mx-auto px-4 py-8">
        <ApplicationForm  onSave={handleSave}
        editApplication={editApplication}/>
        <h2 className="text-lg font-semibold text-grey-700 mb-4">
          Application List
        </h2>
        <ApplicationList refresh={refresh} onEdit={handleEdit}/>
      </div>
      
    </div>
    </>
  )
}

export default App
