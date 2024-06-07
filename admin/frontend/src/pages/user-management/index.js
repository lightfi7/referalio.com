'use client'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Card, CardHeader, CardContent, Typography, Chip, Grid, Snackbar } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { getUserData, deleteUser, blockUser } from '../api.js'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import BlockIcon from '@mui/icons-material/Block'
import RefreshIcon from '@mui/icons-material/Refresh'
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction'
import PeopleIcon from '@mui/icons-material/People'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import EditIcon from '@mui/icons-material/Edit'
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined'
import LockResetIcon from '@mui/icons-material/LockReset'
import InfoCard from '../../views/card/InfoCard.js'
import { columns } from '../../assets/data/index.js'
import UserEditModal from 'src/views/modal/userEditModal.js'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1ad9ff' : '#30c6e8'
  }
}))

const ExpireProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#eb2409' : '#f0270c'
  }
}))

const DefaultProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#0cf073' : '#0cf099'
  }
}))

const countRemainDays = (startString, endString) => {
  const currentDate = new Date()
  const startDate = new Date(startString)
  const finishDate = new Date(endString)
  const totalDurationMs = finishDate - startDate
  const usedDurationMs = currentDate - startDate
  const totalDurationDays = totalDurationMs / (1000 * 60 * 60 * 24)
  const usedDurationDays = usedDurationMs / (1000 * 60 * 60 * 24)
  let progress = 0
  progress = (usedDurationDays * 100) / totalDurationDays
  console.log(`Progress: ${progress.toFixed(2)}%`)
  return progress
}

const isExpired = endString => {
  const currentDate = new Date()
  const finishDate = new Date(endString)
  const totalDurationMs = finishDate - currentDate
  const totalDurationDays = totalDurationMs / (1000 * 60 * 60 * 24)
  if (Math.ceil(totalDurationDays) <= 0) {
    return false
  } else {
    return true
  }
}

