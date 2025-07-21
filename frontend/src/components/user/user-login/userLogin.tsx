// "use client"
// import React, { useState } from 'react';
// import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
// import MeleteLogo1 from '@/../../public/assets/logoWhite.png';
// interface FormData {
//   name?: string;
//   email: string;
//   password: string;
//   confirmPassword?: string;
//   mobile?: string;
// }

// interface LoginCardProps {
//   onSubmit?: (formData: FormData, isSignUp: boolean) => void;
//   className?: string;
// }

// const LoginCard: React.FC<LoginCardProps> = ({ onSubmit, className = '' }) => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     mobile: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = () => {
//     // Basic validation
//     if (isSignUp) {
//       if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//         alert('Please fill in all required fields');
//         return;
//       }
//       if (formData.password !== formData.confirmPassword) {
//         alert('Passwords do not match');
//         return;
//       }
//     } else {
//       if (!formData.email || !formData.password) {
//         alert('Please fill in all required fields');
//         return;
//       }
//     }

//     if (onSubmit) {
//       onSubmit(formData, isSignUp);
//     }
//     console.log('Form submitted:', formData);
//   };

//   const toggleMode = () => {
//     setIsSignUp(!isSignUp);
//     setFormData({
//       name: '',
//       email: '',
//       mobile: '',
//       password: '',
//       confirmPassword: ''
//     });
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//   };

//   return (
//     <div className={`flex justify-center items-center min-h-screen p-4 ${className}`}>
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
//         <div className="flex flex-col lg:flex-row">
//           {/* Left Panel */}
//           <div
//             className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center items-center text-white relative overflow-hidden"
//             style={{ backgroundColor: '#015F4A' }}
//           >
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full"></div>
//               <div className="absolute bottom-16 right-8 w-16 h-16 bg-white rounded-full"></div>
//               <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
//             </div>

//             <div className="z-10 text-center">
//               <div className="mb-6">
//                 {/* <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">

//                 </div> */}
//              <div className='ml-18'>
//                       <img
//                 src={MeleteLogo1.src}
//                 alt="Melete Mental Health Services Logo"
//                 className="h-12 w-auto transition-transform duration-300"

//               />
//              </div>

//               </div>

//               <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//                 {isSignUp ? 'Join Us Today!' : 'Welcome Back!'}
//               </h2>
//               <p className="text-base lg:text-lg opacity-90 mb-8 max-w-xs lg:max-w-md">
//                 {isSignUp
//                   ? 'Create your account and start your journey with us'
//                   : 'Sign in to continue to your account and explore amazing features'
//                 }
//               </p>

//               <button
//                 onClick={toggleMode}
//                 className="px-6 lg:px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-800 transition-colors duration-300"
//               >
//                 {isSignUp ? 'SIGN IN' : 'SIGN UP'}
//               </button>
//             </div>
//           </div>

//           {/* Right Panel */}
//           <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
//             <div className="max-w-sm mx-auto w-full">
//               <div className="text-center mb-6">
//                 <h2 className="text-xl lg:text-2xl font-bold mb-2" style={{ color: '#015F4A' }}>
//                   {isSignUp ? 'Create Account' : 'Sign In'}
//                 </h2>
//                 <p className="text-gray-600 text-sm lg:text-base">
//                   {isSignUp
//                     ? 'Fill in your details to get started'
//                     : 'Enter your credentials to access your account'
//                   }
//                 </p>
//               </div>

//               {/* Social Login Buttons */}
//               <div className="flex gap-2 mb-4">
//                 <button className="flex-1 flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                   <span className="text-blue-600 font-bold text-lg">f</span>
//                 </button>
//                 <button className="flex-1 flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                   <span className="text-red-500 font-bold text-lg">G+</span>
//                 </button>
//                 <button className="flex-1 flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                   <span className="text-blue-700 font-bold text-lg">in</span>
//                 </button>
//               </div>

//               <div className="text-center text-gray-500 mb-4 text-sm">
//                 or use your email for {isSignUp ? 'registration' : 'sign in'}
//               </div>

//               {/* Form Fields */}
//               <div className="space-y-3">
//                 {isSignUp && (
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Full Name"
//                       value={formData.name || ''}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                       required
//                     />
//                   </div>
//                 )}

//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                     required
//                   />
//                 </div>

//                 {isSignUp && (
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="tel"
//                       name="mobile"
//                       placeholder="Mobile Number"
//                       value={formData.mobile || ''}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                     />
//                   </div>
//                 )}

