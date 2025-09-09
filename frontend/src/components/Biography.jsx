import React from 'react'


const Biography = ({imageUrl})=>{
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="About Img"/>
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who are You?</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ab laudantium est beatae incidunt rerum culpa amet iusto tenetur minima!</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ad facilis aliquam iusto fugiat error eligendi blanditiis, fuga, quibusdam repellat, non nisi odit omnis perspiciatis rem? Culpa voluptates distinctio voluptate nesciunt sunt fugiat. Dignissimos, voluptatum.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, eum. Odio, eaque?</p>
    <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}
export default Biography
