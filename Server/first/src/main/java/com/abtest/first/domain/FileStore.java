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

    public UploadFile storeFile(MultipartFile multipartFile, String testName) throws IOException {

        if(multipartFile.isEmpty()) {
            return null;
        }

        File dir = new File(rootPath, testName);
        if (!dir.exists()) {
            dir.mkdir();
        }
        String dirPath = dir.getPath();

        String originalFilename = multipartFile.getOriginalFilename();
        System.out.println(getFullPath(dirPath ,originalFilename));

        //zip 파일 처리 필요
        if (extractExt(originalFilename).equals("zip")) {
            multipartFile.transferTo(new File(getFullPath(dirPath, originalFilename)));

            File file = new File(getFullPath(dirPath, originalFilename));
            ZipFile zipFile = new ZipFile(file);

            // zip 압축 해제 후 zip 파일 삭제
            zipFile.extractAll(rootPath);
            FileUtil.remove(file);

            // 압축 해제한 폴더에서 파일들을 꺼내는 코드
            File fileDir = new File(getFullPath(dirPath,extractName(originalFilename)));

            // 폴더 지정 후 하나하나 꺼내기
            File[] files = fileDir.listFiles();

            for (File tmp : files) {
                MultipartFile Mfile = FileUtil.Mconvert(tmp);
                storeFile(Mfile, testName);
            }

            FileUtil.remove(fileDir); // 파일을 다 꺼낸 후 폴더는 삭제

            return null;
        }

        String storeFilename = UUID.randomUUID() + "." + extractExt(originalFilename);
        System.out.println(storeFilename);

//        multipartFile.transferTo(new File(getFullPath(storeFilename)));

        return new UploadFile(originalFilename, storeFilename);
    }

//    public List<UploadFile> storeFiles(List<MultipartFile> multipartFiles) throws IOException {
//        List<UploadFile> storeFileResult = new ArrayList<>();
//        for (MultipartFile multipartFile : multipartFiles) {
//            if(!multipartFile.isEmpty()) {
//                storeFileResult.add(storeFile(multipartFile));
//            }
//        }
//        return storeFileResult;
//    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    private String extractName(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(0, pos);
    }

}
