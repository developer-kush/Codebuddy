import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "./Axios"


export default function Home(){

    const [problems, setProblems] = useState([])

    useEffect(()=>{
        Axios.get('/getAllProblems').then(res=>{
            setProblems(res?.data)
        })
    }, [])
    
    return <div className="bg-[#121212] h-screen w-screen">
        <Link to="/" className="px-8 py-5 flex text-white font-semibold gap-3">
            <div className="text-white text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M3.25 3A2.25 2.25 0 0 0 1 5.25v9.5A2.25 2.25 0 0 0 3.25 17h13.5A2.25 2.25 0 0 0 19 14.75v-9.5A2.25 2.25 0 0 0 16.75 3H3.25Zm.943 8.752a.75.75 0 0 1 .055-1.06L6.128 9l-1.88-1.693a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 0 1-1.06-.055ZM9.75 10.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clipRule="evenodd" />
                </svg>
            </div>
            <div>CodeBuddy</div>
        </Link>
        <div className="font-sans text-white text-3xl py-2 mt-4 px-7">Problems</div>
        <div className="display-grid grid w-screen gap-4 p-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-hidden">
            {problems.map((problem, i) => (
                <Link
                    to={`/problem/${problem.problem_id}`}
                    key={i}
                    className="p-3 bg-[#333] rounded-lg text-white text-lg font-semibold"
                >
                    {problem.name}
                </Link>
            ))}
        </div>
    </div>
}