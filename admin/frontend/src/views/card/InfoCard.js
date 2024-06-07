import { Card, CardContent, Typography, Grid } from '@mui/material'

const InfoCard = ({ title, description }) => (
  <Grid item xs={12} sm={3}>
    <Card>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
)

export default InfoCard
