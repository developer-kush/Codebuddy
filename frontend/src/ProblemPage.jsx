import { useEffect, useRef, useState } from "react"
import ReactCodeMirror from "@uiw/react-codemirror";
import { langs } from '@uiw/codemirror-extensions-langs';
import { consoleDark, nord, vscodeDark } from "@uiw/codemirror-themes-all";
import Axios from './Axios'
import { useNavigate, useParams } from "react-router-dom";

export default function ProblemPage(){

  const hintsRef = useRef([]);
  useEffect(() => {
      if (hintsRef.current) {
          hintsRef.current.scrollTop = hintsRef.current.scrollHeight;
      }
  }, []);

  const { problem_id } = useParams()

  const navigate = useNavigate();

  const [problem, setProblem] = useState({});
  const [hints, setHints] = useState([]);
  const [language, setLanguage] = useState('python');
  const [lastCode, setLastCode] = useState('No Code provided');

  useEffect(()=>{
    Axios.get(`/getProb/${problem_id}`).then(res=>{
      console.log(res)
      setProblem(res?.data)
    })
  }, [problem_id])

  const code = useRef();
  code.value = problem?.default_code || '';

  const onHelpRequested = () => {
    if (!problem) return
    if (code.value.replace(' ', '').replace('\n', '') == lastCode.replace(' ', '').replace('\n', '')){
      setHints(['Do try something or no more hints', ...hints])      
    } else {
      Axios.post('/getHint',{
        problem_id: problem_id,
        code: code.value,
        history: hints
      }).then(res=>{
        setHints([res.data.hint, ...hints])
      })
      setLastCode(code.value)
    }
  }

  const onTestRequested = () => {
    alert('Wrong Answer')
  }

  return (
    <div className='relative flex pl-auto w-screen h-screen bg-[#040404] overflow-hidden'>

      <div className="relative w-[5%] flex flex-col">
        <div onClick={()=>{
          navigate('/')
        }} className="w-full cursor-pointer bg-green-500 py-3 px-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="relative flex flex-col h-screen w-[35%]">
        {/* <div className="text-white text-sm p-3 bg-[#141414] w-fit" onClick={onHelpRequested}>Next Hint!</div> */}
        <div className="text-white h-[0.5] font-semibold text-xl p-5">{problem?.name || "Description"}</div>

        <div className="font-normal max-h-48 min-h-48 overflow-scroll text-white p-5 text-md mt-auto bg-[#141414]">
          {problem?.description || "Problem Not Found"}
        </div>

        <div className="flex max-h-12 min-h-12 justify-end font-bold">
          <div onClick={onHelpRequested} className="text-white cursor-pointer hover:bg-[#333333] m-2.5 rounded-sm p-2 bg-[#121212] text-xs">NEXT HINT</div>
          <div onClick={onTestRequested} className="text-white cursor-pointer hover:bg-[#333333] m-2.5 rounded-sm p-2 bg-[#121212] text-xs">TEST</div>
        </div>
        <div ref={hintsRef} className="py-5 min-h-96 overflow-y-scroll overflow-x-hidden bg-[#333333]">
          { 
            hints.map((hint, i)=>(
              <div key={i} className={`border-b py-3 text-sm px-5 first:font-semibold first:bg-orange-500 ${i==0?"":"odd:bg-[#222222]"} text-white border-[#333333]`}>{hint}</div>
            )) 
          }
        </div>

      </div>

      <div className="relative w-3/5 h-screen bg-white">
        
        <div className="bg-[#080808] uppercase text-xs px-5 p-3 text-white w-full"> EDITOR </div>

        <ReactCodeMirror
          className="h-screen text-sm outline-none"
          value={code.value}
          height={"95%"}
          extensions={[langs[language]()]}
          theme={vscodeDark}
          onChange={(e)=>{
            code.value = e
          }}
          basicSetup={{
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
          }}
        />
      </div>
      
    </div>
  )
}