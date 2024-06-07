// ** MUI Imports
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import RefreshIcon from '@mui/icons-material/Refresh'

import { getDashBoardInfo } from 'src/pages/api'

const renderStats = dashboardData => {
  return dashboardData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  const [dashboardData, setDashboardData] = useState([])

  useEffect(() => {
    getDashBoardInfo()
      .then(result => {
        setDashboardData([
          {
            stats: result.data.data[0].totalSales,
            title: 'Sales',
            color: 'primary',
            icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: result.data.data[0].totalUsers,
            title: 'Customers',
            color: 'success',
            icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: result.data.data[0].totalPrograms,
            color: 'warning',
            title: 'Programs',
            icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: result.data.data[0].totalPromoted,
            color: 'info',
            title: 'Promoted',
            icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
          }
        ])
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <Card>
      <CardHeader
        title='Statistical Data'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <RefreshIcon />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}></Box>{' '}
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(dashboardData)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