//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>

//                 {isSignUp && (
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       name="confirmPassword"
//                       placeholder="Confirm Password"
//                       value={formData.confirmPassword || ''}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>
//                 )}

//                 {!isSignUp && (
//                   <div className="text-right">
//                     <a href="#" className="text-sm hover:underline" style={{ color: '#015F4A' }}>
//                       Forgot Password?
//                     </a>
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
//                   style={{ backgroundColor: '#015F4A' }}
//                 >
//                   {isSignUp ? 'SIGN UP' : 'SIGN IN'}
//                 </button>
//               </div>

//               {/* Mobile Toggle for small screens */}
//               <div className="lg:hidden text-center mt-6">
//                 <p className="text-gray-600 text-sm">
//                   {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//                   <button
//                     onClick={toggleMode}
//                     className="ml-2 font-semibold hover:underline"
//                     style={{ color: '#015F4A' }}
//                   >
//                     {isSignUp ? 'Sign In' : 'Sign Up'}
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginCard;

// "use client"
// import React, { useState } from 'react';
// import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import MeleteLogo1 from '@/../../public/assets/logoWhite.png';
// import AuthService from '@/services/AuthService';

// interface FormData {
//   name?: string;
//   email: string;
//   password: string;
//   confirmPassword?: string;
//   mobile?: string;
// }

// interface LoginCardProps {
//   onSubmit?: (formData: FormData, isSignUp: boolean) => void;
//   className?: string;
// }

// const LoginCard: React.FC<LoginCardProps> = ({ onSubmit, className = '' }) => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     mobile: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async () => {
//     // Basic validation
//     if (isSignUp) {
//       if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//         alert('Please fill in all required fields');
//         return;
//       }
//       if (formData.password !== formData.confirmPassword) {
//         alert('Passwords do not match');
//         return;
//       }
//     } else {
//       if (!formData.email || !formData.password) {
//         alert('Please fill in all required fields');
//         return;
//       }
//     }

//     setIsLoading(true);
//     try {
//       // Call AuthService.userLogin with the form data
//       const result = await AuthService.userLogin({
//         email: formData.email,
//         password: formData.password,
//         ...(isSignUp && {
//           name: formData.name,
//           mobile: formData.mobile,
//           confirmPassword: formData.confirmPassword
//         })
//       });

//       // Handle successful login/signup
//       if (onSubmit) {
//         onSubmit(formData, isSignUp);
//       }

//       console.log('Authentication successful:', result);
//     } catch (error) {
//       console.error('Authentication failed:', error);
//       alert('Authentication failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const decodeJWTToken = (token: string) => {
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split('')
//           .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//           .join('')
//       );
//       return JSON.parse(jsonPayload);
//     } catch (error) {
//       console.error('Error decoding JWT:', error);
//       throw new Error('Invalid token');
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
//     if (!credentialResponse.credential) {
//       alert('Google authentication failed - no credential received');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Decode the JWT token to get user info
//       const userInfo = decodeJWTToken(credentialResponse.credential);
//       console.log('User info from Google:', userInfo);

//       // Call your backend Google login with the credential
//       const result = await AuthService.googleLogin(credentialResponse.credential);
//       console.log('Google login successful:', result);

//       // Handle successful login
//       if (onSubmit) {
//         onSubmit({
//           email: userInfo.email,
//           password: '',
//           name: userInfo.name
//         }, false);
//       }

//       alert('Google login successful!');
//     } catch (error) {
//       console.error('Google login failed:', error);
//       alert(`Google login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleError = () => {
//     console.error('Google login failed');
//     alert('Google login failed. Please try again.');
//   };

//   const toggleMode = () => {
//     setIsSignUp(!isSignUp);
//     setFormData({
//       name: '',
//       email: '',
//       mobile: '',
//       password: '',
//       confirmPassword: ''
//     });
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//   };

//   return (
//     <div className={`flex justify-center items-center min-h-screen p-4 ${className}`}>
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
//         <div className="flex flex-col lg:flex-row">
//           {/* Left Panel - Hidden on mobile */}
//           <div
//             className="hidden lg:flex lg:w-1/2 p-6 lg:p-8 flex-col justify-center items-center text-white relative overflow-hidden"
//             style={{ backgroundColor: '#015F4A' }}
//           >
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full"></div>
//               <div className="absolute bottom-16 right-8 w-16 h-16 bg-white rounded-full"></div>
//               <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
//             </div>

