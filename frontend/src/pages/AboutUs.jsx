import React from 'react'
import Hero from "../components/Hero.jsx"
import Biography from '../components/Biography.jsx'


export default function AboutUs() {
  return (
    <>
      <Hero title={"Learn More About Us | MedConnect Medical Institute"} imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"}/>
    </>
  )
}
