package com.COOL.userapi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.COOL.userapi.User;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UserApiApplication {

	@Bean
	CommandLineRunner run(UserRepository repo) {
		return args -> {
			User u = new User("1", "John Doe", "john@example.com", "hashedpassword", "admin");
			repo.save(u);
			System.out.println("User saved!");
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(UserApiApplication.class, args);



	}

}