//             <div className="z-10 text-center">
//               <div className="mb-6">
//                 <div className='ml-18'>
//                   <img
//                     src={MeleteLogo1.src}
//                     alt="Melete Mental Health Services Logo"
//                     className="h-12 w-auto transition-transform duration-300"
//                   />
//                 </div>
//               </div>

//               <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//                 {isSignUp ? 'Join Us Today!' : 'Welcome Back!'}
//               </h2>
//               <p className="text-base lg:text-lg opacity-90 mb-8 max-w-xs lg:max-w-md">
//                 {isSignUp
//                   ? 'Create your account and start your journey with us'
//                   : 'Sign in to continue to your account and explore amazing features'
//                 }
//               </p>

//               <button
//                 onClick={toggleMode}
//                 className="px-6 lg:px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-800 transition-colors duration-300"
//                 disabled={isLoading}
//               >
//                 {isSignUp ? 'SIGN IN' : 'SIGN UP'}
//               </button>
//             </div>
//           </div>

//           {/* Right Panel - Full width on mobile */}
//           <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
//             <div className="max-w-sm mx-auto w-full">
//               <div className="text-center mb-6">
//                 <h2 className="text-xl lg:text-2xl font-bold mb-2" style={{ color: '#015F4A' }}>
//                   {isSignUp ? 'Create Account' : 'Sign In'}
//                 </h2>
//                 <p className="text-gray-600 text-sm lg:text-base">
//                   {isSignUp
//                     ? 'Fill in your details to get started'
//                     : 'Enter your credentials to access your account'
//                   }
//                 </p>
//               </div>

//               {/* Google Login Button */}
//               <div className="mb-4">
//                 <div className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
//                   <GoogleLogin
//                     onSuccess={handleGoogleSuccess}
//                     onError={handleGoogleError}
//                     useOneTap={false}
//                     theme="outline"
//                     size="large"
//                     width="100%"
//                     text={isSignUp ? "signup_with" : "signin_with"}
//                   />
//                 </div>
//                 {isLoading && (
//                   <div className="text-center text-sm text-gray-500 mt-2">
//                     Please wait...
//                   </div>
//                 )}
//               </div>

//               <div className="text-center text-gray-500 mb-4 text-sm">
//                 or use your email for {isSignUp ? 'registration' : 'sign in'}
//               </div>

//               {/* Form Fields */}
//               <div className="space-y-3">
//                 {isSignUp && (
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Full Name"
//                       value={formData.name || ''}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>
//                 )}

//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>

//                 {isSignUp && (
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="tel"
//                       name="mobile"
//                       placeholder="Mobile Number"
//                       value={formData.mobile || ''}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                       disabled={isLoading}
//                     />
//                   </div>
//                 )}

//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                     required
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     disabled={isLoading}
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>

//                 {isSignUp && (
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       name="confirmPassword"
//                       placeholder="Confirm Password"
//                       value={formData.confirmPassword || ''}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
//                       required
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       disabled={isLoading}
//                     >
//                       {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>
//                 )}

//                 {!isSignUp && (
//                   <div className="text-right">
//                     <a href="#" className="text-sm hover:underline" style={{ color: '#015F4A' }}>
//                       Forgot Password?
//                     </a>
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={isLoading}
//                   className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                   style={{ backgroundColor: '#015F4A' }}
//                 >
//                   {isLoading ? 'Please wait...' : (isSignUp ? 'SIGN UP' : 'SIGN IN')}
//                 </button>
//               </div>

//               {/* Mobile Toggle for small screens */}
//               <div className="lg:hidden text-center mt-6">
//                 <p className="text-gray-600 text-sm">
//                   {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//                   <button
//                     onClick={toggleMode}
//                     disabled={isLoading}
//                     className="ml-2 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
//                     style={{ color: '#015F4A' }}
//                   >
//                     {isSignUp ? 'Sign In' : 'Sign Up'}
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginCard;

"use client";
import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import MeleteLogo1 from "@/../../public/assets/logoWhite.png";
import AuthService from "@/services/user/AuthService";

interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  mobile?: string;
}

