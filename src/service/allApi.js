import { BASE_URL } from "./baseUrl";
import { commonRequest } from "./commonRequest";

//api for add video
export const addVideo=async(body)=>{
   return await commonRequest("POST",`${BASE_URL}/videos`,body)
}


//api for get all videos
export const getAllVideos=async()=>{
    return await commonRequest("GET",`${BASE_URL}/videos`,"")
}

//add category
export const addCategory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/category`,body)
 }

//delete video
export const removeVideo=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

//api for get all categories
export const getAllCategory=async()=>{
    return await commonRequest("GET",`${BASE_URL}/category`,"")
}

//delete category
export const removeCategory=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/category/${id}`,{})
}

//get all histories
export const getAllHistory=async()=>{
   return await commonRequest("GET",`${BASE_URL}/histories`,{})
}

//api for add history
export const addHistory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/histories`,body)
 }

 //drag and drop
 //1.get single video
 export const getVideo=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/videos/${id}`,{})
 }

 //2.api to update category array
 export const updateCategory=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/category/${id}`,body)
 }


