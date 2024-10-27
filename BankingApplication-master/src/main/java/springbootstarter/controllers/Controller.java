package springbootstarter.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springbootstarter.bankingObjects.Account;
import springbootstarter.bankingObjects.Loan;
import springbootstarter.bankingObjects.User;
import springbootstarter.exceptions.ResourceNotFoundException;
import springbootstarter.repositories.AccountRepository;
import springbootstarter.repositories.LoanRepository;
import springbootstarter.repositories.UserRepository;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private LoanRepository loanRepository;

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
 
    

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") final Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            return ResponseEntity.ok().body(user);
        }
        return null;
    }

    @PostMapping("/adduser")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<User> createUser(@RequestParam("name") String name) {
        User user = new User();
        user.setName(name);
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return (List<Account>) accountRepository.findAll();
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable(value = "id") final Long accountId) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not for for this id :: " + accountId));
        return ResponseEntity.ok().body(account);
    }

    @RequestMapping("/addaccount")
    public Account createAccount(@RequestParam("userId") long userId, @RequestParam("balance") Double balance) {
        List<Account> accounts = accountRepository.findAll();
        List<Account> userAccounts = accounts.stream().filter(account1 -> account1.getUserId() == userId).collect(Collectors.toList());
        if (userAccounts.size()>=3) {
            System.out.println("More than 3 accounts found for userID " + userId);
            return null;
        }
        Account account = new Account();
        account.setBalance(balance);
        account.setUserId(userId);
        return accountRepository.save(account);
    }

    

    @RequestMapping(value = "/depositmoney")
    public Account depositMoney(@RequestParam(value = "accountId") long accountId, @RequestParam("amount") double amount) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not for for this id :: " + accountId));
        double initialBalance = account.getBalance();
        account.setBalance(initialBalance+amount);
        return accountRepository.save(account);
    }

    @RequestMapping(value = "/withdrawmoney")
    public Account withdrawMoney(@RequestParam(value = "accountId") long accountId, @RequestParam("amount") double amount) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not for for this id :: " + accountId));
        double initialBalance = account.getBalance();
        if (amount > initialBalance) {
            System.out.println("Withdrawal amount exceeded");
            return null;
        }
        account.setBalance(initialBalance-amount);
        return accountRepository.save(account);
    }

    @RequestMapping("/addloan")
    public Loan getLoan(@RequestParam("userId") long userId, @RequestParam("sanctionAmount") Double sanctionAmount) {
        List<Account> accounts = accountRepository.findAll();
        List<Account> userAccounts = accounts.stream().filter(account1 -> account1.getUserId() == userId).collect(Collectors.toList());
        double totalBalance = 0;
        for (Account userAccount : userAccounts) {
            totalBalance += userAccount.getBalance();
        }
        if (2*sanctionAmount < totalBalance) {
            Loan loan = new Loan();
            loan.setSanctionAmount(sanctionAmount);
            loan.setUserId(userId);
            return loanRepository.save(loan);
        }
        System.out.println("Loan amount requested exceeds limit!");
        return null;
    }

    @GetMapping("/loans")
    public List<Loan> getAllLoans() {
        return (List<Loan>) loanRepository.findAll();
    }

   


}
