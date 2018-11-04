package com.tlcn.programingforum.auth;

import com.tlcn.programingforum.auth.service.CustomUserAuthService;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.util.Constant;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Huy Pham
 */
@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private final Log LOGGER = LogFactory.getLog(this.getClass());

    @Autowired
    private CustomUserAuthService userAuthService;

    /**
     * Do filter all request, if any request don't have token => though error
     *
     * @param request
     * @param response
     * @param chain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        String authToken = request.getHeader(Constant.HEADER_TOKEN);
        if (authToken != null) {
            try {
                // try to load session
                AuthUser user = userAuthService.loadUserByAccessToken(authToken);
                if (user != null) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (ApplicationException ex) {
                // token not found or expired
                LOGGER.debug("doFilterInternal", ex);
            }
        }
        chain.doFilter(request, response);
    }

}
