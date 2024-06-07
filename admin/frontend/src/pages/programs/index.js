import React, { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { getProgramList } from '../api'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import RefreshIcon from '@mui/icons-material/Refresh'
import ScheduleModal from '../../views/modal/scheduleModal'

const Programs = () => {
  const [tableData, setTableData] = useState([])
  const [open, setOpen] = useState(false)
  const [refersh, setRefersh] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'no', //access nested data with dot notation
        header: 'No',
        size: 50
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 50
      },
      {
        accessorKey: 'percentage_per_sale', //normal accessorKey
        header: 'COMMISSION (%)',
        size: 50
      },
      {
        accessorKey: 'amount_per_sale',
        header: 'COMMISSION',
        size: 150
      },
      {
        accessorKey: 'days',
        header: 'COOOKIE DURATION',
        size: 150
      }
    ],
    []
  )

  const getPrograms = async () => {
    let data = []
    const response = await getProgramList()
    if (response.data.programs) {
      data = response.data.programs.map((item, index) => ({
        no: index + 1, // Adding 1 because array index starts at 0
        name: item.name,
        percentage_per_sale: item.commission_in_percentage_formatted,
        amount_per_sale: item.commission_amount_formatted,
        days: item.duration
      }))
    } else {
      data = []
    }
    setTableData(data)
    setRefersh(false)
  }

  useEffect(() => {
    getPrograms()
  }, [refersh])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardHeader title='Program Management' />
        <CardContent className='mt-4'>
          <MaterialReactTable
            columns={columns}
            data={tableData}
            renderTopToolbarCustomActions={() => (
              <Typography component='span' variant='h6'>
                <IconButton
                  aria-label='delete'
                  color='primary'
                  style={{ float: 'left' }}
                  onClick={() => setRefersh(true)}
                >
                  <RefreshIcon />
                </IconButton>
                <IconButton aria-label='delete' color='primary' onClick={() => setOpen(true)}>
                  <CalendarMonthIcon />
                </IconButton>
              </Typography>
            )}
          />
        </CardContent>
      </Card>
      <ScheduleModal open={open} handleClose={handleClose} />
    </Box>
  )
}

export default Programs
