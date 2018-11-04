package com.tlcn.programingforum.api.controller;

import com.tlcn.programingforum.api.AbstractBasedAPI;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.DemoModel;
import com.tlcn.programingforum.model.RestAPIResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author buiph on 9/27/2018
 */

@RestController
public class MainController extends AbstractBasedAPI {

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<RestAPIResponse> test(){
       // throw new ApplicationException(APIStatus.ERR_BAD_REQUEST);
        return responseUtil.successResponse(new DemoModel("123", "Cuong"));
    }
}
