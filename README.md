This project is website for movies. The user can search for movies, make watchlists, view watchlists and make a review for a movie. 

## Project Structure

### Source Code 
```
src/
├── App.tsx              # <beskrivning av App>
├── Router.tsx           # <beskrivning av Router>
├── Main.tsx             # <beskrivning av Main>
├── assets/              # <beskrivning av assets/>
│   ├── react.svg
│   └── ...
├── components/ui/        # Shared UI components
│   └── alert.tsx
│   └── ...
├── lib/                 # <beskrivning av lib/>
│   ├── media.ts
│   └── ...
└── styles/              # CSS styles 
    ├── App.css
    └── ...
```
### Install/Setup instructions
```
1: Extract all from the zip file.
2: In a terminal cd into Webprog-projekt/Webprog-projekt/react-starter/
3: In this folder add a file named ".env.local". In this file add the following 
    line of code:
    VITE_OMDB_API_KEY="your key"
4:  The "your key" refers to the generated key you get from omdbapi. To get this 
    key go to this link: 
    https://www.omdbapi.com/apikey.aspx 
    Press the FREE option and enter your email, First and Last name.
    By doing this you will recive an email with the key in it. Copy the key and 
    into past it into .env.local instead of "your key" (without "").
        
        NOTE: You also have to activate the key with one of the links in the 
        mail.

5: Go back to the terminal and make sure that you are still in react-starter/. 
    Here you will first run npm install to get all necassary node moduls. 
    Then you can run npm run dev and click on the link it gives you.
        (If no other npm programs are running this should be http://localhost:5173/)
    Then you can use the website on your prefered browser.
```