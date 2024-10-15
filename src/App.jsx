import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit1(data) {
    //API call ko simulate krte h
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Submitting the form ", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit1)}>
      <div>
        <label>First Name</label>
        {/* input field react form ke saath explicitly link kiya ho */}

        <input className={errors.firstName ? 'input-error' : ''}
          {...register('firstName',
            {
              required: true,
              minLength: { value: 3, message: 'Min Len atLeast 3' },
              maxLength: 6
            })} />
        {errors.firstName && <p className='error-msg'>{errors.firstName.message}</p>}
      </div>
      <br />
      <div>
        <label>Middle Name</label>
        <input {...register('middleName')} />
      </div>
      <br />
      <div>
        <label>Last Name</label>
        <input {...register("lastName", {
          pattern:
          {
            value: /^[A-Za-z]+$/i,
            message: "Last Name is not as per rules"
          }
        })} />
        {errors.lastName && <p className='error-msg'>{errors.lastName.message}</p>}
      </div>
      <br />

      <input type='Submit' disabled={isSubmitting} value={isSubmitting ? "Submitting" : "submit"} />
    </form>
  )
}

export default App
