
export const sendResponse = (res, statusCode, success, message, data = null, error = null) => {
    let response = {success, message};

    if(data){
       response = {...response, data};
    }
    if(error){
        response = {...response, error};
    }

    return res.status(statusCode).json(response);
}

export const uploadProfilePicture = (userID) => {

    
}

