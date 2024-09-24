import React from 'react'
import VisitingCards from './VisitingCards'
import RecentlyView from '@/components/RecentlyView/RecentlyView'

const page = () => {
  return (
    <div className='bg-[#f1f2f4]'>

        <VisitingCards/>
        <RecentlyView/>

    </div>
  )
}

export default page