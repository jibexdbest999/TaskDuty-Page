import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RotateLoader } from "react-spinners";
import { HashLoader } from "react-spinners";
import { loginUsers } from "../../api/authApi";
import { toast } from "react-hot-toast";


const loginUser = {
    identifier: "",
    password: "",
}

export default function LoginPage() {
    const navigate = useNavigate();

    const [ userLogin, setUserLogin ] = useState(loginUser);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ showPassword, setShowPassword ] = useState(false);
    const toggleShowPassword = () => { setShowPassword(!showPassword) };
    const [ submitError, setSubmitError ] = useState("");

    const [pageIsLoading, setPageIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setPageIsLoading(false), 2000);
        return () => clearTimeout(timer);
      }, []);

    const handleChange = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value});
    }

    const formValidation = () => {
        const { identifier, password } = userLogin;
        const newErrors = {};

        if (!identifier.trim()) {
            newErrors.identifier = "Email or username is required"
        }
        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 8) {
            newErrors.password = "Password must be 8 or more characters"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formValidation()) return;

  try {
    setIsLoading(true);
    setSubmitError("");

    const res = await loginUsers({
      identifier: userLogin.identifier,
      password: userLogin.password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    toast.success("Login successful");

    navigate("/");
  } catch (error) {
    setSubmitError(
      error.response?.data?.message || "Login failed"
    );

    toast.error(
      error.response?.data?.message || "Login failed"
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
        <div className="min-h-screen flex  items-center justify-center px-4">
            <div className="border-[#974FD0] border-t-4 border-b-4 border-l border-r rounded-md w-full max-w-md p-6 relative">

                <h1 className="font-semibold text-center text-[30px] mb-5">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      {submitError && <p className="text-red-600 font-semibold">{submitError}</p>}
                    <div className="relative w-full">
                        <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 py-1.5">
                            <legend className="text-gray-500 text-[15px] px-1">
                                Email or username
                            </legend>
                            <input
                                onChange={handleChange}
                                name="identifier"
                                type="text"
                                value={userLogin.identifier}
                                placeholder="johndoe0203"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </fieldset>
                        {errors.identifier && <p className="text-red-600 font-semibold">{errors.identifier}</p>}
                    </div>

                    <div className="relative w-full">
                        <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 py-1.5 ">
                            <legend className="text-gray-500 text-[15px] px-1">
                                Password
                            </legend>
                            <input 
                                onChange={handleChange}
                                type={ showPassword ? "text" : "password" }
                                name="password"
                                value={userLogin.password}
                                placeholder="***************"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </fieldset>
                        <button type="button" onClick={toggleShowPassword} className="absolute top-1/2 right-3 text-gray-500">{ showPassword ? <FaRegEye /> :  <FaRegEyeSlash />  }</button>
                    </div>
                     { errors.password && <p className="text-red-600 font-semibold mt-[-10px]">{errors.password }</p> }

                        <button
                        type="submit"
                        className="w-full bg-[#974FD0] hover:bg-[#44037a] rounded-md cursor-pointer font-medium py-2.5 text-[#FAF9FB]">
                        { isLoading ? <RotateLoader color="#aa7bf6" margin={-15} size={8} speedMultiplier={1} /> : "Login" }
                        </button>  
                </form>
                        <p className="py-2 text-center">Don't have an account yet? <Link to="/signup" className="text-[#974FD0] underline hover:text-[#44037a] font-medium ml-1">Signup here</Link></p>
                        <Link to="/" className="absolute top-2 right-2 text-[#974FD0] hover:text-[#44037a]"><IoClose size={30}/></Link>
            </div>
        </div>
    )
}