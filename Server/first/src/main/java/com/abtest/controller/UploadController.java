package com.abtest.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@RestController
@Log4j2
public class UploadController {

    @Value("${part4.upload.path}")
    private String uploadPath;
    //@Value를 import할 때 springframework.beans.factory.annotation.Value;를 선택

    @PostMapping("/upload")
    public void uploadFile(MultipartFile[] uploadFiles) {



        //브라우저에 따라 업로드하는 파일의 일므은 전체경로일 수 있고, 단순히 파일의 이름만을 의미할 수도 있음
        //BLOB 형식이 아닌 상대 경로로 받을 거기 때문에
        for (MultipartFile files : uploadFiles) {
            //서버에 쉘 스크립트 파일 등으로 공격할 수도 있기 때문에 파일 확장자를 검사한다.
            if (files.getContentType().startsWith("image") == false) {
                log.warn(("this file is not image type"));
                return;
            }


            String originalName = files.getOriginalFilename();
            String fileName = originalName.substring(originalName.lastIndexOf("//") + 1);

            log.info("fileName" + fileName);

            String folderPath = makeFolder();

            String uuid = UUID.randomUUID().toString();

            String saveName = uploadPath + File.separator + folderPath + File.separator + uuid;

            Path savePath = Paths.get(saveName);

            try {
                files.transferTo(savePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    private String makeFolder() {
        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/mm/dd"));
        String folderPath = str.replace("/", File.separator);

        File uploadPathFolder = new File(uploadPath, folderPath);

        if(uploadPathFolder.exists() == false) {
            uploadPathFolder.mkdirs();
        }

        return folderPath;
    }
}

