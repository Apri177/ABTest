package com.abtest.first.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UploadFile {
    private String uploadFilename;  // 업로드된 원래 파일 명
    private String storeFilename;   // 서버 내부에서 관리하는 파일명

    private String path; // 저장한 파일 경로
}
