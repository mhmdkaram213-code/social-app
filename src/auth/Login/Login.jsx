import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../Schema/loginSchema";
import SignIn from "../../services/loginApi";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Login() {
  const { setUserToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const [apiError, setApiError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })
  async function submitForm(userData) {
    setIsLoading(true)
    toast.success('Successfully Login', { duration: 3000 })
    console.log(userData);
    const response = await SignIn(userData)
    if (response.message == 'success') {
      localStorage.setItem('token', response.token)
      setUserToken(response.token)
      navigate('/home')
    } else {
      setApiError(response.error)
    }
    setIsLoading(false)
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Page</title>
      </Helmet>
      <div className="bg-gray-300 min-h-screen flex justify-center items-center text-center">
        <div className="md:w-1/3 w-full mx-5 md:mx-0 m-auto p-5 bg-white shadow rounded-2xl">
          <h2 className="text-2xl font-bold text-sky-700 my-4 ">Login Now</h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6">
              <Input isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message} {...register('email')} label="Email" type="email" />
              <Input isInvalid={Boolean(errors.password) && touchedFields.password} errorMessage={errors.password?.message} {...register('password')} label="Password" type="password" />
              {apiError ? <p className="text-red-600 py-2">{apiError}</p> : null}
              <Button isLoading={isLoading} type="submit" className='w-full' color="primary" variant="shadow">Submit</Button>
              <p>Don't have account? <Link to='/register' className='text-sky-700'>Sign up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
      )
}
