package com.tlcn.programingforum;

import com.tlcn.programingforum.auth.AuthEntryPointException;
import com.tlcn.programingforum.auth.AuthTokenFilter;
import com.tlcn.programingforum.auth.service.CustomUserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthEntryPointException unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationTokenFilterBean() throws Exception {
        return new AuthTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // we don't need CSRF because our token is invulnerable
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                // don't create session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                // Allow access public resource
                .antMatchers(
                        HttpMethod.GET,
                        "/",
                        "/upload/**",
                        "/*.html",
                        "/favicon.ico",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js",
                        "/**/*.png",
                        "/**/*.gif"
                ).permitAll()
                // allow CORS option calls
                .antMatchers(HttpMethod.OPTIONS, "/api/v1/**").permitAll()
                .antMatchers(
                        "/api/v1/auth/login",
                        "/files/**",
                        "/api/v1/auth/admin/login",
                        "/api/v1/user/signup",
                        "/api/v1/admin/test",
                        "/api/v1/auth/**").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/v1/article/{id}",
                        "/api/v1/article/view",
                        "/api/v1/article/stats",
                        "/api/v1/interact",
                        "/api/v1/profile",
                        "/api/v1/tag/most",
                        "/api/v1/comment/list",
                        "/api/v1/profile/{id}",
                        "/api/v1/author/top").permitAll()
                .antMatchers(HttpMethod.POST,
                        "/api/v1/article/list",
                        "/api/v1/article/related",
                        "/api/v1/article/same-author",
                        "/api/v1/article/trending").permitAll()
//                .antMatchers(HttpMethod.PUT
//                ).permitAll()
//                .antMatchers(HttpMethod.DELETE
//                ).permitAll()
                // All other request must be specify token
                .anyRequest().authenticated();

        // Custom JWT based security filter
        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

        // disable page caching
        http.headers().cacheControl();
    }

}