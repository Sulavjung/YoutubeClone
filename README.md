# CSC 317 Course Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information   |
|:-------------:|:-------------:|
| Student Name  | Sulav Jung Hamal    |
| Student ID    | 923075813      |
| Student Email | shamal@sfsu.edu    |


# Install/Build Instructions

## Build Instructions
1. Clone the repository:

2. Navigate to the application directory:
   
   ```bash
   cd csc317-code-Sulavjung/application/
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file with following environment variables.
	
	```dotenv
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

5. Build the database and tables:

   ```bash
   npm run builddb
   ```

## Run Instructions
1. Start the application:

   ```bash
   npm start
   ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000).

