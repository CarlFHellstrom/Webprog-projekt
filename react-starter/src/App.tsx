import { NavigationMenuContent, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuItem, NavigationMenuList, NavigationMenu} from '@radix-ui/react-navigation-menu';
import './App.css';
import { Button } from './components/ui/button';
import { Link } from "react-router";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline mb-2">
        Hello tailwind world!
      </h1>
      <Button variant="outline">Hello shadcn world</Button>
      {NavigationMenuDemo()}
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
            <Link to="/SearchMedia">Search Media</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
                <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/components/ui/WatchList">View Watchlist</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
  
}
export default App;
