import { NavigationMenuContent, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuItem, NavigationMenuList, NavigationMenu} from '@radix-ui/react-navigation-menu';
import './styles/App.css';
import { Button } from './components/ui/button';
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useState } from 'react';
import { Media } from './lib/media'


function App() {
  const [watchlist, setWatchlist] = useState<Media[]>([]);

  function addMovie(movie: Media) {
    setWatchlist((state) => [...state, movie]);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline mb-2">
        Watch Vault
      </h1>
      <NavigationMenuDemo />
      <div className="mt-6">
        <Outlet context={{watchlist, addMovie}}/>
      </div>
    </>
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
