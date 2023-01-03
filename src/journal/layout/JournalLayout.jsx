import { Box, Toolbar } from '@mui/material'
import { NavBar, SideBar } from '../components'

const drawerWidth = 240

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

      {/* NavBar drawerWidth */}
      <NavBar drawerWidth={drawerWidth} />

      {/* SideBar drawerWidth */}
      <SideBar />

      <Box component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        {/* ToolBar */}
        <Toolbar />

        {children}
      </Box>

    </Box>
  )
}