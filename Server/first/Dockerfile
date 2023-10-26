FROM openjdk:20
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} first-0.0.1-SNAPSHOT
LABEL authors="seojuyeong"

ENTRYPOINT ["java", "-jar", "/first-0.0.1-SNAPSHOT.jar"]