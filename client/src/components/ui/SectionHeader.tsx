import React from 'react'

export default function SectionHeader({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full flex items-center justify-center'>
        <h2 className='text-[3rem] font-extrabold'>{children}</h2>
    </div>
  )
}
