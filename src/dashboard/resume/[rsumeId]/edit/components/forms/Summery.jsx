import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner' 
import { Brain } from 'lucide-react'
import {AIChatSession} from "./../../../../../../../service/AIModal"

const prompt = "Job Title : {jobTitle}, Depends on job title give me summary for my resume within 3 to 4 lines in JSON format with field experience level and summery with experience level for Fresher, Mid-Level,Experienced"

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summery, setSummery] = useState('')
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [aiGeneratedSummeryList,setAiGeneratedSummeryList] = useState();


  useEffect(() => {
    
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery
      })
    }
  }, [summery])

const GenerateSummeryFromAI = async () => {
  setLoading(true);

  try {
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);
      console.log("RAW RESPONSE:", result);
  console.log("TEXT:", result.response.text());
    const parsedResult = JSON.parse(result.response.text());
   
    // Ensure array
    setAiGeneratedSummeryList(
      Array.isArray(parsedResult) ? parsedResult : [parsedResult]
    );
  } catch (error) {
    console.error(error);
    toast("AI response format error");
  }

  setLoading(false);
};


  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      data: {
        summery: summery
      }
    }

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp)
        enabledNext(true)
        setLoading(false)
        toast('Details Updated')
      },
      (error) => {
        setLoading(false)
        console.error(error)
      }
    )
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between'>
            <label>Add Summery</label>
            <Button
  variant='outline'
  onClick={()=> GenerateSummeryFromAI()}
  size='sm'
  type='button'
  className='relative overflow-hidden border border-purple-500 text-purple-500 font-medium flex gap-2 items-center
             transition-all duration-300 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.7)]
             before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500 before:to-fuchsia-500
             before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
             rounded-lg'
>
  <Brain className='h-4 w-4 relative z-10' />
  <span className='relative z-10'>Generate Summary</span>
</Button>

          </div>

          <Textarea
            className='mt-5'
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />

          <div className='mt-2 flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading ? (
                <LoaderCircle className='animate-spin' />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </div>

{aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}

    </div>
    
  )
}

export default Summery