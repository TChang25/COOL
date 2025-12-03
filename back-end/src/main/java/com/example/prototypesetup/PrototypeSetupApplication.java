package com.example.prototypesetup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.example.prototypesetup.config.RsaKeyProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class PrototypeSetupApplication {
    public static void main(String[] args) {
        SpringApplication.run(PrototypeSetupApplication.class, args);
    }
}
