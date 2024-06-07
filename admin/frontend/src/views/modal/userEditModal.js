import React, { useEffect, useState, useMemo } from 'react'
import { Button, Modal, Snackbar, InputLabel, Select, MenuItem } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import FormControl from '@mui/material/FormControl'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { getMemberShipPlan, updateUserData } from 'src/pages/api'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  border: '2px solid #fff',
  boxShadow: 24,
  padding: 24
}

export default function UserEditModal(props) {
  const [show, setShow] = useState(false)
  const [changeEdit, setChangeEdit] = useState(true)
  const [edit, setEdit] = useState(true)
  const [currentPlan, setCurrentPlan] = useState([])
  const [type, setType] = useState('')
  const [plans, setPlans] = useState([])
  const [message, setMessage] = useState('')
  const [startDate, setStartDate] = useState(dayjs(props.data.startson))
  const [endDate, setEndDate] = useState(dayjs(props.data.endson))

  let temp = []
  let tempCurrent = []

  useEffect(() => {
    setStartDate(dayjs(props.data.startson))
    setEndDate(dayjs(props.data.endson))
    getMemberShipPlan()
      .then(response => {
        response.data.data.map((plan, index) => {
          temp.push({
            name: plan.name,
            description: plan.description,
            amount: plan.amount,
            period: plan.period,
            programs: plan.programs,
            startson: <DateTimePicker value={startDate} onChange={newValue => setStartDate(newValue)} />,
            endson: <DateTimePicker value={endDate} onChange={newValue => setEndDate(newValue)} />
          })
          if (props.data.hasPremium == true) {
            if (plan.name == 'Investor') {
              tempCurrent.push({
                name: plan.name,
                description: plan.description,
                amount: plan.amount,
                period: plan.period,
                programs: plan.programs,
                startson: <DateTimePicker value={startDate} onChange={newValue => setStartDate(newValue)} />,
                endson: <DateTimePicker value={endDate} onChange={newValue => setEndDate(newValue)} />
              })
              setType(plan.name)
              setCurrentPlan(tempCurrent)
              return
            }
          } else {
            if (plan.name == 'Starter') {
              tempCurrent.push({
                name: plan.name,
                description: plan.description,
                amount: plan.amount,
                period: plan.period,
                programs: plan.programs,
                startson: (
                  <DateTimePicker value={startDate} onChange={newValue => setStartDate(newValue)} disabled={true} />
                ),
                endson: <DateTimePicker value={endDate} onChange={newValue => setEndDate(newValue)} disabled={true} />
              })
              setType(plan.name)
              setCurrentPlan(tempCurrent)
              return
            }
          }
        })
        setPlans(temp)
      })
      .catch(error => {
        console.error(error)
      })
  }, [props])

  const changePlan = () => {
    if (type != '') {
      let temp = []
      plans.map((item, index) => {
        if (item.name === type) {
          temp.push(item)
          setCurrentPlan(temp)
        }
      })
      setEdit(false)
    }
  }

  const updateCurrentPlan = () => {
    updateUserData({ email: props.data.email, plan: currentPlan, startDate: startDate, endDate: endDate })
      .then(result => {
        setShow(true)
        setMessage(result.data.message)
        setEdit(true)
        setChangeEdit(true)
      })
      .catch(err => {
        console.log(err)
        setShow(true)
        setMessage(err.response.data.message)
        setEdit(true)
        setChangeEdit(true)
      })
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 150
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 150
      },
      {
        accessorKey: 'amount', //normal accessorKey
        header: 'Amount',
        size: 200
      },
      {
        accessorKey: 'period',
        header: 'Period',
        size: 150
      },
      {
        accessorKey: 'programs',
        header: 'Programs',
        size: 150
      },
      {
        accessorKey: 'startson',
        header: 'Starts On',
        size: 150
      },
      {
        accessorKey: 'endson',
        header: 'Ends On',
        size: 150
      }
    ],
    []
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        open={props.open}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        onClose={props.handleClose}
      >
        <div style={style}>
          <div className='flex gap-2 w-full mb-4'>
            <FormControl sx={{ minWidth: 240 }} size='small'>
              <InputLabel id='demo-simple-select-label'>Membership Plans</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={type}
                label='Membership Plans'
                onChange={e => {
                  setType(e.target.value)
                  setChangeEdit(false)
                }}
              >
                {plans.map((plan, index) => {
                  return (
                    <MenuItem key={index} value={plan.name}>
                      {plan.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <Button
              variant='contained'
              className='pl-1'
              endIcon={<PlaylistAddIcon />}
              size='small'
              onClick={() => {
                changePlan()
              }}
              disabled={changeEdit}
            >
              Change Plan
            </Button>
            <Button
              variant='contained'
              className='pl-1'
              size='small'
              onClick={() => {
                updateCurrentPlan()
              }}
            >
              Save
            </Button>
          </div>
          <MaterialReactTable columns={columns} data={currentPlan} />
        </div>
      </Modal>
      <Snackbar open={show} onClose={() => setShow(false)} autoHideDuration={6000} message={message} />
    </LocalizationProvider>
  )
}
