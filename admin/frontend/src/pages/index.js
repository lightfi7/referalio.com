import Grid from '@mui/material/Grid'
import Table from 'src/views/dashboard/Table'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <StatisticsCard />
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default Dashboard
