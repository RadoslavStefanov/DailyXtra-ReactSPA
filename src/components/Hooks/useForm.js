import { useState } from "react"

 

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
            setValues(state => ({...state, [e.target.name]: e.target.value}))
    } 

    const onSubmit = (e) =>{
        e.preventDefault();
        onSubmitHandler(values);
    }

    return{
        values,
        changeHandler,
        onSubmit
    };
}
