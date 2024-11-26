![example workflow](https://github.com/boring-jpg/space-tracker/actions/workflows/test_front.yml/badge.svg)

# Space-Tracker

Space-Tracker is a web app that provides real-time data on upcoming space launches. It features dynamic data fetching, countdown timers, and a clean, responsive design. This project is my capstone for a web development bootcamp, demonstrating my skills in front-end development with React and modern web technologies.

## Live Demo

[https://space-tracker.onrender.com](https://space-tracker.onrender.com)

## Features

**Responsive Design:** Adapts seamlessly to mobile, tablet, and desktop screens.

**Real-Time Launch Data:** Dynamic fetching of upcoming space launches, including countdowns and mission details.

**API Integration:** Real-time data is fetched from a public space launch API and rendered dynamically on the page.

**Full CI/CD** This project is tested with jest, contanerized in docker, and deployed automatically to render.com.  THis makes extensive use of Github Actions, Docker Hub, and Dockerfiles fully automate the testing and deployment of this application.

## Technologies Used

MongoDB, Express, React, Node, SCSS, JavaScript (ES6+), GIthub Actions, Docker, and TheSpaceDevs Launch API.

## Deploy App

```bash
sudo docker pull boringjpg/space-tracker

sudo docker run -e MONGO="YOUR_MONGODB_URI" -e SESSION="SECRET_TO_HASH_SESSIONS" -d boringjpg/space-tracker
```