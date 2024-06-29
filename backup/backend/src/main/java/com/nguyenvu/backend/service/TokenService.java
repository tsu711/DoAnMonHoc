package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Token;

import java.util.List;


public interface TokenService {
    Token createToken(Token token);
    Token getTokenById(Long tokenId);
    List<Token> getAllTokens();
    Token updateToken(Token token);
    void deleteToken(Long tokenId);

}