// ** Icon imports
import DashboardIcon from '@mui/icons-material/Dashboard'
import ScheduleIcon from '@mui/icons-material/Schedule'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import SettingsIcon from '@mui/icons-material/Settings'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: DashboardIcon,
      path: '/'
    },
    {
      sectionTitle: 'Management'
    },
    {
      title: 'User',
      icon: Diversity1Icon,
      path: '/user-management'
    },
    {
      title: 'Programs',
      icon: ScheduleIcon,
      path: '/programs'
    },
    {
      title: 'Membership Plans',
      icon: PriceChangeIcon,
      path: '/membership-plans'
    },
    {
      sectionTitle: 'Other'
    },
    {
      title: 'Settings',
      icon: SettingsIcon,
      path: '/settings'
    }
  ]
}

export default navigation
