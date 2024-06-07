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
  Snackbar
} from '@mui/material'
import clsx from 'clsx'
import { MaterialReactTable } from 'material-react-table'
import IconButton from '@mui/material/IconButton'
import { CheckIcon } from '../../assets/icons'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import RefreshIcon from '@mui/icons-material/Refresh'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DvrIcon from '@mui/icons-material/Dvr'
import { setFreeNumber, setPrice } from '../api'
import { membershipColumns } from 'src/assets/data'
import AddCardIcon from '@mui/icons-material/AddCard'

const featuresFree = [
  'Commission-free 50 affiliate programs',
  'Multi-layered encryption',
  'One tip every day',
  'Invest up to $1,500 each month'
]

const featuresInvestor = [
  '16015 affiliate programs',
  '673 niches',
  'Lifetime access',
  'Futures updates and affiliate programs'
]
const MembershipPlans = () => {
  const [freeEdit, setFreeEdit] = useState(true)
  const [priceEdit, setPriceEdit] = useState(true)
  const [freeNum, setFreeNum] = useState(50)
  const [priceValue, setPriceValue] = useState(99)
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])

  const saveFreeNum = async () => {
    const response = await setFreeNumber({ freeNumber: freeNum })
    setMessage(response.data.message)
    setOpen(true)
    setFreeEdit(true)
  }

  const savePrice = async () => {
    const response = await setPrice({ price: priceValue })
    setMessage(response.data.message)
    setOpen(true)
    setPriceEdit(true)
  }

  return (
    <div>
      <Card>
        <CardHeader title='Membership Plans' />
        <CardContent className='mt-4'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Starter
                  </Typography>
                  <div className='order-last mt-6'>
                    <ul role='list' className={clsx('-my-2 divide-y text-sm', 'divide-gray-200 text-gray-700')}>
                      {featuresFree.map(feature => (
                        <li key={feature} className='flex py-2'>
                          <CheckIcon className={clsx('h-6 w-6 flex-none', 'text-cyan-500')} />
                          <span className='ml-4'>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className='order-last mt-6'>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <DvrIcon />
                            </InputAdornment>
                          )
                        }}
                        label='Number of Free Programs'
                        onChange={e => {
                          setFreeNum(e.target.value)
                        }}
                        size='small'
                        className='order-last mt-6'
                        color='info'
                        defaultValue={freeNum}
                        focused
                        disabled={freeEdit}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardActions>
                  <Button size='small' onClick={() => setFreeEdit(false)}>
                    Edit
                  </Button>
                  <Button size='small' disabled={freeEdit} onClick={() => saveFreeNum()}>
                    Save
                  </Button>
                  <Button size='small' disabled={freeEdit} onClick={() => setFreeEdit(true)}>
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Investor
                  </Typography>
                  <div className='order-last mt-6'>
                    <ul role='list' className={clsx('-my-2 divide-y text-sm', 'divide-gray-200 text-gray-700')}>
                      {featuresInvestor.map(feature => (
                        <li key={feature} className='flex py-2'>
                          <CheckIcon className={clsx('h-6 w-6 flex-none', 'text-cyan-500')} />
                          <span className='ml-4'>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='flex gap-1 mt-6'>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <MonetizationOnIcon />
                          </InputAdornment>
                        )
                      }}
                      label='Price'
                      size='small'
                      onChange={e => {
                        setPriceValue(e.target.value)
                      }}
                      className='order-last mt-6'
                      color='info'
                      defaultValue={priceValue}
                      focused
                      disabled={priceEdit}
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <Button size='small' onClick={() => setPriceEdit(false)}>
                    Edit
                  </Button>
                  <Button size='small' disabled={priceEdit} onClick={() => savePrice()}>
                    Save
                  </Button>
                  <Button size='small' disabled={priceEdit} onClick={() => setPriceEdit(true)}>
                    Cancel
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

export default MembershipPlans
