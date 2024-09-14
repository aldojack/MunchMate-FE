import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingCart } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MealPlannerContext from '../../hooks/MealPlannerContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const context = useContext(MealPlannerContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const handleClick = () => {
    console.log('menu open ', menuOpen);
    
    setMenuOpen(!menuOpen)
  }
  if (!context) {
    throw new Error('Navbar must be used within a MealPlannerProvider');
  }

  const { meals, favorites, shoppingList } = context;


  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/">MunchMate</Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton size="large" aria-label="show 4 favorite recipes" color="inherit">
              <Badge badgeContent={meals} color="error">
                <MenuBookIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 4 favorite recipes" color="inherit">
              <Badge badgeContent={favorites} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 items on shopping list"
              color="inherit"
              onClick={() => handleClick()}
            >
              <Badge badgeContent={shoppingList} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {menuOpen && (
              <div className='absolute top-[4rem] right-0 h-48 bg-red-400'>
                <h1>Shopping List</h1>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}