# Bandr

## Description
Bandr is an application for musicians, bands, and event organizers. Upon sign up, users can create a profile of either two types ("band" or "planner"). Upon creation, the users profile will be available to match with other user profiles of the opposite type. When a user has a profile, they can search for matches as well. Users can skip through each profile individually, and when they see a potential match, they will either send a match if the opposite user hasn't already sent a match, or accept the match if the other user already sent a match. Sent and accepted matches are automatically removed from the Match queue, and users can see the profiles they've matched with in a seperate view.

## Planning Story
I wanted to create an app to make it easier for musicians to find work and for entertainers and event planners to find talent. At first I wanted to create an E-Commerce site where users can book bands and set up an automatic payment, but I decided I wanted to challenge myself at building an additional resource in the backend. A lot of planning went into how the match model would look and it posed some unique challenges. Unlike friendships where there is a sender and reciever, the user doesn't know if the user they are going to match with has already sent a match request. This was a fun challenge to build and incorperate with React front end.

## Important Links
- [API Repo](https://github.com/mdelgado509/bandr-api)
- [Deployed Client](https://mdelgado509.github.io/bandr-client/)
- [Deployed API](https://desolate-fjord-95980.herokuapp.com/)


## User Stories
- As a user I want to sign up with email and password.
- As a user I want to create a profile when I sign up.
- As a user I want to create either two types of profiles (band or planner).
- As a user I want to provide a name and description for my profile.
- As a user I want to be able to update my profile name and/or description.
- As a user I want to be able to delete my profile.
- As a user that has a profile I want to index profiles opposite my profile type.
- As a user I want to skip through profiles to search through the profile index.
- As a user I want to match with profiles to send a match or accept.
- As a user I want to recieve a message when I made a match.
- As a user I want the matches sent and made profiles to be removed from the index profiles queue.
- As a user I want to view the profiles I matched with.
- As a user I want to be able to change my password and sign out.


## Technologies Used
- Express
- MongoDB
- ReactJS
- Bootstrap

## Wireframes
![wireframe1](https://media.git.generalassemb.ly/user/35054/files/3f345800-c2bb-11eb-87dc-d1bf05922276)
![wireframe2](https://media.git.generalassemb.ly/user/35054/files/3fccee80-c2bb-11eb-9759-744ccef12177)

## Problem-solving process and strategy
Working with an additional resource (users, profiles, and their matches) added a new layer of complexity and posed interesting questions when designing the API and client application. In designing the back end, I chose to only allow users to create and own one profile at a time to focus on the matching features and create a life-like experience for users (assuming you can create only one dating profile at a time per email). For matches, I wanted to create a scenario that differed from the traditional friend request and acceptance, so I designed the match component to make one API call that would create a match instance or update it to accepted if the other user already sent the current user a match. Note that there may be multiple solutions to this design question, such as using async / await and making sepereate API calls. 
Indexing profiles to match with also posed some interesting design questions in regard to front end development. I leveraged setting user state by populating the user's `profileId` field in the back end sign-in route. This way the app would keep track of whether the user had a profile and what the profile type was if it was already created. This was also important for indexing other users profiles to match with, as the user only wants to match with profiles of the opposite type.

## Unsolved Problems
- In development match instances of a deleted profile (person B) are dropped from the test database, but in production the match instances are only modified to set the user profile (person B) to null, causing the app to break if signed in as the other user (person A).
- Is one API call to a nested backend route faster than multiple calls using async / await ?
- Messaging between users with profiles that match (web sockets?).
- Additional CRUD actions for match resource.
- Styling, reorganization of visual UI components, and a swipe-left swipe-right feature.
