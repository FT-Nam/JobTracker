package com.jobtracker.jobtracker_app.serivce;

import com.jobtracker.jobtracker_app.dto.request.AuthenticationRequest;
import com.jobtracker.jobtracker_app.dto.request.LogoutRequest;
import com.jobtracker.jobtracker_app.dto.request.RefreshRequest;
import com.jobtracker.jobtracker_app.dto.response.AuthenticationResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthService {
    AuthenticationResponse login(AuthenticationRequest request) throws JOSEException;

    AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;

    void logout(LogoutRequest request) throws ParseException, JOSEException;
}
