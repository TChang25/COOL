package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.UserRole;
import com.example.prototypesetup.repository.UserRoleRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;



@ExtendWith(MockitoExtension.class)
public class UserRoleControllerTest {
 @Mock
 private UserRoleRepository roleRepository;
 
 @InjectMocks
 private UserRoleController testController;

 private UserRole testRole;

 @BeforeEach
 void setUp (){
    MockitoAnnotations.openMocks(this);

    testRole = UserRole.builder()
                .roleId(1L)
                .roleName("Test Role")
                .dlRequired(true)
                .isActive(true)
                .build(); 
 }


//Get All Roles:--------------------------------------------------------------------------------------------
 @Test
 void testGetAllRoles() {
    when(roleRepository.findAll()).thenReturn(Arrays.asList(testRole));

    List<UserRole> result = testController.getAllRoles();


    assertEquals(1, result.size());
    assertEquals("Test Role", result.get(0).getRoleName());
    verify(roleRepository, times(1)).findAll();
 }

 //Get Role by ID:---------------------------------------------------------------------------
 @Test
 void testGetRoleByID() {
    when(roleRepository.findById(1L)).thenReturn(Optional.of(testRole));

    ResponseEntity<UserRole> response = testController.getRoleById(1L);

    assertEquals(200, response.getStatusCode().value());
    assertEquals("Test Role", response.getBody().getRoleName());

 }

 //Create Role ------------------------------------------------------------------

 @Test
 void testCreateRole() {
    UserRole newRole = UserRole.builder()
                        .roleName("Create Role Test")
                        .dlRequired(false)
                        .isActive(true)
                        .build();


    when(roleRepository.save(newRole)).thenReturn(
        UserRole.builder().roleName("Create Role Test").dlRequired(false).isActive(true).build()
    );

    ResponseEntity<UserRole> response = testController.createRole(newRole);

    assertEquals(201,response.getStatusCode().value());
    assertEquals("Create Role Test",response.getBody().getRoleName());
    verify(roleRepository,times(1)).save(newRole);
 }



//Update Role --------------------------------------------------------------------------------------------------------

@Test
void testUpdateRole(){

UserRole updatedRole = new UserRole(1L,"UpdatedRole", false, true);

when(roleRepository.findById(1L)).thenReturn(Optional.of(testRole));
when(roleRepository.save(any(UserRole.class))).thenReturn(updatedRole);

ResponseEntity<UserRole> response = testController.updateRole(1L, updatedRole);

assertEquals(HttpStatus.OK, response.getStatusCode());
assertEquals("UpdatedRole", response.getBody().getRoleName());


}

//Delete Role---------------------------------------------------------------------------------------------------------

@Test
void testDeleteRole() {
    when(roleRepository.existsById(1L)).thenReturn(true);

    ResponseEntity<Void> response = testController.deleteRole(1L);

    assertEquals(204, response.getStatusCode().value());
    verify(roleRepository, times(1)).deleteById(1L);
}


}
