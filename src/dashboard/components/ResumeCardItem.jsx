import { Notebook, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'
import './ResumeCardItem.css'

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const onDelete = () => {
    const ok = window.confirm(
      'Are you sure you want to delete this resume? This action cannot be undone.'
    )

    if (!ok) return

    GlobalApi.DeleteResumeById(resume.documentId)
      .then(() => {
        toast('Resume Deleted!')
        refreshData && refreshData()
      })
      .catch(() => {
        toast('Failed to delete resume')
      })
  }

  return (
    <div className="resume-card-wrapper">
      {/* THREE DOT MENU */}
      <div className="menu-wrapper">
        <MoreVertical
          className="menu-icon"
          onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && (
          <div className="dropdown">
            <div onClick={() => navigate('/dashboard/resume/' + resume.documentId + '/edit')}>
              Edit
            </div>
            <div onClick={() => navigate('/my-resume/' + resume.documentId + '/view')}>
              View
            </div>
            <div onClick={() => navigate('/my-resume/' + resume.documentId + '/view')}>
              Download
            </div>
            <div className="delete" onClick={onDelete}>
              Delete
            </div>
          </div>
        )}
      </div>

      {/* CARD */}
      <Link to={'/dashboard/resume/' + resume.documentId + '/edit'}>
        <div className='p-14 bg-secondary flex items-center justify-center h-[280px] border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary'>
          <Notebook />
        </div>
        <h2 className='text-center my-1'>{resume.title}</h2>
      </Link>
    </div>
  )
}

export default ResumeCardItem
