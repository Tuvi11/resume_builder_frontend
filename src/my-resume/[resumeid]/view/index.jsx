import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from './../../../dashboard/resume/[rsumeId]/edit/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState()
  const params = useParams()
  const resumeId = params.resumeId

  useEffect(() => {
    if (!resumeId) return
    GetResumeInfo()
  }, [resumeId])

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then(resp => {
        setResumeInfo(resp.data.data)
      })
      .catch(err => console.error(err))
  }

  const HandleDownload = () => {
    window.print()
  }

  const handleShare = () => {
    const shareData = {
      title: `${resumeInfo?.firstName || ''} ${resumeInfo?.lastName || ''} Resume`,
      text: 'Hello Everyone, This is my resume. Please open the link to view it.',
      url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
    }

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch(err => console.error('Share failed:', err))
    } else {
      alert('Sharing is not supported on this browser')
    }
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>

          <p className="text-center text-gray-400">
            Now you can download your resume or share the unique resume URL
            with your friends and family.
          </p>

          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <Button onClick={handleShare}>Share</Button>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
