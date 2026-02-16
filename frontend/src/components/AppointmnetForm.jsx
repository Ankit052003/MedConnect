import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AppointmnetForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [department, setDepartment] = useState('');
  const [doctorFirstName, setDoctorFirstName] = useState('');
  const [doctorLastName, setDoctorLastName] = useState('');
  const [address, setAddress] = useState('');
  const [hasVisited, setHasVisited] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  const departmentsArray = [
    'Pediatrics',
    'Orthopedics',
    'Cardiology',
    'Neurology',
    'Oncology',
    'Radiology',
    'Physical Therapy',
    'Dermatology',
    'ENT',
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/v1/user/doctors', {
          withCredentials: true,
        });
        setDoctors(data.doctors || []);
      } catch (err) {
        console.error('Failed to fetch doctors', err);
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      const doc = doctors.find(
        (d) => d._id === selectedDoctorId || `${d.firstName} ${d.lastName}` === selectedDoctorId
      );
      if (doc) {
        setDoctorFirstName(doc.firstName || '');
        setDoctorLastName(doc.lastName || '');
      }
    } else {
      setDoctorFirstName('');
      setDoctorLastName('');
    }
  }, [selectedDoctorId, doctors]);

  const handleAppointment = async (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointmentDate,
      department,
      doctorFirstName,
      doctorLastName,
      address,
      hasVisited,
    };

    console.log('Submitting appointment:', payload);
    alert('Appointment submitted (local demo).');
  };

  const filteredDoctors = department
    ? doctors.filter((d) => (d.department || '').toLowerCase() === department.toLowerCase())
    : doctors;

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>

      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            placeholder="NIC"
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            aria-label="Date of Birth"
            required
          />
        </div>

        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setSelectedDoctorId('');
            }}
          >
            <option value="">Select Department</option>
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>

          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {filteredDoctors.length === 0 && <option value="" disabled>No doctors available</option>}
            {filteredDoctors.map((doc) => (
              <option
                key={doc._id || `${doc.firstName}-${doc.lastName}`}
                value={doc._id || `${doc.firstName} ${doc.lastName}`}
              >
                {`${doc.firstName || ''} ${doc.lastName || ''}`.trim()}
              </option>
            ))}
          </select>
        </div>

        {/* Updated Address textarea */}
        <div>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1.5px solid #d1b668',
              fontSize: '14px',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Updated checkbox */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '10px',
            marginBottom: '20px',
          }}
        >
          <p style={{ marginBottom: 0, fontSize: '12px', color: '#666' }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{
              flex: 'none',
              transform: 'scale(1.2)',
              cursor: 'pointer',
              marginTop: '2px',
            }}
          />
        </div>

        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit">Submit Appointment</button>
        </div>
      </form>
    </div>
  );
}

export default AppointmnetForm;
