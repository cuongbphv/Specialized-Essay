package com.tlcn.programingforum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Huy Pham
 */

@Service
public class FileUploadServiceImpl implements FileUploadService {

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public String uploadFile(MultipartFile file, String fileName) {
        return fileStorageService.storeFile(file, fileName);
    }
}
