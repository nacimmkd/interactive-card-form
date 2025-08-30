import { useState } from 'react'
import './App.css'
import Card from './components/card/Card'
import Form, {type CardForm} from './layouts/Form/Form'
import Confirmation from './layouts/Form/Confirmation/Confirmation'

function App() {

  const [isSubmitValid , setIsSubmitValid] = useState<boolean>(false);
  const [data , setData] = useState<CardForm>({
    card_holder: "Jane Appleseed",
    card_number: "",
    exp_date: {month: "" , year: ""},
    cvc: ""
  });


  return (
   <div className='container'>
      <div className="left">
        <div className="cards_container">
          <div className="front_card"><Card card_holder={data?.card_holder} card_number={data?.card_number} exp_date={data?.exp_date} side='front'/></div>
          <div className="back_card"><Card cvc={data?.cvc} side='back'/></div>
        </div>
      </div>
      <div className="right">
        {isSubmitValid ? <Confirmation/> : <Form setData={setData} setIsSubmitValid={setIsSubmitValid}/>}
      </div>
   </div>
  )
}

export default App
