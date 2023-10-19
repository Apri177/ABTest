import axios, { AxiosHeaders } from "axios";

export const getTestById =
async(project_id, test_name) => {
    const res = await axios.get(
        `/api/project/${project_id}/test/${test_name}`,
    )
    return res
}

export const getTests =
async(project_id) => {
    const res = await axios.get(
        `/api/project/${project_id}/test/all`
    )
    return res
}

export const createTest =
async(project_id, data) => {
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

export const patchTest = 
async(project_id, test_name, data) => {
    const res = await axios.patch(
        `/api/project/${project_id}/test/${test_name}`,
        data,
        {
            headers: {
                "Content-Type" : "multipart/form-data",
            },
            transformRequest: [
                function () {
                    return data
                },
            ],
        }
    )
}

export const deleteTest =
async(project_id, test_name) => {
    await axios.delete(
        `/api/project/${project_id}/test/${test_name}`
    )
}

export const getTestsImage =
async(project_id, test_name, page) => {

    const res = await axios.get(
        `/api/project/${project_id}/test/${test_name}/play/${page}`
    )

    return res.data
}