interface LoginCardProps {
  onSubmit?: (formData: FormData, isSignUp: boolean) => void;
  className?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ onSubmit, className = "" }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (isSignUp) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all required fields");
        return;
      }
    }

    setIsLoading(true);
    try {
      // Call AuthService.userLogin with the form data
      const result = await AuthService.userLogin({
        email: formData.email,
        password: formData.password,
        ...(isSignUp && {
          name: formData.name,
          mobile: formData.mobile,
          
        }),
      });

      // Handle successful login/signup
      if (onSubmit) {
        onSubmit(formData, isSignUp);
      }

      console.log("Authentication successful:", result);
      toast.success(
        isSignUp ? "Account created successfully!" : "Login successful!"
      );

      // Set login success state to show the link
      setLoginSuccess(true);
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error(
        `Authentication failed: ${
          error instanceof Error ? error.message : "Please try again"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const decodeJWTToken = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      throw new Error("Invalid token");
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      toast.error("Google authentication failed - no credential received");
      return;
    }

    setIsLoading(true);

    try {
      // Decode the JWT token to get user info
      const userInfo = decodeJWTToken(credentialResponse.credential);
      console.log("User info from Google:", userInfo);

      // Call your backend Google login with the credential
      const result = await AuthService.googleLogin(
        credentialResponse.credential
      );
      console.log("Google login successful:", result);

      // Handle successful login
      if (onSubmit) {
        onSubmit(
          {
            email: userInfo.email,
            password: "",
            name: userInfo.name,
          },
          false
        );
      }

      toast.success("Google login successful!");

      // Redirect to home page after successful Google login
      setTimeout(() => {
        router.push("/");
      }, 1500); // Wait 1.5 seconds to show the toast message
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error(
        `Google login failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    toast.error("Google login failed. Please try again.");
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };
  console.log("hello");
  

  return (
    <div
      className={`flex justify-center items-center min-h-screen p-4 ${className}`}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Hidden on mobile */}
          <div
            className="hidden lg:flex lg:w-1/2 p-6 lg:p-8 flex-col justify-center items-center text-white relative overflow-hidden"
            style={{ backgroundColor: "#015F4A" }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full"></div>
              <div className="absolute bottom-16 right-8 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
            </div>

            <div className="z-10 text-center">
              <div className="mb-6">
                <div className="flex justify-center">
                  <img
                    src={MeleteLogo1.src}
                    alt="Melete Mental Health Services Logo"
                    className="h-12 w-auto transition-transform duration-300"
                  />
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                {isSignUp ? "Join Us Today!" : "Welcome Back!"}
              </h2>
              <p className="text-base lg:text-lg opacity-90 mb-8 max-w-xs lg:max-w-md">
                {isSignUp
                  ? "Create your account and start your journey with us"
                  : "Sign in to continue to your account and explore amazing features"}
              </p>
   
              <button
                onClick={toggleMode}
                className="px-6 lg:px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-800 transition-colors duration-300"
                disabled={isLoading}
              >
                {isSignUp ? "SIGN IN" : "SIGN UP"}
              </button>
            </div>
          </div>

          {/* Right Panel - Full width on mobile */}
          <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <div className="text-center mb-6">
                <h2
                  className="text-xl lg:text-2xl font-bold mb-2"
                  style={{ color: "#015F4A" }}
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                  {isSignUp
                    ? "Fill in your details to get started"
                    : "Enter your credentials to access your account"}
                </p>
              </div>

              {/* Google Login Button */}
              <div className="mb-4">
                <div
                  className={`${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap={false}
                    theme="outline"
                    size="large"
                    width="100%"
                    text={isSignUp ? "signup_with" : "signin_with"}
                  />
                </div>
                {isLoading && (
                  <div className="text-center text-sm text-gray-500 mt-2">
                    Please wait...
                  </div>
                )}
              </div>

              <div className="text-center text-gray-500 mb-4 text-sm">
                or use your email for {isSignUp ? "registration" : "sign in"}
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                {isSignUp && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
                      required
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                {isSignUp && (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={formData.mobile || ""}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {isSignUp && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword || ""}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 transition-colors"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                )}

                {!isSignUp && (
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-sm hover:underline"
                      style={{ color: "#015F4A" }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  // onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ backgroundColor: "#015F4A" }}
                >
                  {isLoading
                    ? "Please wait..."
                    : isSignUp
                    ? "SIGN UP"
                    : "SIGN IN"}
                </button>

                {/* Success Link */}
                {loginSuccess && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-green-800 text-sm mb-2">
                      {isSignUp
                        ? "Account created successfully!"
                        : "Login successful!"}
                    </p>
                    <Link
                      href="/"
                      className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                      Continue to Home
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Toggle for small screens */}
              <div className="lg:hidden text-center mt-6">
                <p className="text-gray-600 text-sm">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <button
                    onClick={toggleMode}
                    disabled={isLoading}
                    className="ml-2 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: "#015F4A" }}
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
