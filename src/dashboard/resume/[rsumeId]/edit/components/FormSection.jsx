import React from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight , LayoutGrid} from 'lucide-react'
import { Button } from '@components/ui/button'
import { useState } from 'react'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Home } from 'lucide-react'
import ThemeColor from './ThemeColor'


function FormSection() {
  const [activeFormIndex,setActiveFormIndex] = useState(1);
 const [enableNext,setEnableNext] = useState(false);
 const {resumeId} = useParams()
  return (
    <div >
      <div className= "flex justify-between items-center">
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
          <Button><Home/></Button>
          </Link>
          <ThemeColor/>
        
        
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 
          && <Button size="sm"
          onClick = {()=> setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
          <Button disabled={!enableNext}
          className="flex gap-2" size="sm"
          onClick = {()=> setActiveFormIndex(activeFormIndex+1)}>Next <ArrowRight/></Button>
        </div>
      </div>
    {activeFormIndex == 1 ? (
  <PersonalDetail enabledNext={setEnableNext} />
) : activeFormIndex == 2 ? (
  <Summery enabledNext={setEnableNext} />
) : activeFormIndex == 3 ? (
  <Experience enabledNext={setEnableNext} />
) : activeFormIndex == 4 ? (
  <Education enabledNext={setEnableNext} />
) : activeFormIndex == 5 ? (
  <Skills enabledNext={setEnableNext} />
) : activeFormIndex == 6 ? (
  <Navigate to={`/my-resume/${resumeId}/view`} />
) : null}

    </div>
  )
}

export default FormSection