const UserManagement = () => {
  const [tableData, setTableData] = useState([])
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [totalUser, setTotalUser] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)
  const [totalOnlie, setTotalOnline] = useState(0)
  const [totalBlock, setTotalBlock] = useState(0)
  const [message, setMessage] = useState('')
  const [rowData, setRowData] = useState({})

  /*-------Status Chip------ */
  const StatusChip = React.memo(({ status }) => {
    switch (status) {
      case 0:
        return (
          <Chip icon={<DesktopWindowsOutlinedIcon />} size='small' variant='outlined' color='success' label='Normal' />
        )
      case 1:
        return <Chip icon={<BlockIcon />} variant='outlined' size='small' color='error' label='Block' />
      default:
        return (
          <Chip icon={<DesktopWindowsOutlinedIcon />} size='small' variant='outlined' color='success' label='Normal' />
        )
    }
  })

  /*--------Action Buttons--------*/
  const ActionButtons = React.memo(({ item, handleBlock, handleDelete, handleEdit }) => (
    <>
      <IconButton aria-label='delete' color='info' onClick={() => handleEdit(item)}>
        <ModeEditOutlineIcon />
      </IconButton>
      <IconButton
        aria-label='block'
        color='error'
        onClick={() => handleBlock(item)}
        disabled={item.status == 0 ? false : true}
      >
        <NotInterestedIcon />
      </IconButton>
      <IconButton
        aria-label='unblock'
        color='success'
        onClick={() => handleBlock(item)}
        disabled={item.status == 1 ? false : true}
      >
        <LockResetIcon />
      </IconButton>
      <IconButton aria-label='delete' color='error' onClick={() => handleDelete(item)}>
        <DeleteIcon />
      </IconButton>
    </>
  ))

  /*--------Handle Block Function--------*/
  const handleEdit = async item => {
    await setRowData(item)
    setShow(true)
  }

  const handleBlock = async item => {
    const { email, status } = item
    try {
      const response = await blockUser({ email, status })
      setMessage(response.data.message)
      setOpen(true)
    } catch (error) {
      setMessage(error?.response?.data?.message)
      setOpen(true)
    }
  }

  /*--------Handle Delete Function--------*/
  const handleDelete = async item => {
    const { email } = item
    try {
      const response = await deleteUser({ email })
      setMessage(response.data.message)
      setOpen(true)
    } catch (error) {
      setMessage(error?.response?.data?.message)
      setOpen(true)
    }
  }

  /*--------Get Users Data Function--------*/
  const getUsers = async () => {
    const response = await getUserData()

    setTotalUser(response.data.userData.length)
    let paid = 0
    let active = 0
    let blocked = 0
    const data = response.data.userData.map((item, index) => {
      if (item.hasPremium) {
        paid = paid + 1
      }

      if (item.isOnline) {
        active = active + 1
      }

      if (item.status == 1) {
        blocked = blocked + 1
      }
      const { name, email, isAdmin, isOnline, hasPremium, status, startson, endson } = item
      return {
        no: index + 1,
        name,
        email,
        isAdmin: isAdmin ? (
          <Chip icon={<AdminPanelSettingsIcon />} variant='outlined' color='info' label='Manager' size='small' />
        ) : (
          <Chip icon={<PeopleIcon />} variant='outlined' size='small' color='info' label='User' />
        ),
        membershipPlan: hasPremium ? (
          <div>
            {isExpired(endson) ? (
              <div className='text-center'>
                <span className='font-bold'>Investor</span>
                <BorderLinearProgress variant='determinate' value={countRemainDays(startson, endson)} />
              </div>
            ) : (
              <div className='text-center'>
                <span className='font-bold'>Expired</span>
                <ExpireProgressBar variant='determinate' value={100} />
              </div>
            )}
          </div>
        ) : (
          <div className='text-center'>
            <span className='font-bold'>Free</span>
            <DefaultProgressBar variant='determinate' value={100} />
          </div>
        ),
        isOnline: isOnline ? (
          <Chip icon={<OnlinePredictionIcon />} variant='outlined' size='small' color='info' label='Online' />
        ) : (
          <Chip icon={<DesktopAccessDisabledIcon />} variant='outlined' size='small' color='default' label='Offline' />
        ),
        hasPremium: hasPremium ? (
          <Chip icon={<VerifiedUserIcon />} variant='outlined' color='success' label='Investor' size='small' />
        ) : (
          <Chip icon={<PrivacyTipIcon />} variant='outlined' size='small' color='warning' label='Starter' />
        ),
        status: <StatusChip status={status} />,
        action: (
          <ActionButtons item={item} handleBlock={handleBlock} handleDelete={handleDelete} handleEdit={handleEdit} />
        )
      }
    })

    setTableData(data)
    setTotalOnline(active)
    setTotalPaid(paid)
    setTotalBlock(blocked)
    setRefresh(false)
  }

  useEffect(() => {
    getUsers()
  }, [refresh])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardHeader title='User Management' />
        <Grid container spacing={4} className='p-4'>
          <InfoCard title='Total Users' description={`Out Customers: ${totalUser}`} />
          <InfoCard title='Paid Users' description={`Paid Users: ${totalPaid}`} />
          <InfoCard title='Online Users' description={`Paid Users: ${totalOnlie}`} />
          <InfoCard title='Blocked Users' description={`Blocked Users: ${totalBlock}`} />
        </Grid>
        <CardContent>
          <MaterialReactTable
            columns={columns}
            data={tableData}
            renderTopToolbarCustomActions={() => (
              <Typography>
                <IconButton
                  aria-label='delete'
                  color='primary'
                  onClick={() => setRefresh(true)}
                  style={{ float: 'left' }}
                >
                  <RefreshIcon />
                </IconButton>
              </Typography>
            )}
          />
        </CardContent>
      </Card>
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={6000} message={message} />
      <UserEditModal open={show} handleClose={() => setShow(false)} data={rowData} />
    </Box>
  )
}

export default UserManagement
