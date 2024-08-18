# MovieAPP React App Assignment
###### Full Stack Development 2, HDip in Computer Science
This repository contains my submission for the Movie assignment which was to the update the Full Stack 2 labs Movie Application.

__Name:__ Kieron Garvey

__Video Demo:__ https://youtu.be/rXJJLXb5JFc

__Deployed URL:__ https://kgmdb.vercel.app/

### FEATURES
I made alot of changes hoping for a __clean and simple design__. My application features a straightforward and user-friendly interface.

+ __Comprehensive Movie and TV Show Aplication__: 
  + I updated the API Integration with The Movie Database (TMDb) API to provide extensive information on Movies, TV Shows and Actors.
  + Extensive list of endpoints used to fetch data such as popular movies, upcoming releases, top-rated TV, see __[API ENDPOINTS](#api-endpoints)__ below for a full list.
+ __Custom Theming__:
  + __Pagination__ Application-wide theming using a custom palette to match branding and design preference.
  + Consistent use of colors, typography, and spacing.
+ __Home Page__:
  + Default __scroll bar__ disabled on the page.
  + Custom __scroll bar__ to only scroll __Movies\TV Show List__
  + __Pagination__ support for Movies\TV Shows 
  + __Search\Sort Feature__ 
    + I added a search feature to teh home page.
    + Once any of the __Selects__ are changed the application makes a call to the API and the Movies list to the right is updated
    + You can search by
      + __Media Type__: (__Movies__ or __TV Shows__) 
      + __Genre__ This list changes based on what _Media Type _was selected
      + __Date From\To__ Using google and found that TMDB has movies from 1888 to 2024 so the select has an entry for every year. I added in a feature which resets the search if your __Date From__ is more current that your __Date To__ and vice vers.
      + __Rating__ is based on a rating of 1 to 10
    + __Sort By__ You can sort the Movies\TV Shows by the current relevant TMDB sort criteria for each Media Type selected.
    + __Reset Search__ resets all the search elements to defaults.
  + __Movies\TV Show Results__
    + Displays search results in the __Movie/TV Show List__ which contains __Movie/TV Show Cards__ for all teh Movies\TV Shows returned
+ __Movie/TV Show List__:
  + __Pagination__ i have pagination throughout the site on all lists.
  + __Sort__ I added a sort feature where you can sort by Date, Rating & Popularity but it only works on the current displayed movies. In my HomePage i have a sort that sorts it via the API call. 
  + __Filter__: Did't change much bar UI changes.
    + Filter by Genre
    + Search
+ __Movie/TV Show Card Design__:
  + The __Card__ is a 3D transformable element on hover the card flips and displays the overview of the Movie/TV Show.
  + Contains Links to the Movie/TV Show Details page.
  + Favourites Add\Delete button only available when user logged in on different endpoints
  + Add to Playlist button only available when user logged in on different endpoints
+ __Movie/TV Show Details Page__:
  + I got a lot of enjoyment out of putting this together trying to mimic the layout on TMDB a little.
  + The main __Image__ is the first image in the list of images returned from the get images API call.
  + __Heading__: I made the Title the main heading on the page 
  + __Sub-Heading__: I used a mixture of Release Date, Genres and converted the runtime to hours and minutes.
  + __Tagline__: change the CSS to make the tagline stand out from the rest of the text.
  + __Vote Average__: I used the Material UI Box, CircularProgress & Typography components to build i circular progress bar based on the vote_average returned for each movie/TV show.
  + __Buttons__: I Added three buttons to the center of the screen
    + __Reviews__: Displays the Reviews in a drawer for the movie/TV show
    + __Watch Trailer__: Opens a Modal which starts playing the movie trailer.
    + __Movie Home__: Opens a new window/tab displaying the movie/TV show website.
  + __Cast\Actor List__:
    + Each main member of the cast has its own card which has a transition on hover and is clickable bringing you to the Actors details page for that actor.
    + I redesigned the scroll bar under the actors list.
  + __Similar Movies/TV Shows__ I added a component under teh details which contains similar Movies/TV Shows which has pagination.
+ __Actor Details Page__:
  + Similar to "__Movie/TV Show Details Page__"
  + __DATE OF DEATH__ only visible if the Actor has died.
  + __Credits__: Displays the actor credits for both Movie and TV Shows.
+ __Fantasy Movie__:
  + The __Add Movie__ component allows you to add a movie with teh "Movie Genre" list being populated from TMDB Api
    + If there is no image i have a custom one already designed.
  + Fantasy movies are displayed beside the Add movie form and you can see all users Movies.
  + __Not done but need to do__: I had most of it done on my first design but forgot to add it to the is page
    + Update Movie Image
    + Delete Movie
    + Update Movie
+ __Playlist Component__: 
  + You'll find this on the Movie Cards in the Upcomming Movies.
  + __Create__ new Playlists
  + __Delete__ Playlists
  + __Add to__ existing playlists
  + The Component displays the image fo the movie your adding to a playlist.
+ __Playlist Page__: 
  + All Movies in all Playlists are show first but there is a drop down (built dynamically for each user, based on the lists they create) which will filter out all movies bar the ones in the list.
+ __Favourites__:
  + __Movies Favourites__ 
    + __ADD To Favourites__ Logged in User can add movies in any of teh movie endpoints to the favourites 
    + __Favourites Page__ Pulls all the favourites from teh favourites table in Firebase and displays them on the page.
  + __TV Show Favourites__ I spent a long time on this but it wouldn't work for me. I wasn't getting any errors. but when my addToFavourites call was made it just skipped over it. Even with console logs in place and an await it just did nothing 
+ __Login Page__: 
  + I used Firebase Authentication for all Login\Sign-Up.
  + Users can 
    + Login (__signInWithEmailAndPassword__) with email and password
    + Sign-up (__createUserWithEmailAndPassword__) with email and password
    + Login\Sign-Up with Google Popup (__signInWithPopup__).
+ __Hamburger Menu__: 
  + I redesigned the site menu so it is hidden unless teh Hamburger is clicked.
  + Menu Icons added relevant icons to each menu item.
  + Sub Menus can be extended for hidden.
  + Protected route menu items are not displayed unless logged in.


### Setup requirements.

Clone this Repository

```
  git clone https://github.com/ki321g/MovieAPP.git
```

To get a copy of the project running on your system, navigate to the project directory in a command prompt/shell and run the following:

```
  npm install
```

This will install all dependencies in package-lock.json

While dependency are installing, rename __.env_example__ to __.env__ manually or if your in the correct location use the below command in the terminal

```
mv .env_example .env
```

Edit .env with your TMDB API Key and your Firebase details.

After dependency installation has completed run

```
npm run start
```

This will load the application and start a local server on port 3000.

```
http://localhost:3000/
```

<!-- CONTACT -->

### API ENDPOINTS
#### Movie, List of Movie endpoints used:
- [/discover/movie](https://developers.themoviedb.org/3/discover/movie-discover): Discover movies by different types of data like average rating, number of votes, genres and certifications.
- [/genre/movie/list](https://developers.themoviedb.org/3/genres/get-movie-list): Get the list of official genres for movies.
- [/movie/upcoming](https://developers.themoviedb.org/3/movies/get-upcoming): Get a list of upcoming movies in theatres.
- [/movie/now_playing](https://developers.themoviedb.org/3/movies/get-now-playing): Get a list of movies in theatres.
- [/movie/popular](https://developers.themoviedb.org/3/movies/get-popular-movies): Get a list of the current popular movies on TMDb.
- [/movie/top_rated](https://developers.themoviedb.org/3/movies/get-top-rated-movies): Get the top rated movies on TMDb.
- [/movie/{movie_id}](https://developers.themoviedb.org/3/movies/get-movie-details): Get the primary information about a movie.
- [/movie/{movie_id}/images](https://developers.themoviedb.org/3/movies/get-movie-images): Get the images for a movie.
- [/movie/{movie_id}/videos](https://developers.themoviedb.org/3/movies/get-movie-videos): Get the videos (trailers, teasers, clips, etc.) for a movie.
- [/movie/{movie_id}/similar](https://developers.themoviedb.org/3/movies/get-similar-movies): Get a list of movies similar to a movie.
- [/movie/{movie_id}/review](https://developers.themoviedb.org/3/movies/get-movie-reviews): Get the user reviews for a movie.
- [/movie/{movie_id}/credits](https://developers.themoviedb.org/3/movies/get-movie-credits): Get the cast and crew for a movie.


#### List of TV Series endpoints used:
- [/discover/tv](https://developers.themoviedb.org/3/discover/tv-discover): Discover TV shows by different types of data like average rating, number of votes, genres, the network they aired on and air dates.
- [/genre/tv/list](https://developers.themoviedb.org/3/genres/get-tv-list): Get the list of official genres for TV shows.
- [/tv/airing_today](https://developers.themoviedb.org/3/tv/get-tv-airing-today): Get a list of TV shows that are airing today.
- [/tv/on_the_air](https://developers.themoviedb.org/3/tv/get-tv-on-the-air): Get a list of TV shows that are currently on the air.
- [/tv/popular](https://developers.themoviedb.org/3/tv/get-popular-tv-shows): Get a list of the current popular TV shows on TMDb.
- [/tv/top_rated](https://developers.themoviedb.org/3/tv/get-top-rated-tv): Get the top rated TV shows on TMDb.
- [/tv/{series_id}](https://developers.themoviedb.org/3/tv/get-tv-details): Get the primary information about a TV show.
- [/tv/{series_id}/reviews](https://developers.themoviedb.org/3/tv/get-tv-reviews): Get the user reviews for a TV show.
- [/tv/{series_id}/images](https://developers.themoviedb.org/3/tv/get-tv-images): Get the images for a TV show.
- [/tv/{series_id}/videos](https://developers.themoviedb.org/3/tv/get-tv-videos): Get the videos (trailers, teasers, clips, etc.) for a TV show.
- [/tv/{series_id}/credits](https://developers.themoviedb.org/3/tv/get-tv-credits): Get the cast and crew for a TV show.

#### List of Actor endpoints used:
- [/person/{person_id}](https://developers.themoviedb.org/3/people/get-person-details): Get the primary information about a person.
- [/person/{person_id}/movie_credits](https://developers.themoviedb.org/3/people/get-person-movie-credits): Get the movie credits for a person.
- [/person/{person_id}/tv_credits](https://developers.themoviedb.org/3/people/get-person-tv-credits): Get the TV show credits for a person.

### ROUTING
Below are both Public and Protected Routes, along with all routes within them.

#### Public Routes
- [/](https://kgmdb.vercel.app/): Home Page which contains the Movie\TV Show Search.

##### Movies
- [/movies/discover](https://kgmdb.vercel.app/movies/discover): Get 
- [/movies/popular](https://kgmdb.vercel.app/movies/popular): Get 
- [/movies/upcoming](https://kgmdb.vercel.app/movies/upcoming): Get 
- [/movies/toprated](https://kgmdb.vercel.app/movies/toprated): Get 
- [/movies/nowplaying](https://kgmdb.vercel.app/movies/nowplaying): Get
- [/movies/:id](https://kgmdb.vercel.app/movies/533535): Get 

##### TV Shows
- [/tv](https://kgmdb.vercel.app/tv): Get 
- [/tv/popular](https://kgmdb.vercel.app/tv/popular): Get 
- [/tv/top-rated](https://kgmdb.vercel.app/tv/top-rated): Get 
- [/tv/airing-today](https://kgmdb.vercel.app/tv/airing-today): Get 
- [/tv/on-the-air](https://kgmdb.vercel.app/tv/on-the-air): Get 
- [/tv/:id](https://kgmdb.vercel.app/tv/1396): Get 

##### Reviews
- [/reviews/form](https://kgmdb.vercel.app/reviews/form): Can only be access via Movie card in [/movies/favourites](https://kgmdb.vercel.app/movies/favourites) route
- [/reviews/movie/:id](https://kgmdb.vercel.app/reviews/movie/66a41bd02029ba46995219c8): GEt 
- [/reviews/tv/:id](https://kgmdb.vercel.app/reviews/tv/634da071d6dbba007aa73f39): Get 


##### Actor
- [/actor/:id](https://kgmdb.vercel.app/actor/10859): Get 

##### Actor
- [/login](https://kgmdb.vercel.app/login): Get 

#### Protected Routes
- [/movies/playlists](https://kgmdb.vercel.app/movies/playlists): Get the TV show credits for a person.
- [/movies/favourites](https://kgmdb.vercel.app/movies/favourites): Get the TV show credits for a person.
- [/fantasymovie](https://kgmdb.vercel.app/fantasymovie): Get the TV show credits for a person.

### THIRD PARTY COMPONENTS/INTEGRATIONS 

+ __API Integration with TMDB__:
  + __Pagination__ Robust integration with TMDb API to fetch detailed information on movies, TV shows, and actors.
  + Use of multiple API endpoints to provide users with a rich browsing experience.

+ __Firebase Backend Services:__:
  + __Firebase Authentication__ to manage user sign-in and security for protected routes.
  + __Firebase Storage__ to store Fantasy Movie Images
  + __Firebase Database__ for retrieval of user-specific data such as Favorites, Playlists, Movies in Playlist.

+ __react-google-button__ ([https://www.npmjs.com/package/react-google-button](https://www.npmjs.com/package/react-google-button)) component, used to display the sign in with google button on the Login page.
+ __@mui/system__ ([https://www.npmjs.com/package/@mui/system](https://www.npmjs.com/package/@mui/system)) component. MUI System is a set of CSS utilities to help you build custom designs more efficiently. It makes it possible to rapidly lay out custom designs.
+ __@mui/x-date-pickers__ ([https://www.npmjs.com/package/@mui/x-date-pickers](https://www.npmjs.com/package/@mui/x-date-pickers)) component. This package is the Community plan edition of the Date and Time Picker components. It's part of MUI X, an open-core extension of MUI Core, with advanced components.
+ __dayjs__ ([https://www.npmjs.com/package/dayjs](https://www.npmjs.com/package/dayjs)) component. Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API. If you use Moment.js, you already know how to use Day.js.
+ __mui-nested-menu__ ([https://www.npmjs.com/package/mui-nested-menu](https://www.npmjs.com/package/mui-nested-menu)) component. This package provides components to let you nest menu items infinitely deep. 
+ __react-select__ ([https://www.npmjs.com/package/react-select](https://www.npmjs.com/package/react-select)) component. The Select control for React


### INDEPENDENT LEARNING

+ __Vercel deployment__: https://medium.com/@abdulmuizzayo6/how-to-host-your-react-app-on-vercel-effectively-7ae35b259044 Pat was deploying his application while i was still building mine and shared this with all in slack. It saved me some time. Independent Learning?? Maybe not but group learning i suppose. Vercel itself was very helpful when looking to fix all teh type errors and unused variables in my application
+ __Firebase Auth, Storage & Database__: Credit has to go to YouTube channel [PedroTech](https://www.youtube.com/@PedroTechnologies) for his video titled "[Firebase React Course For Beginners - Learn Firebase V9+ in 2 Hours](https://www.youtube.com/watch?v=2hR-uWjBAgw)", i found him very easy to follow and learnt a lot. I had everything integrated into my app as i watched his video. I forgot to put some into the Fantasy Movie in teh end even thou i had it working, Delete and Update Movie.
+ __Material UI__: I spent a lot of time on on there [documentation site ](https://mui.com/material-ui/getting-started/)

### MY THOUGHTS ON COMPLETION OF ASSIGNMENT
I learnt a lot extending this Movies Application from the HDip Full Stack 2 Labs. I have already bought a course on [UDEMY](https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=KEEPLEARNING) which is 68 hours long which i want to go though.

Developing this Application during teh summer months I took too much of a break after my holidays and I ran out of time to do everything i wanted. There is some of my code in my Routes that I should have broken out into individual components to reuse through out the script. I'll be doing this on my next react project.

I think ill enjoy React, I hope to be able to use it in my working environment soon.

### AI DECLARATION
I wanted to make it clear that I did use AI during this project in Visual Studio i have GitHub Copilot Extension installed and I used this to help me with:
+ __Troubleshooting__: I would copy errors from terminal or chrome console and paste them into copilot to try figure out where the bugs were happening in the application. It was very useful most of the time but sometimes lead to other issues.
+ __Building Boiler Plates__: For example ill use the home page. I asked Copilot to build me some sor tof grid using Material UI elements which had a left panel and a right one which contained two elements. What it gave me back was the my starting point to building the page.
+ __Inspiration__: I was lost a few times trying to figure out what to do and just asked for AI for its opinion. Telling it what i was doing and what i like it came back with a few nice helpful suggestions to get me going.
