// ** MUI Imports
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { getPromotedList } from 'src/pages/api'

const DashboardTable = () => {
  const [rowData, setRowData] = useState([])

  const getPrograms = async () => {
    let data = []
    const response = await getPromotedList()
    if (response.data.programs) {
      data = response.data.programs.map((item, index) => ({
        name: item.name,
        comimissionPercent: item.commission_in_percentage_formatted,
        comission: item.commission_amount_formatted,
        cookie: item.duration
      }))
    } else {
      data = []
    }
    setRowData(data)
  }

  useEffect(() => {
    getPrograms()
  }, [])
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>COMMISSION (%)</TableCell>
              <TableCell>COMMISSION</TableCell>
              <TableCell>COOOKIE DURATION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No data available</TableCell>
              </TableRow>
            ) : (
              rowData.map(row => (
                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                      <Typography variant='caption'>{row.designation}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.comimissionPercent}</TableCell>
                  <TableCell>{row.comission}</TableCell>
                  <TableCell>{row.cookie}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
