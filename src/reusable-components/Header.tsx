import { ArrowLeft } from 'lucide-react'
import React from 'react'

function Header({title, onBack}: {title: string, onBack?: () => void}) {
  return (
        <div className='todo-list-header bg-blue-900 text-white p-4 flex flex-row gap-2'>
            {onBack && <ArrowLeft size={20} className='cursor-pointer' onClick={onBack}/>}
            <span className='ml-2'>{title}</span>
        </div>
  )
}

export default Header