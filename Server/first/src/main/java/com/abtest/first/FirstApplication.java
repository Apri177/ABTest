package com.abtest.first;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class FirstApplication {

	public static void main(String[] args) {
		Path path = Paths.get("파일 경로");

		System.out.println("전체 경로:" + path.getFileName());

		System.out.println("파일명 : " + path.getParent().getFileName());

		System.out.println("부모 확인 : " + path.getParent().getFileName());

		System.out.println("루트 확인 : " + path.getRoot());

		System.out.println("경로 단계 수 : " + path.getNameCount());

		for(int i = 0; i < path.getNameCount(); i++) {
			System.out.println((i+1) + "단계 " + path.getName(i));
		}
	}
}
