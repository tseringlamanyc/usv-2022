# Reservation Coding Assignment

Front end heroku link [here](https://takehome-usv.herokuapp.com/).

## Description 
This is a web application that allows the users to Create, Read, Update and Delete from a database. 
- Users are able to
  - Create restaurant
  - Edit and delete restaurant
   - Search restaurant through filters (location, price, cuisine, dining service) 
  - Create reservation
  - Edit and delete reservation
  - See all reservations for all restaurants


## Installation Instructions 

1. Clone this repo.
2. Ensure you have `node` installed locally in Terminal, run `node -v`, if it's not installed visit [node.js](https://nodejs.org/en/) for the latest version.
3. Navigate to the cloned project in Terminal, ensure that you're in the project directory.
4. Run `npm install` to ensure all dependencies are installed.
5. To run the app run `npm start` in the Terminal.
6. You should now be able to see the app running in your browser at `localhost:3000`.


## Responsive

- Mobile 
- Desktop

## Screenshots

| Mobile  | Desktop |
| ------------- | ------------- |
| <img width="391" height="600" alt="Screen Shot 2022-06-30 at 6 20 23 PM" src="https://user-images.githubusercontent.com/55720394/176788348-1b521d7b-d760-4928-a188-d0145049797a.png"> | <img width="803" alt="Screen Shot 2022-06-30 at 6 19 49 PM" src="https://user-images.githubusercontent.com/55720394/176788412-58eb73a3-70fb-4876-a07a-c3f27cfe6ad3.png">  |


## Icebox features

- [ ] Implement map using (Google maps / Mapbox)
- [ ] Allow users to upload photos while creating a restaurant
- [ ] Show restaurants based on zipcodes
- [ ] Able to post reviews
- [ ] Add responsiveness for tablets 

## Challenges encountered
- Manipulating date object in order to make it more user friendly

```js
const change12To24 = (str) => {
  const timeString12hr = new Date("1970-01-01T" + str + "Z").toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return timeString12hr;
};

const formatTime = (e) => {
  let formattedHour = e.getHours().toString();
  let formattedMin = e.getMinutes().toString();
  let formattedSec = e.getSeconds().toString();
  let formattedTime = "";

  if (formattedHour.length === 1) {
    formattedHour = `0${formattedHour}`;
  }

  if (formattedMin.length === 1) {
    formattedMin = `0${formattedMin}`;
  }

  if (formattedSec.length === 1) {
    formattedSec = `0${formattedSec}`;
  }

  formattedTime = `${formattedHour}:${formattedMin}:${formattedSec}`;

  return formattedTime;
};



```
- Filtering through multiple user inputs 

``` js
 useEffect(() => {
    let fData = filterByName(allRestaurants);
    fData = filterByLocation(fData);
    fData = filterByCuisine(fData);
    fData = filterByPrice(fData);
    fData = filterByService(fData);
    setFilteredRestaurants(fData);
  }, [searchTerm, restaurantLocation, restaurantCuisine, restaurantPrice, restaurantService]);
```

## Frameworks / API

- HTML, CSS, Javscript
- [Material UI](https://mui.com/)
- [SASS](https://www.npmjs.com/package/node-sass)
- [Heroku](https://www.heroku.com/)
- [ReactJS](https://reactjs.org/)
