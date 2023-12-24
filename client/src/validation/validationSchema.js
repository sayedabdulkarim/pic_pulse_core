import * as yup from "yup";
// const webRegex = (/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/);
const webRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(webRegex, "Invalid Email!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
  // BrandName: yup.string().required("Brand Name is required!"),
  // CompanyName: yup.string().required("Company Name  is required!"),
  // PhoneNumber: yup.string().matches(phoneRegex, "Invalid Phone Number").required("Phone Number is required!"),
  // email: yup.string().email('Invalid email').required("Email is required!"),
  // address: yup.string().required("Address is required!"),
});

export const signupSchema = yup.object({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .matches(webRegex, "Invalid Email!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
  // CompanyName: yup.string().required("Company Name  is required!"),
  // PhoneNumber: yup.string().matches(phoneRegex, "Invalid Phone Number").required("Phone Number is required!"),
  // email: yup.string().email('Invalid email').required("Email is required!"),
  // address: yup.string().required("Address is required!"),
});

export const createPostSchema = yup.object({
  title: yup.string().required("Title is required!"),
  description: yup.string().required("Description is required!"),
  // email: yup.string().matches(webRegex, "Invalid Email!").required("Email is required!"),
  // password: yup.string().required("Password is required!"),
  // CompanyName: yup.string().required("Company Name  is required!"),
  // PhoneNumber: yup.string().matches(phoneRegex, "Invalid Phone Number").required("Phone Number is required!"),
  // email: yup.string().email('Invalid email').required("Email is required!"),
  // address: yup.string().required("Address is required!"),
});
