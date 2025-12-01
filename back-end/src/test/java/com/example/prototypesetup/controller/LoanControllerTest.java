package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.*;
import com.example.prototypesetup.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LoanController.class)
public class LoanControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean private LoanRepository loanRepository;
    @MockBean private AppUserRepository appUserRepository;
    @MockBean private BinRepository binRepository;
    @MockBean private LoanStatusRepository loanStatusRepository;
    @MockBean private DeviceConditionRepository deviceConditionRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Loan testLoan;
    private AppUser citizen;
    private AppUser employee;
    private Bin bin;
    private LoanStatus status;
    private DeviceCondition condition;

    @BeforeEach
    public void setup() {
        citizen = new AppUser();
        citizen.setUserId(101L);

        employee = new AppUser();
        employee.setUserId(3L);

        bin = new Bin();
        bin.setBinId(22);

        status = new LoanStatus();
        status.setLoanStatusId(1);
        status.setLoanStatusName("Checked Out");

        condition = new DeviceCondition();
        condition.setDeviceConditionId(2);
        condition.setDeviceConditionName("Good");

        testLoan = new Loan();
        testLoan.setLoanId(1);
        testLoan.setBin(bin);
        testLoan.setLoanStatus(status);
        testLoan.setCitizen(citizen);
        testLoan.setEmployee(employee);
        testLoan.setLoanCondition(condition);
        testLoan.setStartAt(new Timestamp(System.currentTimeMillis()));
        testLoan.setDueAt(Timestamp.valueOf(LocalDate.now().plusDays(7).atStartOfDay()));
    }

    
    @Test
    void testGetAllLoans() throws Exception {
        Mockito.when(loanRepository.findAll()).thenReturn(Arrays.asList(testLoan));

        mockMvc.perform(get("/api/loans"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].loan_id").value(1))
                .andExpect(jsonPath("$.message").value("Loans retrieved successfully"));
    }

    
    @Test
    void testGetLoanById() throws Exception {
        Mockito.when(loanRepository.findById(1)).thenReturn(Optional.of(testLoan));

        mockMvc.perform(get("/api/loans/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.loan_id").value(1))
                .andExpect(jsonPath("$.message").value("Loan retrieved successfully"));
    }

   
    @Test
    void testCreateLoan() throws Exception {
        LoanController.CreateLoanRequest request = new LoanController.CreateLoanRequest();
        request.setBinId(22);
        request.setLoanStatusId(1);
        request.setCitizenId(101L);
        request.setEmployeeId(3L);
        request.setDueAt(LocalDate.now().plusDays(7));
        request.setLoanConditionId(2);

        Mockito.when(binRepository.findById(22)).thenReturn(Optional.of(bin));
        Mockito.when(loanStatusRepository.findById(1)).thenReturn(Optional.of(status));
        Mockito.when(appUserRepository.findById(101L)).thenReturn(Optional.of(citizen));
        Mockito.when(appUserRepository.findById(3L)).thenReturn(Optional.of(employee));
        Mockito.when(deviceConditionRepository.findById(2)).thenReturn(Optional.of(condition));
        Mockito.when(loanRepository.save(any(Loan.class))).thenReturn(testLoan);

        mockMvc.perform(post("/api/loans")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Loan created successfully"))
                .andExpect(jsonPath("$.data.loan_id").value(1));
    }

    
    @Test
    void testDeleteLoan() throws Exception {
        Mockito.when(loanRepository.existsById(1)).thenReturn(true);

        mockMvc.perform(delete("/api/loans/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Loan deleted successfully"));
    }


  @Test
void testUpdateLoan() throws Exception {
    // Mock existing loan
    when(loanRepository.findById(1)).thenReturn(Optional.of(testLoan));
    when(loanRepository.save(any(Loan.class))).thenReturn(testLoan);

    // Mock loan status
    LoanStatus newStatus = new LoanStatus();
    newStatus.setLoanStatusId(2);
    newStatus.setLoanStatusName("Returned");
    when(loanStatusRepository.findById(2)).thenReturn(Optional.of(newStatus));

    // Mock return condition
    DeviceCondition returnCondition = new DeviceCondition();
    returnCondition.setDeviceConditionId(3);
    returnCondition.setDeviceConditionName("Good");
    when(deviceConditionRepository.findById(3)).thenReturn(Optional.of(returnCondition));

    LoanController.UpdateLoanRequest request = new LoanController.UpdateLoanRequest();
    request.setLoanStatusId(2);
    request.setReturnedAt(LocalDate.of(2025, 9, 21));
    request.setReturnCondition(3);
    request.setReturnConditionNotes("All looks good");
    request.setDamageFee(new BigDecimal("0.00"));
    request.setAllAccessoriesReturned(true);
    request.setMissingAccessories(null);
    request.setNotes("Returned in good condition");

    mockMvc.perform(patch("/api/loans/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Loan updated successfully"));
}

@Test
void testReplaceLoan() throws Exception {
    // Mock existing loan
    when(loanRepository.findById(1)).thenReturn(Optional.of(testLoan));
    when(loanRepository.save(any(Loan.class))).thenReturn(testLoan);

    // Mock Bin
    Bin bin = new Bin();
    bin.setBinId(22);
    when(binRepository.findById(22)).thenReturn(Optional.of(bin));

    // Mock Loan Status
    LoanStatus status = new LoanStatus();
    status.setLoanStatusId(1);
    status.setLoanStatusName("Active");
    when(loanStatusRepository.findById(1)).thenReturn(Optional.of(status));

    // Mock Citizen and Employee
    AppUser citizen = new AppUser();
    citizen.setUserId(101L);
    when(appUserRepository.findById(101L)).thenReturn(Optional.of(citizen));

    AppUser employee = new AppUser();
    employee.setUserId(3L);
    when(appUserRepository.findById(3L)).thenReturn(Optional.of(employee));

    // Mock Loan Condition
    DeviceCondition loanCondition = new DeviceCondition();
    loanCondition.setDeviceConditionId(2);
    loanCondition.setDeviceConditionName("Good");
    when(deviceConditionRepository.findById(2)).thenReturn(Optional.of(loanCondition));

    // Mock Return Condition
    DeviceCondition returnCondition = new DeviceCondition();
    returnCondition.setDeviceConditionId(3);
    returnCondition.setDeviceConditionName("Good");
    when(deviceConditionRepository.findById(3)).thenReturn(Optional.of(returnCondition));

    // Build ReplaceLoanRequest
    LoanController.ReplaceLoanRequest request = new LoanController.ReplaceLoanRequest();
    request.setBinId(22);
    request.setLoanStatusId(1);
    request.setCitizenId(101L);
    request.setEmployeeId(3L);
    request.setStartAt(LocalDate.of(2025, 9, 14));
    request.setDueAt(LocalDate.of(2025, 9, 21));
    request.setLoanConditionId(2);
    request.setLoanConditionNotes("Updated details here");
    request.setReturnConditionId(3);
    request.setReturnConditionNotes("Looks fine");
    request.setDamageFee(new BigDecimal("0"));
    request.setAllAccessoriesReturned(true);
    request.setMissingAccessories("");
    request.setNotes("Replace test");

    // Perform PUT request
    mockMvc.perform(put("/api/loans/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Loan replaced successfully"));
}

}
