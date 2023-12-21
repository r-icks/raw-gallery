import { useReducer, useContext } from "react";
import React from "react";
import reducer from "./reducer";
import {
    CLEAR_ALERT, GET_IMAGES_BEGIN, GET_IMAGES_ERROR, GET_IMAGES_SUCCESS, GET_IMAGE_BEGIN, GET_IMAGE_ERROR, GET_IMAGE_SUCCESS, UPLOAD_IMAGE_BEGIN, UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_SUCCESS
} from "./action";

import axios from "axios"

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    images: null,
    imagesLoading: false,
    imagesError: false,
    image: null
}

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const getImages = async () => {
        dispatch({type: GET_IMAGES_BEGIN})
        try{
            const {data} = await axios.get('/api/v1/image');
            const {images} = data;
            dispatch({type:GET_IMAGES_SUCCESS, payload:{images}})
        }
        catch(err){
            dispatch({type: GET_IMAGES_ERROR, payload:{msg:err.response.data.msg}})
        }
    }

    const uploadImage = async ({file}) => {
        dispatch({type: UPLOAD_IMAGE_BEGIN})
        try{
            const formData = new FormData();
            formData.append('file',file);
            const {data} = await axios.post('/api/v1/image', formData, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            const {msg, image} = data
            dispatch({type: UPLOAD_IMAGE_SUCCESS, payload:{msg,image}})
        }catch(err){
            dispatch({type : UPLOAD_IMAGE_ERROR, payload:{msg: err.response.data.msg}})
        }
        clearAlert();
    }

    const getImageData = async (_id) =>{
        dispatch({type: GET_IMAGE_BEGIN});
        try{
            const {data} = await axios.get(`/api/v1/image/${_id}`);
            const {image} = data;
            dispatch({type: GET_IMAGE_SUCCESS, payload:{image}})
        }
        catch(err){
            dispatch({type: GET_IMAGE_ERROR, payload:{msg:err.response.data.msg}})
        }
    }
 
    return (
        <AppContext.Provider value={{
            ...state,
            uploadImage,
            getImages,
            getImageData
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return (useContext(AppContext));
}