import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Button, Modal, Snackbar, IconButton } from '@mui/material'
import { doSchedule } from '../../pages/api'
import CloseIcon from '@mui/icons-material/Close'

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: 'white',
  border: '2px solid #fff',
  boxShadow: 24,
  padding: 12
}

export default function ScheduleModal(props) {
  const [type, setType] = useState('')
  const [show, setShow] = useState(false)

  const action = (
    <React.Fragment>
      <IconButton size='small' aria-label='close' color='inherit' onClick={() => setShow(false)}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  )

  const setSchedule = async () => {
    if (type === '') {
      setShow(true)
    } else {
      await doSchedule(type)
      alert('Scheduled!')
    }
  }

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <div style={style}>
          <FormControl>
            <FormLabel id='demo-row-radio-buttons-group-label'>- Schedule the Scraping -</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              onChange={event => setType(event.target.value)}
            >
              <FormControlLabel value='now' control={<Radio />} label='Now' />
              <FormControlLabel value='every week' control={<Radio />} label='Every Week' />
              <FormControlLabel value='every month' control={<Radio />} label='Every Month' />
            </RadioGroup>
          </FormControl>
          <Button
            variant='outlined'
            size='small'
            style={{ position: 'sticky', left: '100%', marginTop: '10px' }}
            onClick={() => setSchedule()}
          >
            Set Schedule
          </Button>
        </div>
      </Modal>
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={() => {
          setShow(false)
        }}
        message='Please select schedule type!'
        action={action}
      />
    </>
  )
}
