import Booklet from '@/components/Paper-printing/Booklet/Booklet'
import Brochure from '@/components/Paper-printing/Brochure/Brochure'
import DigitalPoster from '@/components/Paper-printing/DigitalPoster/DigitalPoster'
import Stamp from '@/components/Paper-printing/Stamp/Stamp'
import React from 'react'


const page = () => {
  return (
    <div className='bg-[#f1f2f4]'>

    {/* <Brochure/> */}
    {/* <Booklet/> */}
    {/* <DigitalPoster/> */}
    <Stamp/>
  

</div>
  )
}

export default page