import { useState } from 'react';
import Navbar from '../components/Navbar';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationList from '../components/ApplicationList';

const DashboardPage = () => {
  const [refresh, setRefresh] = useState(0);
  const [editApplication, setEditApplication] = useState(null);

  const handleSave = () => {
    setEditApplication(null);
    setRefresh(prev => prev + 1);
  };

  const handleEdit = (application) => {
    setEditApplication(application);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Dashboard baad mai add karenge */}

        <ApplicationForm
          onSave={handleSave}
          editApplication={editApplication}
        />

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          📝 Applications List
        </h2>

        <ApplicationList
          refresh={refresh}
          onEdit={handleEdit}
        />

      </div>
    </div>
  );
};

export default DashboardPage;