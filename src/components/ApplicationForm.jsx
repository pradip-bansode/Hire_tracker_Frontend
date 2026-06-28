import React, { useEffect, useState } from 'react'
import ApplicationService from '../service/ApplicationService'

const initialState = {
  companyName: '',
  jobTitle: '',
  status: 'Applied',
  appliedDate: '',
  jobLink: '',
  notes: ''
};

const ApplicationForm = ({onSave, editApplication}) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (editApplication) {
      setFormData({
        companyName: editApplication.companyName,
        jobTitle: editApplication.jobTitle,
        status: editApplication.status,
        appliedDate: editApplication.appliedDate || '',
        jobLink: editApplication.jobLink || '',
        notes: editApplication.notes || ''
      });
    } else {
      setFormData(initialState);
    }
  }, [editApplication]);

const handleChange = (e)=>{
setFormData({...formData, [e.target.name]: e.target.value});
}

const handleSubmit = async (e)=>{
e.preventDefault();
setLoading(true);

try{
  if(editApplication){
    await ApplicationService.update(editApplication.id,formData);
  }else{
    await ApplicationService.create(formData);
  }
    setFormData(initialState);
    onSave();
}catch(err){
  alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
}


const inputClass = "w-full border border-grey-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-grey-700 mb-4">
            New Job Application Add
        </h2>

<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
    <label  className="text-xs text-gray-500 mb-1 block">Company Name</label>
    <input name="companyName" value={formData.companyName} 
    onChange={handleChange} required className={inputClass}
    placeholder='google'/>

</div>

<div>
          <label className="text-xs text-gray-500 mb-1 block">Job Title</label>
          <input name="jobTitle" value={formData.jobTitle}
            onChange={handleChange} required className={inputClass}
            placeholder="Software Engineer" />
        </div>

        <div>
            <label className="text-xs text-gray-500 mb-1 block">Status</label>
            <select name="status" value={formData.status}
            onChange={handleChange} className={inputClass}>

            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>

            </select>
            </div>
            <div>
                <label className='text-xs text.gray-500 mb-1 block'>Application Date</label>
                <input name='appliedDate' type='date' value={formData.appliedDate}
                onChange={handleChange} className={inputClass} />
            </div>

            <div className="md:col-span-2">
                <label className="text-xs text-gayt-500 mb-1 block">Notes</label>
                <input name='notes' value={formData.notes} 
                onChange={handleChange} className={inputClass} 
                placeholder='Referral or link...'/>
            </div>


            <div className="md:col-span-2 flex gap-3">
          <button type="submit" disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
            {loading ? 'Saving...' : editApplication ? 'Update Karo' : 'Add Karo'}
          </button>

          {editApplication && (
            <button type="button" onClick={onSave}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg">
              Cancel
            </button>
        )}
        </div>



</form>

    </div>
  )
}

export default ApplicationForm
