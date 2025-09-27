
import React, { useState } from 'react';
import { QuotationData, Member } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface AddMembersProps {
  data: QuotationData;
  setData: React.Dispatch<React.SetStateAction<QuotationData>>;
  nextStep: () => void;
  prevStep: () => void;
}

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const AddMembers: React.FC<AddMembersProps> = ({ data, setData, nextStep, prevStep }) => {
  const [newMember, setNewMember] = useState({ fullName: '', dob: '', employeeId: '' });
  const [error, setError] = useState('');
  const [dobInputType, setDobInputType] = useState<'date' | 'text'>('date');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleDobTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Auto-format as user types (DD/MM/YYYY)
    if (value.length === 2 && !value.includes('/')) {
      value = value + '/';
    } else if (value.length === 5 && value.charAt(2) === '/' && !value.substring(3).includes('/')) {
      value = value + '/';
    }
    
    // Limit to DD/MM/YYYY format
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    setNewMember({ ...newMember, dob: value });
  };

  const convertTextDobToDate = (textDob: string): string => {
    // Convert DD/MM/YYYY to YYYY-MM-DD for date input
    if (textDob.length === 10 && textDob.includes('/')) {
      const parts = textDob.split('/');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
    }
    return textDob;
  };

  const addMember = () => {
    if (!newMember.fullName || !newMember.dob) {
      setError('Full Name and Date of Birth are required.');
      return;
    }
    
    // Convert text DOB to date format for age calculation
    const dobForCalculation = dobInputType === 'text' ? convertTextDobToDate(newMember.dob) : newMember.dob;
    const age = calculateAge(dobForCalculation);
    
    if (isNaN(age) || age < 18 || age > 65) {
        setError('Member must be between 18 and 65 years old.');
        return;
    }
    
    // Validate text DOB format
    if (dobInputType === 'text') {
      const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dobRegex.test(newMember.dob)) {
        setError('Please enter date in DD/MM/YYYY format.');
        return;
      }
    }
    
    const member: Member = {
      id: Date.now().toString(),
      fullName: newMember.fullName,
      dob: dobForCalculation, // Store in YYYY-MM-DD format
      age: age,
      employeeId: newMember.employeeId,
    };

    setData(prev => ({ ...prev, members: [...prev.members, member] }));
    setNewMember({ fullName: '', dob: '', employeeId: '' });
    setError('');
  };

  const removeMember = (id: string) => {
    setData(prev => ({ ...prev, members: prev.members.filter(m => m.id !== id) }));
  };
  
  // Placeholder for CSV upload functionality
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert("CSV/Excel upload functionality is not yet implemented. Please add members manually.");
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-sic-green mb-4 sm:mb-6">Step 2: Add Group Members</h2>
      
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 border border-dashed rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Upload Member List</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">Upload an Excel/CSV file with columns: Full Name, Date of Birth, Employee ID (optional).</p>
          <input type="file" onChange={handleFileUpload} className="text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-sic-lime/20 file:text-sic-green hover:file:bg-sic-lime/30 w-full sm:w-auto"/>
      </div>

      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Or Add Manually</h3>
        
        {/* Mobile DOB Input Toggle */}
        <div className="mb-4 sm:hidden">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Date of Birth Input:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setDobInputType('date')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  dobInputType === 'date' 
                    ? 'bg-sic-green text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Date Picker
              </button>
              <button
                type="button"
                onClick={() => setDobInputType('text')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  dobInputType === 'text' 
                    ? 'bg-sic-green text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Type (DD/MM/YYYY)
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="sm:col-span-2">
            <Input id="fullName" label="Full Name" name="fullName" value={newMember.fullName} onChange={handleInputChange} />
          </div>
          
          {/* DOB Input - Responsive */}
          <div className="sm:col-span-1">
            {dobInputType === 'date' ? (
              <Input 
                id="dob" 
                label="Date of Birth" 
                name="dob" 
                type="date" 
                value={newMember.dob} 
                onChange={handleInputChange} 
              />
            ) : (
              <div>
                <label htmlFor="dob-text" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth (DD/MM/YYYY)
                </label>
                <input
                  id="dob-text"
                  name="dob"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={newMember.dob}
                  onChange={handleDobTextChange}
                  className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 ease-in-out hover:border-sic-green focus:outline-none focus:ring-2 focus:ring-sic-lime/70 focus:border-sic-green text-base min-h-[44px] touch-manipulation"
                />
              </div>
            )}
          </div>
          
          <Button onClick={addMember} variant="secondary" className="w-full sm:w-auto">Add Member</Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="mt-6 flow-root">
        <div className="-mx-2 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6">
          <div className="inline-block min-w-full py-2 align-middle sm:px-4 lg:px-6">
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3">
              {data.members.length > 0 ? data.members.map((member) => (
                <div key={member.id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{member.fullName}</p>
                      <p className="text-xs text-gray-500 mt-1">DOB: {member.dob}</p>
                      <p className="text-xs text-gray-500">Age: {member.age}</p>
                    </div>
                    <button 
                      onClick={() => removeMember(member.id)} 
                      className="ml-2 text-red-600 hover:text-red-900 text-sm font-medium min-h-[44px] px-2 touch-manipulation"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500 text-sm">No members added yet.</div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Full Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date of Birth</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Remove</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.members.length > 0 ? data.members.map((member) => (
                    <tr key={member.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{member.fullName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.dob}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.age}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button onClick={() => removeMember(member.id)} className="text-red-600 hover:text-red-900 min-h-[44px] px-2 touch-manipulation">Remove</button>
                      </td>
                    </tr>
                  )) : (
                      <tr>
                          <td colSpan={4} className="text-center py-8 text-gray-500">No members added yet.</td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={prevStep} variant="ghost">Back</Button>
        <Button onClick={nextStep} disabled={data.members.length === 0}>Next: Calculate Premiums</Button>
      </div>
    </div>
  );
};