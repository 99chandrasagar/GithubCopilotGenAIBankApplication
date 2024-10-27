# Banking Application - README

## Overview

This is a REST API-based banking application developed using **Java Spring Boot** for the backend and **ReactJS** for the frontend. The application supports typical banking operations such as managing users, accounts, loans, and transactions (deposits and withdrawals). The backend APIs are exposed through HTTP endpoints, and the frontend interacts with these APIs to provide a user-friendly interface.


## Features and API Endpoints

### Users
- **Get All Users**  
  - URL: `GET http://localhost:8080/users`  


- **Add a New User**  
  - URL: `POST http://localhost:8080/adduser?name=First+Last`  


### Accounts
- **Get All Accounts**  
  - URL: `GET http://localhost:8080/accounts`  


- **Add a New Account**  
  - URL: `POST http://localhost:8080/addaccount?userId=1&balance=1000`  


### Loans
- **Get All Loans**  
  - URL: `GET http://localhost:8080/loans`  


- **Add a New Loan**  
  - URL: `POST http://localhost:8080/addloan?userId=1&sanctionAmount=100`  


### Transactions
- **Deposit Money**  
  - URL: `POST http://localhost:8080/depositmoney?accountId=1&amount=1000`  


- **Withdraw Money**  
  - URL: `POST http://localhost:8080/withdrawmoney?accountId=1&amount=1000`  


## Running the Application Locally

To run the full-stack application locally, follow these steps:

1. **Start the Backend Server**:
   - Run `BankingApiApp.java` from your IDE or use `mvn spring-boot:run` in the backend directory.
   - Ensure that no Maven profiles are selected.

2. **Start the Frontend Application**:
   - Navigate to the `bankingapp` directory.
   - Run the command `npm start` to start the React frontend.

3. **Access the Application**:
   - Open a browser and navigate to `http://localhost:3000/`. The frontend will be connected to the backend APIs running at `http://localhost:8080/`.

## Deploying the Application on AWS

The application can also be deployed on AWS Elastic Beanstalk.

### Maven Profiles
Maven profiles are used to switch between localhost and AWS environments. For instance, you can select the **`demo-compile-java8`** profile to build a JAR file for AWS deployment. 

### AWS URLs
The same API endpoints are available on the AWS-hosted version of the application. The base URL for AWS is:  
`http://bankingapplication-env-1.eba-pra3wmvz.us-east-2.elasticbeanstalk.com/`

## Technology Stack

- **Backend**: Java, Spring Boot
- **Frontend**: ReactJS
- **Database**: H2 (for local testing) / AWS RDS (for production)
- **Deployment**: AWS Elastic Beanstalk, Maven

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

The application uses **GitHub Copilot** for code suggestions and rapid development assistance.

---

### For further questions or issues, feel free to open an issue on the GitHub repository!