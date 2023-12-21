import { CLEAR_ALERT, GET_IMAGES_BEGIN, GET_IMAGES_ERROR, GET_IMAGES_SUCCESS, GET_IMAGE_BEGIN, GET_IMAGE_ERROR, GET_IMAGE_SUCCESS, UPLOAD_IMAGE_BEGIN, UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_SUCCESS } from "./action.js";

const reducer = (state, action) => {
    if(action.type === CLEAR_ALERT){
        return{
            ...state,
            showAlert: false,
            alertText: '',
            alertType: ''
        }
    }
    if(action.type === UPLOAD_IMAGE_BEGIN){
        return{
            ...state,
            isLoading: true
        }
    }
    if(action.type === UPLOAD_IMAGE_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'success',
            images: [...state.images, action.payload.image]
        }
    }
    if(action.type === UPLOAD_IMAGE_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === GET_IMAGES_BEGIN){
        return{
            ...state,
            imagesLoading: true
        }
    }
    if(action.type === GET_IMAGES_SUCCESS){
        return{
            ...state,
            imagesLoading: false,
            images: action.payload.images
        }
    }
    if(action.type === GET_IMAGES_ERROR){
        return{
            ...state,
            imagesLoading: false,
            imagesError: true,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === GET_IMAGE_BEGIN){
        return{
            ...state,
            imageLoading: true
        }
    }
    if(action.type === GET_IMAGE_SUCCESS){
        return{
            ...state,
            imagesLoading: false,
            image: action.payload.image
        }
    }
    if(action.type === GET_IMAGE_ERROR){
        return{
            ...state,
            imagesLoading: false,
            imagesError: true,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    throw new Error(`No such action: ${action.type}`)
}

export default reducer