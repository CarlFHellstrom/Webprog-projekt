import { NavigationMenuContent, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuItem, NavigationMenuList, NavigationMenu} from '@radix-ui/react-navigation-menu';
import './styles/App.css';      
import { Link, Outlet, useOutletContext } from "react-router-dom";


function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline mb-2">
        Movie list
      </h1>
      <NavigationMenuDemo />
      <div className="mt-6">
        <Outlet />
      </div>
    </>
  );
}

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/">Homepage</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
                <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="pages/SearchMedia">Search Media</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
                <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="pages/ViewWatchlist">View Watchlist</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
  
}
export default App;
