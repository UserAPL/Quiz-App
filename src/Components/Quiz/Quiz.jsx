import React from 'react'
import './Quiz.css'
import { useState } from 'react'
import { data } from '../../assets/data'
import { useRef } from 'react'

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [questions, setQuestions] = useState(data[index]);

    let [lock,setLock] = useState(false);
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false);

    let Option1=useRef(null);
    let Option2=useRef(null);
    let Option3=useRef(null);
    let Option4=useRef(null);

    let option_array=[Option1,Option2,Option3,Option4];

    const checkAns=(e,ans)=>{

        if(lock===false)
        {
             if(questions.ans===ans)
        {
            e.target.classList.add('correct');
            setLock(true);
            setScore(prev=>prev+1);
        }
        else
        {
            e.target.classList.add('wrong');
            setLock(true);
            option_array[questions.ans-1].current.classList.add('correct');
        }

        }

       
    

    }

    const next=()=>{
        if(lock===true)
        {
            if(index==data.length-1)
            {
                setResult(true);
                return 0;
                // alert(`Your score is ${score} out of ${data.length}`);
            
            }
            setIndex(++index);
            setQuestions(data[index]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove('correct');
                option.current.classList.remove('wrong');
            })
        }
    }


    const reset=()=>{
        setIndex(0);
        setQuestions(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
        option_array.map((option)=>{
            option.current.classList.remove('correct');
            option.current.classList.remove('wrong');
        })
    }


  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        {result?<></>:<><h2>{index+1}. {questions.question} </h2>
        <ul>
            <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{questions.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{questions.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{questions.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{questions.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index+1} out of {data.length} questions

        </div></>}
        
        {result?<><h2>Your score is {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button></>:<></>}
        

    </div>
  )
}

export default Quiz