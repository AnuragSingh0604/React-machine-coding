import React from 'react'
import Accordian from './Accordian.jsx';
const data=[
  {
    "id": 1,
    "question": "What is your return policy?",
    "answer": "We offer a 7-day return policy on all eligible products. Items must be unused and in their original packaging."
  },
  {
    "id": 2,
    "question": "How long does delivery take?",
    "answer": "Standard delivery usually takes 3–5 business days depending on your location."
  },
  {
    "id": 3,
    "question": "Do you offer customer support?",
    "answer": "Yes, our customer support team is available Monday to Friday from 9 AM to 6 PM."
  },
  {
    "id": 4,
    "question": "Can I change my order after placing it?",
    "answer": "You can modify or cancel your order within 1 hour of placing it by contacting support."
  },
  {
    "id": 5,
    "question": "What payment methods are accepted?",
    "answer": "We accept credit cards, debit cards, UPI, net banking, and select digital wallets."
  }
];

const Faq = () => {
  return (
    <div className='container'>
     <h1>Faq</h1>
    
        
      { data.map((item)=>{
           return ( <div className='inner'>
            <span className='label'>{item.id}.</span>
           <Accordian  key={item.id} item1={item}></Accordian>
            </div>)
      })
   
     }
   
    </div>
  )
}

export default Faq;