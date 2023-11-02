FROM openjdk:17-oracle

RUN     microdnf install findutils

RUN mkdir /usr/app
COPY ./src /usr/app/src
COPY ./gradle /usr/app/gradle
COPY ./build.gradle /usr/app
COPY ./gradlew	/usr/app
COPY ./settings.gradle	/usr/app

WORKDIR /usr/app
RUN chmod +x gradlew
RUN ./gradlew clean build

RUN mv /usr/app/*.jar /usr/app/app.jar

ENTRYPOINT ["java", "-jar", "/usr/app/app.jar", "--server.port=17047"]