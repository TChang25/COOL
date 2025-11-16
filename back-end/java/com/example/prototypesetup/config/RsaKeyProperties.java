package com.example.prototypesetup.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@ConfigurationProperties(prefix = "rsa")
public class RsaKeyProperties {
    
    private final RSAPublicKey publicKey;
    private final RSAPrivateKey privateKey;
    
    public RsaKeyProperties(RSAPublicKey publicKey, RSAPrivateKey privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
    
    public RSAPublicKey getPublicKey() {
        return publicKey;
    }
    
    public RSAPrivateKey getPrivateKey() {
        return privateKey;
    }
}
