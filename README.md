# NodeJS Exam Project
## By Nicolas Javier Jan, DAT21I.

For this project, I decided to create a webpage for my machine learning Mandatory. 
I trained an RNN model on more than 22 thousand Heavy Metal song titles to get new titles.

In this page, a User can:
*Sign Up*
*Log in*
*Log out*
*Create new Song Titles*
*Favorite the Song Titles*
*Add the Favorited Song titles (all of them, or some of them) to a Gallery*
*Edit their profile information*
*Edit their account information*
An Admin can:
*Log in*
*Log out*
*Access an Admin Panel where they can see the geographical location of the users, and a graph that shows the Model Acceptance (Number of songs favorited / number of songs created)*

Routes for the Users with an account (profile, account edit, profile edit, and song creator) are protected. Users without an account can still see the Gallery and the Home Page. Users flagged as admin can see the Admin Panel but not create songs themselves.

Links that I used for certain features:
https://css-tricks.com/how-to-create-neon-text-with-css/  => For the overall style of the page
https://stackoverflow.com/questions/53388003/select-country-dropdown-in-html-page => For the Countries Dropdown
https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json => For the Countries Map in the Admin Panel.