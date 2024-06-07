import { useState } from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  IconButton
} from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LockIcon from '@mui/icons-material/Lock'
import { EmailOutlined } from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { changePassword, setSecretKey, setScrapeSetting } from '../api'
import { jwtDecode } from 'src/@core/utils/utils'

const Settings = () => {
  const [keyEdit, setKeyEdit] = useState(true)
  const [pwdEdit, setPwdEdit] = useState(true)
  const [secretVal, setSecretVal] = useState('12345678abcedfg')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [scrapePwd, setScrapePwd] = useState('')
  const [showScrape, setShowScrape] = useState(false)
  const [email, setEmail] = useState('')

  const handleClickShowPassword = () => {
    setShowPassword(show => !show)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const setSecret = async () => {
    const response = await setSecretKey({ secretVal })
    setMessage(response.data.message)
    setOpen(true)
    setKeyEdit(true)
  }

  const setScrape = async () => {
    const response = await setScrapeSetting({
      email: email,
      password: scrapePwd
    })
    setMessage(response.data.message)
    setOpen(true)
  }

  const setPassword = async () => {
    if (!newPwd && !confirmPwd && !currentPwd) {
      setMessage('Please input correctly!')
      setOpen(true)
    } else {
      if (newPwd != confirmPwd) {
        setMessage('Please confirm your password!')
        setOpen(true)
      } else {
        const email = jwtDecode(localStorage.getItem('accessAdminToken')).sub
        try {
          const response = await changePassword({
            email: email,
            currentPwd: currentPwd,
            newPwd: newPwd
          })
          setMessage(response.data.message)
          setOpen(true)
          setPwdEdit(true)
        } catch (error) {
          setMessage(error.response.data.message)
          setOpen(true)
        }
      }
    }
  }

  return (
    <div>
      <Card>
        <CardHeader title='Settings' />
        <CardContent className='mt-4'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Change Password
                  </Typography>
                  <div className='mb-10 mt-8'>
                    <TextField
                      className='order-last'
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => {
                                setShowCurrent(!showCurrent)
                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                              disabled={pwdEdit}
                            >
                              {showCurrent ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      label='Previous Password'
                      type={showCurrent ? 'text' : 'password'}
                      onChange={e => {
                        setCurrentPwd(e.target.value)
                      }}
                      size='small'
                      color='info'
                      focused
                      disabled={pwdEdit}
                    />
                  </div>
                  <div className='mb-10'>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => {
                                setShowNew(!showNew)
                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                              disabled={pwdEdit}
                            >
                              {showNew ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      label='New Password'
                      type={showNew ? 'text' : 'password'}
                      onChange={e => {
                        setNewPwd(e.target.value)
                      }}
                      size='small'
                      className='order-last'
                      color='info'
                      focused
                      disabled={pwdEdit}
                    />
                  </div>
                  <div className='mb-8'>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <CheckCircleIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => {
                                setShowConfirm(!showConfirm)
                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                              disabled={pwdEdit}
                            >
                              {showConfirm ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      label='Confirm Password'
                      type={showConfirm ? 'text' : 'password'}
                      onChange={e => {
                        setConfirmPwd(e.target.value)
                      }}
                      size='small'
                      className='order-last'
                      color='info'
                      focused
                      disabled={pwdEdit}
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <Button size='small' disabled={!pwdEdit} onClick={() => setPwdEdit(false)}>
                    Edit
                  </Button>
                  <Button size='small' disabled={pwdEdit} onClick={() => setPassword()}>
                    Save
                  </Button>
                  <Button size='small' disabled={pwdEdit} onClick={() => setPwdEdit(true)}>
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Paypal Configuration
                  </Typography>
                  <div className='flex gap-1 mt-8'>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <KeyIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                              disabled={keyEdit}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      label='Secret Key'
                      type={showPassword ? 'text' : 'password'}
                      size='small'
                      onChange={e => {
                        setSecretVal(e.target.value)
                      }}
                      className='order-last mt-6'
                      color='info'
                      defaultValue={secretVal}
                      focused
                      disabled={keyEdit}
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    disabled={!keyEdit}
                    onClick={() => {
                      setKeyEdit(false)
                      setSecretVal('')
                    }}
                  >
                    Edit
                  </Button>
                  <Button size='small' disabled={keyEdit} onClick={() => setSecret()}>
                    Save
                  </Button>
                  <Button
                    size='small'
                    disabled={keyEdit}
                    onClick={() => {
                      setKeyEdit(true)
                      setSecretVal('12345678abcedfg')
                    }}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Card>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Scraper Credentials
                  </Typography>
                  <div className='flex gap-1 mt-8'>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <EmailOutlined />
                          </InputAdornment>
                        )
                      }}
                      label='Email Address'
                      size='small'
                      onChange={e => {
                        setEmail(e.target.value)
                      }}
                      className='order-last mt-6'
                      color='info'
                      defaultValue={email}
                      focused
                    />
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <KeyIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => {
                                setShowScrape(showScrape => !showScrape)
                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                            >
                              {showScrape ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      label='Password'
                      type={showScrape ? 'text' : 'password'}
                      size='small'
                      onChange={e => {
                        setScrapePwd(e.target.value)
                      }}
                      className='order-last mt-6'
                      color='info'
                      defaultValue={scrapePwd}
                      focused
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <Button size='small' onClick={() => setScrape()}>
                    Save
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={6000} message={message} />
    </div>
  )
}

export default Settings
