'use client'

import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from "@nextui-org/react";
import { TextField } from '@/components/Fields'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { doLogin } from '../../../api'
import { setSession } from '../utils.js'
import Notification from '@/components/Notification'

export default function Login() {
  useEffect(() => {
    showNotification("", "", false, null)
    history.back
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [show, setShow] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const router = useRouter();
  let timeout;

  const showNotification = (title, message, show, status) => {
    setTitle(title)
    setMessage(message)
    setShow(show)
    setStatus(status)
    clearTimeout(timeout)
    timeout = setTimeout(() => setShow(false), 3000)
  }

  const login = async (event) => {
    setIsloading(true)
    event.preventDefault() // Prevent the form from being submitted normally    
    const data = {
      email: email,
      password: password
    }
    try {
      const response = await doLogin(data)
      const { accessToken, name } = response.data
      setSession(accessToken, name)
      const redirect_url = localStorage.getItem('redirect_url');
      if (!redirect_url) {
        setIsloading(false)
        router.push('/')
        showNotification(response.data.title, response.data.message, true, response.status)
      } else {
        localStorage.removeItem('redirect_url')
        router.push(redirect_url);
      }
    } catch (error) {
      setIsloading(false)
      showNotification(error.response.data.title, error.response.data.message, true, error.response.status)
    }
  }

  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <form onSubmit={login}>
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => { setEmail(e.target.value) }}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => { setPassword(e.target.value) }}
            required
          />
        </div>
        <Button className="mt-8 w-full bg-cyan-400 text-white font-bold" type="submit" isLoading={isloading}>
          Sign in to account
        </Button>
      </form>
      <Notification show={show} title={title} message={message} status={status} setShow={setShow} />
    </AuthLayout>
  )
}