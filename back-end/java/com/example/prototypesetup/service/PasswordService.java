package com.example.prototypesetup.service;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    /*
        Argon2 parameters explained:
        saltLength: Length of the random salt (in bytes) added to each password
        hashLength: Length of the resulting hash (in bytes)
        parallelism: Number of threads and computational lanes (higher = more CPU usage)
        memory: Amount of memory (in KB) used during hashing (higher = more secure, more resource usage)
        iterations: Number of times the hashing algorithm is run (higher = slower, more secure)
    */
    private static final int SALT_LENGTH_BYTES = 16;      // Recommended: 16 bytes
    private static final int HASH_LENGTH_BYTES = 32;      // Recommended: 32 bytes
    private static final int PARALLELISM = 1;             // Usually 1 for web apps
    private static final int MEMORY_COST_KB = 4096;       // 4 MB, adjust to preference
    private static final int ITERATIONS = 3;              // Minimum recommended is 3

    private final Argon2PasswordEncoder passwordEncoder;

    public PasswordService() {
        this.passwordEncoder = new Argon2PasswordEncoder(SALT_LENGTH_BYTES,HASH_LENGTH_BYTES,PARALLELISM,MEMORY_COST_KB,ITERATIONS);
    }

    public String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }
}
