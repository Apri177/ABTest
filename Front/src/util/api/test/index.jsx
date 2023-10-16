import axios, { AxiosHeaders } from "axios";

export const getTestById =
async(project_id, test_id) => {
    const res = await axios.get(
        `/api/project/${project_id}/test/${test_id}`,
    )
    return res
}

export const getTests =
async(project_id) => {
    const res = await axios.get(
        `/api/project/${project_id}/tests`
    )

    return res
}

export const createTest =
async(project_id, data) => {
    // file upload 위한 spring-boot의 라이브러리 및 bean 설정이 안되어 있었음
    for(let temp of data.keys()) {
        console.log(data.get(temp));
    }

    const res = await axios.post(

        

        `/api/project/${project_id}/test/create`,
        data,
        {
            headers : {
                "Content-Type" : "multipart/form-data",
            },
            transformRequest: [
                function () {
                  return data
                },
            ],
        }
    )
    return res
}