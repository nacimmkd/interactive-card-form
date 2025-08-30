import { useEffect } from 'react';
import styles from './Form.module.css';
import { useForm , type SubmitHandler } from 'react-hook-form';

export type CardForm = {
    card_holder: string;
    card_number: string;
    exp_date: {month: string , year: string};
    cvc: string;
}

type FormProps = {
    setData : (data: CardForm) => void,
    setIsSubmitValid: (submited: boolean) => void
}

const Form: React.FC<FormProps> = ({setData, setIsSubmitValid}) => {

    const {register , handleSubmit, watch , reset , formState : {errors}} = useForm<CardForm>();

    const onSubmit: SubmitHandler<CardForm>  = (data) => {
        console.log(data);
        setIsSubmitValid(true);
        reset();
    }

    const isSameErr = errors.exp_date?.month?.message === errors.exp_date?.year?.message;

    const this_month = new Date().getMonth();
    const this_year = new Date().getFullYear() % 100;
    const watched = watch();

    useEffect(()=>{
        setData(watched);
    },[watched.card_holder, watched.card_number, watched.exp_date?.month, watched.exp_date?.year , watched.cvc])

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.feild_container}>
                    <label>CARDHOLDER NAME</label>
                    <input 
                        className={errors.card_holder && styles.err_input}
                        type="text" 
                        placeholder='e.g. Jane Appleseed'
                        {...register("card_holder" , {
                            required : "Card holder required",
                            minLength : {value: 2 , message: "Must be more than 2 characters"},
                            validate : (value) => {
                                if (!/^[a-zA-Z\s]*$/.test(value)) {return "Special characters and numbers not allowed"}
                            },
                            
                        })}/> 
                        {errors.card_holder && <p>{errors.card_holder.message}</p> }
                </div>
                <div className={styles.feild_container}>
                    <label>CARD NUMBER</label>
                    <input 
                        className={errors.card_number && styles.err_input}
                        type="text" 
                        placeholder='e.g. 1234 5678 9123 0000'
                        {...register("card_number" , {
                            required : "Card number required",
                            validate : (value) => {
                                const v = value.replace(/\D/g, "");
                                if(!/^[0-9]*$/.test(v)) return "Card number must contain only numbers";
                                if(v.length !== 16) return "Invalid card number";
                            },
                            onChange: (e) => {
                                // Add spaces between digits
                                const digits = e.target.value.replace(/\D/g, ""); 
                                const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
                                e.target.value = formatted;
                            }
                            
                        })}/> 
                        {errors.card_number && <p>{errors.card_number.message}</p>}
                </div>

                <div className={styles.exp_cvc_container}>
                    <div className={styles.exp_cvc_feilds_container}>
                        <div className={styles.feild_container}>
                            <label>EXP. DATE  (MM/YY)</label>
                            <div className={styles.exp_container}>
                                <input 
                                    className={errors.exp_date?.month && styles.err_input}
                                    type="text" 
                                    placeholder='MM'
                                    {...register("exp_date.month" , {
                                        required : "Expiration date required",
                                        validate : (value) => {

                                            if(!/^[0-9]*$/.test(value)) return "Month must contain only numbers"
                                            if(Number(value) < 1 || Number(value) > 12) return "Month must be between [01-12]"
                                            if(value.length !== 2) return "Month must be 2 digits like MM"

                                            /* Check for exp date if it's valide */   
                                            if(watched.exp_date.month && watched.exp_date.year) {
                                                if(Number(watched.exp_date.year) === this_year && Number(value) < this_month) {
                                                    return "Card alredy expired";
                                                }
                                            }
                                        }
                                    })}/> 

                                <input 
                                    className={errors.exp_date?.year && styles.err_input}
                                    type="text" 
                                    placeholder='YY'
                                    {...register("exp_date.year" , {
                                        required : "Expiration date required",
                                        validate : (value) => {
                                            if(!/^[0-9]*$/.test(value)) return "Year must contain only numbers"
                                            if(value.length !== 2) return "Year must be 2 digits like YY"

                                            /* Check for exp date if it's valide */
                                            if(watched.exp_date.month && watched.exp_date.year) {
                                                if(Number(value) < this_year || Number(value) === this_year && Number(watched.exp_date.month) < this_month) {
                                                    return "Card alredy expired";
                                                }
                                            }
                                        }
                                    })}/> 
                            </div>
                        </div>
                        <div className={styles.feild_container}>
                            <label>CVC</label>
                            <input 
                                className={errors.cvc && styles.err_input}
                                type="text" 
                                placeholder='e.g. 123'
                                {...register("cvc" , {
                                        required : "CVC required",
                                        validate : (value) => {
                                            if(!/^[0-9]*$/.test(value)) return "Must contain only numbers" 
                                            if(value.length !== 3) return "Must be 3 digits like XXX"

                                        }
                                })}/>  
                        </div>    
                    </div>
                    <div className={styles.exp_cvc_errors}>
                        <div className={styles.exp_errors}>
                            {isSameErr && errors.exp_date && <p>{errors.exp_date?.month?.message}</p> }
                            {!isSameErr && errors.exp_date && <p>{errors.exp_date.month?.message}</p>}
                            {!isSameErr && errors.exp_date && <p>{errors.exp_date.year?.message}</p>}
                        </div>
                        <div className={styles.cvc_errors}>
                            {errors.cvc && <p>{errors.cvc.message}</p>}
                        </div>
                    </div>
                    
                </div>

                <div className={styles.feild_container}>
                    <div className={styles.button_container}><input type="submit" value={"Confirm"} /> </div>
                </div>
            </form>           
        </div>
    )
}

export default Form;