import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../Schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUp from "../../services/registerApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Register() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })
  async function submitForm(userData) {
    setIsLoading(true)
    toast.success('Successfully Registered', { duration: 3000 })
    console.log(userData);
    const response = await SignUp(userData)
    if (response.message == 'success') {
      navigate('/')
    } else {
      setApiError(response.error)
    }
    setIsLoading(false)
  }
  return (
    <>
      <div className="bg-gray-300 min-h-screen flex justify-center items-center text-center">
        <div className="md:w-1/3 w-full mx-5 md:mx-0 m-auto p-5 bg-white shadow rounded-2xl my-5">
          <h2 className="text-2xl font-bold text-sky-700 my-4 ">Register Now</h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6">
              <Input isInvalid={Boolean(errors.name && touchedFields.name)} errorMessage={errors.name?.message} {...register('name')} label="Name" type="text" />
              <Input isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message} {...register('email')} label="Email" type="email" />
              <Input isInvalid={Boolean(errors.password) && touchedFields.password} errorMessage={errors.password?.message} {...register('password')} label="Password" type="password" />
              <Input isInvalid={Boolean(errors.rePassword) && touchedFields.rePassword} errorMessage={errors.rePassword?.message} {...register('rePassword')} label="rePassword" type="password" />
              <div className="flex gap-3">
                <Input isInvalid={Boolean(errors.dateOfBirth) && touchedFields.dateOfBirth} errorMessage={errors.dateOfBirth?.message} {...register('dateOfBirth')} label="DateOfBirth" type="date" />
                <Select isInvalid={Boolean(errors.gender) && touchedFields.gender} errorMessage={errors.gender?.message} {...register('gender')} className="max-w-xs" label="Select Gender">
                  <SelectItem key={'male'}>Male</SelectItem>
                  <SelectItem key={'female'}>Female</SelectItem>
                </Select>
              </div>
              {apiError ? <p className="text-red-600 py-2">{apiError}</p> : null}
              <Button isLoading={isLoading} type="submit" className='w-full' color="primary" variant="shadow">Submit</Button>
              <p>Do you have account? <Link to='/' className='text-sky-700'>Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
