# Job Crawler API

The Job Crawler API is a Node.js application designed to fetch job listings from various sources on the internet, store them in a PostgreSQL database, and provide an interface to access these listings. It uses Google's Custom Search JSON API to search for jobs listed on specific job boards and stores the relevant job details in a local database.

## Features

- Fetch job listings using Google Custom Search JSON API.
- Store job details in PostgreSQL database.
- Easy integration with front-end frameworks for job display.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v12.x or higher)
- PostgreSQL (v10.x or higher)
- npm (Node Package Manager)

## Installation

Follow these steps to install the Job Crawler API:

1. Clone the repository:
   ```bash
   git clone https://github.com/LeeSingChanYau/job_crawler.git
