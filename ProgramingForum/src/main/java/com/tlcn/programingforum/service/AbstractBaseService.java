package com.tlcn.programingforum.service;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Huy Pham
 */
public abstract class AbstractBaseService {

    protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    protected final Gson gson = new Gson();

}
