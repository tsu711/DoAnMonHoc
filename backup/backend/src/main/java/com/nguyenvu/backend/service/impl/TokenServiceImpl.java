




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Token;
import com.nguyenvu.backend.repository.TokenRepository;
import com.nguyenvu.backend.service.TokenService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class TokenServiceImpl implements TokenService {
    private TokenRepository tokenRepository;

    @Override
    public Token createToken(Token token) {
        return tokenRepository.save(token);
    }

    @Override
    public Token getTokenById(Long tokenId){
        Optional<Token> optionalToken = tokenRepository.findById(tokenId);
        return optionalToken.get();
    }

     @Override
    public List<Token> getAllTokens() {
        return tokenRepository.findAll();
    }
@Override
      public Token updateToken(Token Token){
        Token existingToken = tokenRepository.findById(Token.getId()).get();
        existingToken.setToken(Token.getToken());
        existingToken.setCreated_at(Token.getCreated_at());
        existingToken.setUser(Token.getUser());
        Token updateToken = tokenRepository.save(existingToken);
        return updateToken;
    }

    @Override
    public void deleteToken(Long tokenId){
        tokenRepository.deleteById(tokenId);
    }

}
