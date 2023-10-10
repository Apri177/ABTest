import axios from "axios";

export const apiTest = 
async() => {
    const res = await axios.get(
        `/api/test`
    )
    .then((res) => {
        console.log(res, "성공");
    })
    .catch((err) => {
        console.log(err, "에러");
    })
    return res
}


export const getProjects = 
async() => {
    const res = await axios.get(
        `/api/project/all`
    )

    console.log(res.data[0]);
    return res.data[0]
}

export const createProject = 
async() => {
    const res = await axios.post(
        `/api/project/create`,
        {
            "adminCode" : "qwer",
            "name" : "Second project",
            "content" : "두 번쨰 프로젝트임",
        }
    )
    .then((res) => {
        console.log("성공", res);
    })
    .catch((err) => {
        console.log(err, "실패");
    })
    
}


export const patchProject = 
async () => {
    
}

export const deleteProject = 
async () => {

}