import { NavigationMenuLink, NavigationMenuItem, NavigationMenuList, NavigationMenu} from '@radix-ui/react-navigation-menu';
import './styles/App.css';
import { Link, Outlet} from "react-router-dom";
import { useState } from 'react';
import { Media } from './lib/media'
import logo from './assets/logo.png';


function App() {
  const [watchlist, setWatchlist] = useState<Media[]>([]);

  function addMovie(movie: Media) {
    setWatchlist((state) => [...state, movie]);
  }

  return (
    
    <div className="flex flex-col items-center p-4">
      <img
        src={logo}
        alt="Watch Vault logo"
        className="w-90 h-90 object-contain mb-0"
      />
      <NavigationMenuDemo />
      <div className="mt-6 mb-6">
        <Outlet context={{watchlist, addMovie}}/>
      </div>
    </div>
  );
}

function NavigationMenuDemo() {
  return (
    <div className="flex items-centre justify-centre gap-4">
    <NavigationMenu>
      <NavigationMenuList className="flex flex-row gap-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" className="text-llg font-medium hover:text-green-600">Homepage</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
                <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="pages/SearchMedia" className="text-llg font-medium hover:text-green-600">Search Media</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
                <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="pages/ViewWatchlist" className="text-llg font-medium hover:text-green-600">View Watchlist</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
  
}
export default App;
