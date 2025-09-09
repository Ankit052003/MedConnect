import React from 'react'
import AppointmnetForm from '../components/AppointmnetForm'
import Hero from '../components/Hero'

function Appointment() {
  return <>
  <Hero title={"Schedule Your Appointment | MedConnect Medical Institute"} imageUrl={"/signin.png"}
  />
  <AppointmnetForm/>
    </>
};

export default Appointment