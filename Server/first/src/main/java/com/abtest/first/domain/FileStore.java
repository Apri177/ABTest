package com.abtest.first.domain;


import net.lingala.zip4j.ZipFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FileStore {

    // 루트 경로 + 본인 경로 설정 필요
    private final String rootPath = "/Users/seojuyeong/Pictures/";

    public String getFullPath(String path,String filename) {
        return path + filename;
    }

    public UploadFile storeFile(MultipartFile multipartFile, String testName) throws IOException, NullPointerException {

        if(multipartFile.isEmpty()) {
            return null;
        }

        File dir = new File(rootPath + testName);
        if (!dir.exists()) {
            dir.mkdir();
        }

        String dirPath = dir.getPath() + '/';

        String originalFilename = multipartFile.getOriginalFilename();

        multipartFile.transferTo(new File(getFullPath(dirPath, originalFilename)));

        if (extractExt(originalFilename).equals("zip")) {

            File file = new File(getFullPath(dirPath, originalFilename));
            ZipFile zipFile = new ZipFile(file);

            String folderName = zipFile.getFile().getName();
            System.out.println(folderName);

            // zip 압축 해제 후 zip 파일 삭제
            zipFile.extractAll(dirPath);
            FileUtil.remove(file);

            // 압축 해제한 폴더에서 파일들을 꺼내는 코드
            File fileDir = new File(getFullPath(dirPath,extractName(originalFilename)));

            // 폴더 지정 후 하나하나 꺼내기
            File[] files = fileDir.listFiles();

            if (files != null) {
                for (File tmp : files) {
                    MultipartFile Mfile = FileUtil.Mconvert(tmp);
                    storeFile(Mfile, testName);
                }
            }

            String storeFilename = UUID.randomUUID() + "." + extractExt(originalFilename);
            return new UploadFile(originalFilename, storeFilename, dirPath + folderName + "/");
        }

        String storeFilename = UUID.randomUUID() + "." + extractExt(originalFilename);
        return new UploadFile(originalFilename, storeFilename, dirPath);
    }


    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    private String extractName(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(0, pos);
    }

}
