
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingCart } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MealPlannerContext from '../../hooks/MealPlannerContext';
import { RecipeIngredientDTO } from '../../types';
import { ListItemText } from '@mui/material';


export default function PrimarySearchAppBar() {
  const context = useContext(MealPlannerContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>()
  const handleClick = () => {
    console.log('menu open ', menuOpen);

    setMenuOpen(!menuOpen)
  }
  if (!context) {
    throw new Error('Navbar must be used within a MealPlannerProvider');
  }

  const { meals, favorites, shoppingList } = context;


  return (
    <Box sx={{ flexGrow: 1 }}>
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
            sx={{ marginRight: 'auto' }}
          >
            <Link to="/">MunchMate</Link>
          </Typography>

          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box sx={{ display: 'flex' }}>
            {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
            <IconButton size="large" aria-label="show 4 favorite recipes" color="inherit">
              <Link to="/planner">
                <Badge badgeContent={meals.length} color="error">
                  <MenuBookIcon />
                </Badge>
              </Link>
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
              <Badge badgeContent={shoppingList.length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {menuOpen && (
              <div className='absolute top-[4rem] right-4 max-h-80 md:max-h-[700px] lg:max-h-[900px] max-w-80 overflow-y-auto'>
                <List sx={{backgroundColor: 'background.paper', color: 'black'}}>
                  <h2 className='font-bold text-2xl text-center'>Shopping List</h2>
                  {shoppingList.map((ingredient: RecipeIngredientDTO) => {
                    return (
                      <ListItem key={ingredient.id}>
                        <ListItemText primary={ingredient.name} secondary={`${ingredient.quantity}${ingredient.unit}`} />
                      </ListItem>
                    )
                  })}
                </List>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}