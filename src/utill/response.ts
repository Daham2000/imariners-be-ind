import {ErrorResponse} from "../errors/errorResponce";
import {SystemError} from "../errors/systemError";

const ID_EXISTS = "ID already exist.";
const VALIDATION_FAILED = "Validation failed";
const INVALID_UID = "uid is not valid";

export const errorResponse = (error: any): ErrorResponse => {
    let errResponse: ErrorResponse;
    if (error.codePrefix === "auth") {
        errResponse = ErrorResponse.voidError(
            error.errorInfo.code,
            422,
            error.errorInfo.message
        );
    } else if (error instanceof SystemError) {
        errResponse = error.error;
    } else if (error.code === 11000) {
        errResponse = ErrorResponse.voidError(
            ID_EXISTS,
            409,
            error.toString()
        );
    } else if (error.message === VALIDATION_FAILED) {
        errResponse = ErrorResponse.voidError(
            error.message,
            422,
            error.toString()
        );
    } else if (error.kind === "ObjectId") {
        errResponse = ErrorResponse.voidError(
            INVALID_UID,
            422,
            error.reason.toString()
        );
    } else {
        console.log(error.message);
        errResponse = ErrorResponse.voidError("Error", 422, error.toString());
    }
    return errResponse;
};
