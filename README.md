# Webjet

#Introduction

This application is written by javascript/ES2015.

The backend is built on top of Express, acts as a proxy server performming multiple asynchronous API calls to test API server and these API calls are one relay on another. Additionally, the test API server is very unstable. Those facts added a lof of complexities of API request logics on error, re-try, timeout handling. I reckon Rxjs's simpler async and data flow would fit these requirements well so I used Rxjs to handle those async API requests.

The frontend is built on react,redux,redux-observable. I might have over engineered it. It just provides a simple button to fetch movies and display cheapest movies on screen. I just put Rxjs here to demonstrate its usage. I have also written filtering cheapest movies logic on frontend code by following consideration:
- In regards to scalability, currently it only displays cheapest, it may needs to display most expensive movies or particular cinema's movies later on. If frontend has already had full date of movies, we just need to change frontend code.

- In regards to save server's resources, let frontend to do as much work as they can. 

## Folder Structure

Below are some of the critical folders of the project along with a comment describing them.

```
/
|- public //  frontend production bundles along with index.html
|
|
|- src  // All the source code.
|  |- server // The server's routes entry and specific source.
|        |- config // configurations of server side 
|  |- client // The client bundle entry and specific source.
|        |-config // configurations of client side         
|
|- .app.js // application express server start point.
```

#Assumptions
- Cache control is configured by server side configuration, there is no cache control flag on request's parameter. (For security concerns, if the application acts as internal api proxy server we may can introduce cache control flag on request's parameter)
- Application has to return the movies even test API server failed to return the movie data. (It needs to perform re-try request when it received error from test API server. It can't simply catch error and send error back to client)
- Application should only re-try request in certain amount of time. It shouldn't keep retrying forever if test API server didn't respond correctly.
- Same movie from two different cinemas has same ID number.(These movies which only have differences on prefix of ID, for example 'cw0076759' and 'fw0076759' shall be treated as the same because they have the same ID number '0076759').

#Server work flow 

When '/moives' endponit request comes in, server will start to fetch movie list from test api server. If any error occurs or timeout setting is reached, it will keep on re-trying until the globel timeout setting is exceeded. If the movie list has been fetched sucessfully, it will fetch the movies' details according to the movie list from test api server. It has the same error handling logic as described above. Then the result will be retured to client. Additionally, if the cache setting is turned on, the cache will be used if it's sufficient before fetching movie list or details. 

#Client work flow

When user clicks 'get cheapest movies' button, client will start to fetch movies from server and display loading spinner on the screen. Once movies data comes back from server, client will preform fitler logic to get cheapest movies from full moives list then display the cheapest moives on screen. Additionally, user can search movies by typing keywords of movie's title on search box.

#Npm Scripts
Install dependencies
```
npm install
```
Run dev server
```
npm run start-dev
```
Run Linting
```
npm run lint
```
Run Test
```
npm run test-ci
```
Production build(prodution bundles are in /public )
```
npm run build
```

#Live Demo
[Live Demo](https://showcode.herokuapp.com/)
