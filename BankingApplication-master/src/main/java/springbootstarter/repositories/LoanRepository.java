package springbootstarter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import springbootstarter.bankingObjects.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
}
