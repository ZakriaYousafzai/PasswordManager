import React from 'react'

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white mt-10">
      <div className="mycontainer font-bold text-md flex justify-center gap-2 items-center px-4 py-5 h-14">
        <div>
            Created with Love by
        </div>
        <div className="logo font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
