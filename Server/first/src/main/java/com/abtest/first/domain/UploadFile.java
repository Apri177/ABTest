package com.abtest.first.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UploadFile {
    private String uploadFilename;  // Original file name
    private String storeFilename;   // Server file name

    private String path; // File Path
}
