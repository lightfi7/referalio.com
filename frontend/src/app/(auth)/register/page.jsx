'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from "@nextui-org/react";
import { TextField } from '@/components/Fields'
import { doRegister } from '@/api'
import Notification from '@/components/Notification';
import { useRouter } from 'next/navigation'

export default function Register() {

  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isloading, setIsloading] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(0)
  const Router = useRouter()
  let timeout

  useEffect(() => {
    showNotification("", "", false, null)
  }, [])

  const showNotification = (title, message, show, status) => {
    setTitle(title)
    setMessage(message)
    setShow(show)
    setStatus(status)
    clearTimeout(timeout)
    timeout = setTimeout(() => setShow(false), 3000)
  }

  const register = async (event) => {
    setIsloading(true)
    event.preventDefault() // Prevent the form from being submitted normally        
    const data = {
      name: name,
      email: email,
      password: password
    }
    if (password != confirmPassword) {
      setIsloading(false)
      showNotification("Authentication Error", "Please confirm your password!", true, 400)
    }
    else {
      try {
        const response = await doRegister(data);
        if (response.status == 200) {
          setIsloading(false)
          showNotification(response.data.title, response.data.message, true, response.status)
          Router.push('/sign-in')
        }
        else {
          Router.push('/')
        }
      } catch (error) {
        setIsloading(false)
        showNotification(error.response.data.title, error.response.data.message, true, error.response.status)
      }
    }
  }

  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{' '}
          <Link href="/sign-in" className="text-cyan-600">
            Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
      <form onSubmit={register}>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            className="col-span-full"
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={e => { setName(e.target.value) }}
            autoComplete="given-name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value) }}
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value) }}
            autoComplete="new-password"
            required
          />
          <TextField
            className="col-span-full"
            label="Confirm Password"
            name="password"
            type="password"
            value={confirmPassword}
            onChange={e => { setConfirmPassword(e.target.value) }}
            autoComplete="new-password"
            required
          />
        </div>
        <Button className="mt-8 w-full bg-cyan-400 text-white font-bold" type="submit" isLoading={isloading}>
          Sign Up
        </Button>
      </form>
      <Notification show={show} title={title} message={message} status={status} setShow={setShow} />
    </AuthLayout>
  )
}
