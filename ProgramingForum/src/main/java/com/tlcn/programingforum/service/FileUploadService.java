package com.tlcn.programingforum.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * @author Huy Pham
 */


public interface FileUploadService{

    String uploadFile(MultipartFile file, String fileName);

}
