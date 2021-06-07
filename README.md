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
I decided to focus on creating profile and match routes that served the user functionality. Most of the issues I had were from more of a system design standpoint. For example, I began with a create match route, and an update match route. I eventually combined the two so that everytime a user called update match, if the match didn't exist, a new match was created. The client side also posed interesting system design questions, like how to keep track of the users profile information. I wound up incorperating an additional line of code in the backend sign-in route so that I could set it to the user state in the front end.

## Unsolved Problems
- Deleting matches
- Viewing individual matches
- Messaging between matches
- Will users that send a match at the same time ever match?
