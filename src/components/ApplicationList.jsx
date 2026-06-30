import React, { useEffect, useState } from 'react'
import {ApplicationService} from '../service/ApplicationService'

const ApplicationList = ({refresh, onEdit}) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async ()=>{
        setLoading(true);

        try{
            const res = await ApplicationService.getAll();
            setApplications(res.data);
        }catch(e){
            alert('application is not load' + e.message);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
      fetchApplications();
    }, [refresh]);


    const handleDelete = async (id) => {
    if (!window.confirm('Final Call For Delete !! ')) return;
    try {
      await ApplicationService.delete(id);
      fetchApplications(); // List refresh karo
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };
    
const statusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-700';
      case 'Interview': return 'bg-yellow-100 text-yellow-700';
      case 'Offer': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
   if (loading) return (
    <div className="text-center py-10 text-gray-400">Loading...</div>
  );

   if (applications.length === 0) return (
    <div className="text-center py-10 text-gray-400">
      Koi application nahi mila. Pehle add karo!
    </div>
  );

  return (
   <div className="bg-white rounded-xl shadow overflow-hidden">
    <table className="w-full text-sm">
        <thead className="bg-blue-50 text-blue-700">
            <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Job Title</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Applied Date</th>
                <th className="px-4 py-3 text-left">Notes</th>
            </tr>
        </thead>

        <tbody>
            {applications.map((app,i)=>(
            <tr key={app.id || i} className={`border-t border-grey-100 ${i % 2 === 0 ? 'bg-white':'bg-grey-50'}`}>
                <td className="px-4 py-3 front-medium text-grey-800">{app.companyName}</td>
                <td className="px-4 py-3 font-medium text-grey-800">{app.jobTitle}</td>
                <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor(app.status)}`}>{app.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-600">{app.appliedDate || '-'}</td>
                <td className="px-4 py-3 text-gray-600">{app.notes || '-'}</td>
            
             <td className="px-4 py-3 text-center flex justify-center gap-2">

                {/* Edit Button */}
                <button onClick={() => onEdit(app)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                  Edit
                </button>

                {/* Delete Button */}
                <button onClick={() => handleDelete(app.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                  Delete
                </button>

              </td>
            
            </tr>    
            ))}


        </tbody>
    </table>
   </div>
  )
}

export default ApplicationList
