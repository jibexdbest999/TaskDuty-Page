import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RotateLoader } from "react-spinners";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { signupUsers } from "../../api/authApi";

const signUpUser= {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export default function SignUpPage() {
    const navigate = useNavigate()

    const [ userSignUp, setUserSignUp ] = useState(signUpUser)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errors, setErrors ] = useState({})
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)
    const toggleShowPassword = ()=> { setShowPassword(!showPassword) }
    const toggleShowConfirmPassword = ()=> { setShowConfirmPassword(!showConfirmPassword) }
    const [ submitError, setSubmitError ] = useState("") 

    const [pageIsLoading, setPageIsLoading] = useState(true);
    
        useEffect(() => {
            const timer = setTimeout(() => setPageIsLoading(false), 2000);
            return () => clearTimeout(timer);
          }, []);

    const handleChange = (e) => {
        setUserSignUp({...userSignUp, [e.target.name] : e.target.value})
    } 

    const formValidation = ()=> {
        const { firstName, lastName, username, email, password, confirmPassword } = userSignUp
        const newErrors = {}
        const emailRegex =  /^\S+@\S+\.\S+$/

        if (!firstName) {
            newErrors.firstName = "First name is required"
        }
        if (!lastName) {
            newErrors.lastName = "Last name is required"
        }
        if (!username.trim()) {
            newErrors.username = "Username is required"
        }
        if (!email.trim()) {
            newErrors.email = "Email is required"
        } else if (!emailRegex.test(email)) {
            newErrors.email= "Invalid Email, please provide a valid email address"
        }
        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 8) {
            newErrors.password = "Password must be 8 or more characters"
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required"
        }
        if (confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords doesn't match!"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formValidation()) return;

  try {
    setIsLoading(true);
    setSubmitError("");

    await signupUsers(userSignUp);

    toast.success("Signup successful");

    navigate("/login");
  } catch (error) {
    setSubmitError(
      error.response?.data?.message || "Signup failed"
    );

    toast.error(
      error.response?.data?.message || "Signup failed"
    );
  } finally {
    setIsLoading(false);
  }
};

    if (pageIsLoading)
    return (
      <div className="flex flex-col mx-auto items-center justify-center h-screen">
        <HashLoader color="#974FD0" size={55} />
        <p className="text-[18px] lg:text-[30px] pt-2 font-semibold text-[#974FD0]">
          Loading...
        </p>
      </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="border-[#974FD0] border-t-4 border-b-4 border-l border-r rounded-md w-full max-w-md p-6 relative my-5">
                <h1 className="font-semibold text-center text-[30px] mb-5">Sign Up</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {submitError && <p className="text-red-600 font-semibold">{submitError}</p>}
                    <div className="relative w-full">
                        <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 py-1.5">
                            <legend className="text-gray-500 text-[15px] px-1">
                                First Name
                            </legend>
                            <input
                                onChange={handleChange}
                                type="text"
                                value={userSignUp.firstName}
                                name="firstName"
                                placeholder="John"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </fieldset>
                        {errors.firstName && <p className="text-red-600 font-semibold">{errors.firstName}</p>}
                    </div>

                    <div className="relative w-full">
                        <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 py-1.5">
                            <legend className="text-gray-500 text-[15px] px-1">
                                Last Name
                            </legend>
                            <input
                                onChange={handleChange}
                                type="text"
                                value={userSignUp.lastName}
                                name="lastName"
                                placeholder="Doe"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </fieldset>
                        {errors.lastName && <p className="text-red-600 font-semibold">{errors.lastName}</p>}
                    </div>

                    <div className="relative w-full">
                        <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 py-1.5">
                            <legend className="text-gray-500 text-[15px] px-1">
                                Username
                            </legend>
                            <input
                                onChange={handleChange}
                                type="text"
                                value={userSignUp.username}
                                name="username"
                                placeholder="johndoe1234"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </fieldset>
                        {errors.username && <p className="text-red-600 font-semibold">{errors.username}</p>}
                    </div>

                    <div className="relative w-full">
                        <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 py-1.5">
                            <legend className="text-gray-500 text-[15px] px-1">
                                Email Address
                            </legend>
                            <input
                                onChange={handleChange}
                                type="email"
                                value={userSignUp.email}
                                name="email"
                                placeholder="john.doe@example.com"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </fieldset>
                        { errors.email && <p className="text-red-600 font-semibold">{errors.email}</p> }
                    </div>

                    <div className="relative w-full">
                        <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 py-1.5">
                            <legend className="text-gray-500 text-[15px] px-1">
                                Password
                            </legend>
                            <input
                                onChange={handleChange}
                                type={ showPassword ? "text" : "password"}
                                value={userSignUp.password}
                                name="password"
                                placeholder="***************"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </fieldset>
                        <button type="button" onClick={toggleShowPassword} className="absolute top-1/2 right-3 text-gray-500 cursor-pointer">{ showPassword ? <FaRegEye /> :  <FaRegEyeSlash />  }</button>
                    </div>
                    { errors.password && <p className="text-red-600 font-semibold">{errors.password}</p> }

                    <div className="relative w-full">
                        <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 py-1.5">
                            <legend className="text-gray-500 text-[15px] px-1">
                                Confirm Password
                            </legend>
                            <input
                                onChange={handleChange}
                                type={ showConfirmPassword ? "text" : "password"}
                                value={userSignUp.confirmPassword}
                                name="confirmPassword"
                                placeholder="***************"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </fieldset>
                        <button type="button" onClick={toggleShowConfirmPassword} className="absolute top-1/2 right-3 text-gray-500 cursor-pointer">{ showConfirmPassword ? <FaRegEye /> :  <FaRegEyeSlash />  }</button>
                        <button className="absolute top-1/2 right-3 text-gray-500 cursor-pointer"></button>
                    </div>
                    { errors.confirmPassword && <p className="text-red-600 font-semibold">{errors.confirmPassword}</p> }

                    <button
                        type="submit"
                        className="w-full bg-[#974FD0] hover:bg-[#44037a] rounded-md cursor-pointer font-medium py-2.5 text-[#FAF9FB]">
                        { isLoading ? <RotateLoader color="#aa7bf6" margin={-15} size={8} speedMultiplier={1} /> : "Sign up" }
                    </button>
                </form>
                <p className="py-2 text-center">Already have an account? <Link to="/login" className="text-[#974FD0] underline hover:text-[#44037a] font-medium ml-1 ">Login here</Link></p>
                <Link to="/" className="absolute top-2 right-2 text-[#974FD0] hover:text-[#44037a]"><IoClose size={30}/></Link>
            </div>
        </div>
    )
}