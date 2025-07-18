"use client";
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Until then, take a deep breath..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-start pt-16 min-h-screen  px-4">
      <div className="text-center max-w-md">
        <div className="text-lg font-normal mb-8" style={{color: '#015F4A'}}>
          {message}
        </div>
        
        <div className="flex space-x-2 justify-center mb-8">
          <div 
            className="w-3 h-3 rounded-full animate-pulse" 
            style={{backgroundColor: '#015F4A', animationDuration: '1.5s'}}
          ></div>
          <div 
            className="w-3 h-3 rounded-full animate-pulse" 
            style={{backgroundColor: '#015F4A', animationDuration: '1.5s', animationDelay: '0.2s'}}
          ></div>
          <div 
            className="w-3 h-3 rounded-full animate-pulse" 
            style={{backgroundColor: '#015F4A', animationDuration: '1.5s', animationDelay: '0.4s'}}
          ></div>
        </div>
        
        <div className="text-sm font-light" style={{color: '#015F4A', opacity: 0.7}}>
          Please wait...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;





// import React from 'react';

// interface LoadingSpinnerProps {
//   message?: string;
// }

// const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
//   message = "Until then, take a deep breath..." 
// }) => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <div className="text-center px-6">
//         <div className="text-base font-medium mb-4" style={{color: '#015F4A'}}>
//           {message}
//         </div>
        
//         <div className="flex space-x-1 justify-center">
//           <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#015F4A'}}></div>
//           <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#015F4A', animationDelay: '0.3s'}}></div>
//           <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#015F4A', animationDelay: '0.6s'}}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;