/**
 * Validation function.
 *
 * This function is used to validate user data. It checks if the user's fullname, email, password, and confirm password fields are not empty and match the required patterns.
 *
 * The function uses two regular expressions to validate the email and password. The email pattern checks if the email is in the correct format. The password pattern checks if the password is between 8 and 12 characters long and contains only alphanumeric characters and special characters.
 *
 * If a field is empty or does not match the required pattern, an error message is added to the `error` object for that field.
 *
 * The function returns the `error` object, which contains any error messages for the fields.
 *
 * @param {Object} data - An object containing the user's fullname, email, password, and confirm password.
 * @returns {Object} An object containing any error messages for the fields.
 *
 * @example
 * const data = {
 *   fullname: 'John Doe',
 *   email: 'john.doe@example.com',
 *   password: 'password123',
 *   confirmpassword: 'password123'
 * };
 * const errors = validation(data);
 */

export default function validation(data){
    const error ={}

    const emailPattern= /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordPattern= /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g;

    if(data.fullname === ""){
        error.fullname="* Name is Required!"
    }

    if(data.email === ""){
        error.email ="* Email is Required"
    }
    else if(!emailPattern.test(data.email)){
        error.email="* Email did not match"
    }



    if(data.password === ""){
        error.password = "* Password is Required"
    }
    else if(!passwordPattern.test(data.password)){
        error.password="* Password not valid"
    }
    

    if(data.confirmpassword === ""){
        error.confirmpassword="* Confirm password is Required"
    }
    else if(data.password !== data.confirmpassword){
        error.confirmpassword ="* Confirm password did'nt match"
    }

    return error
}