// import axios, {
//   AxiosInstance,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
//   AxiosError,
// } from "axios";
// import { store } from "@/store/app/store";
// import { setToken, signOut } from "@/store/features/authSlice"; // ✅ correct named import

// const API_URLS = {
//   user: process.env.NEXT_PUBLIC_API_USER || "",
//   admin: process.env.NEXT_PUBLIC_API_ADMIN || "",
//   counsellor: process.env.NEXT_PUBLIC_API_COUNSELLOR || "",
// } as const;

// if (!API_URLS.user || !API_URLS.admin || !API_URLS.counsellor) {
//   throw new Error("API URL missing in environment variables");
// }

// export type UserRole = keyof typeof API_URLS;

// const refreshPromises: Record<UserRole, Promise<string | null> | null> = {
//   user: null,
//   admin: null,
//   counsellor: null,
// };

// const refreshAuthToken = async (role: UserRole): Promise<string | null> => {
//   if (refreshPromises[role]) {
//     return refreshPromises[role];
//   }

//   refreshPromises[role] = (async () => {
//     try {
//       console.log(`Refreshing token for role: ${role}`);
//       const response = await axios.post(
//         `${API_URLS[role]}/refresh-token`,
//         {},
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//           timeout: 10000,
//         }
//       );

//       const newToken = response.data?.accessToken;
//       if (newToken) {
//         console.log("New token received successfully");
//         store.dispatch(setToken({ token: newToken }));
//         return newToken;
//       } else {
//         console.error("No access token in refresh response");
//         throw new Error("No access token received");
//       }
//     } catch (error: any) {
//       console.error("Refresh token error:", error.response?.data || error.message);
//       store.dispatch(setToken({ token: "" }));
//       store.dispatch(signOut()); // ✅ clear Redux state
//       return null; // ❌ Don't redirect here
//     } finally {
//       refreshPromises[role] = null;
//     }
//   })();

//   return refreshPromises[role];
// };

// const createAxiosInstance = (role: UserRole): AxiosInstance => {
//   const instance = axios.create({
//     baseURL: API_URLS[role],
//     timeout: 10000,
//     withCredentials: true,
//   });

//   instance.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//       const token = store.getState().auth.token;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       console.log(`Making request to: ${config.baseURL}${config.url}`);
//       return config;
//     },
//     (error) => {
//       console.error("Request interceptor error:", error);
//       return Promise.reject(error);
//     }
//   );

//   instance.interceptors.response.use(
//     (response: AxiosResponse) => response,
//     async (error: AxiosError) => {
//       const originalRequest = error.config as InternalAxiosRequestConfig & {
//         _retry?: boolean;
//       };

//       if (
//         error.response?.status === 401 &&
//         originalRequest &&
//         !originalRequest._retry &&
//         !originalRequest.url?.includes("/refresh-token")
//       ) {
//         originalRequest._retry = true;
//         try {
//           const newToken = await refreshAuthToken(role);
//           if (newToken) {
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;
//             return instance(originalRequest);
//           }
//         } catch (refreshError) {
//           console.error("Failed to refresh token:", refreshError);
//           return Promise.reject(refreshError);
//         }
//       }

//       console.error(
//         `Response error for ${originalRequest?.url}:`,
//         error.response?.data
//       );
//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };

// export const api = {
//   admin: createAxiosInstance("admin"),
//   counsellor: createAxiosInstance("counsellor"),
//   user: createAxiosInstance("user"),
// };




import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { store } from "@/store/app/store";
import { setToken, signOut } from "@/store/features/authSlice";

const API_URLS = {
  user: process.env.NEXT_PUBLIC_API_USER || "",
  admin: process.env.NEXT_PUBLIC_API_ADMIN || "",
  counsellor: process.env.NEXT_PUBLIC_API_COUNSELLOR || "",
} as const;

if (!API_URLS.user || !API_URLS.admin || !API_URLS.counsellor) {
  throw new Error("API URL missing in environment variables");
}

export type UserRole = keyof typeof API_URLS;

const refreshPromises: Record<UserRole, Promise<string | null> | null> = {
  user: null,
  admin: null,
  counsellor: null,
};

const refreshAuthToken = async (role: UserRole): Promise<string | null> => {
  if (refreshPromises[role]) {
    return refreshPromises[role];
  }

  refreshPromises[role] = (async () => {
    try {
      console.log(`Refreshing token for role: ${role}`);
      const response = await axios.post(
        `${API_URLS[role]}/refresh-token`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      const newToken = response.data?.accessToken;
      if (newToken) {
        console.log("New token received successfully");
        store.dispatch(setToken({ token: newToken }));
        return newToken;
      } else {
        console.error("No access token in refresh response");
        throw new Error("No access token received");
      }
    } catch (error: any) {
      console.error("Refresh token error:", error.response?.data || error.message);
      console.log("🔴 Dispatching signOut due to token refresh failure");
      // ✅ This will reset name, email, token, role, isAuthenticated to initial state
      store.dispatch(signOut());
      return null;
    } finally {
      refreshPromises[role] = null;
    }
  })();

  return refreshPromises[role];
};

const createAxiosInstance = (role: UserRole): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URLS[role],
    timeout: 10000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`Making request to: ${config.baseURL}${config.url}`);
      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/refresh-token")
      ) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshAuthToken(role);
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return instance(originalRequest);
          } else {
            // ✅ Token refresh failed, auth state already cleared by refreshAuthToken
            console.log("🔴 Authentication failed - user logged out");
            return Promise.reject(new Error("Authentication failed"));
          }
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          // ✅ Ensure signOut is called here too
          console.log("🔴 Dispatching signOut due to refresh error");
          store.dispatch(signOut());
          return Promise.reject(refreshError);
        }
      }

      console.error(
        `Response error for ${originalRequest?.url}:`,
        error.response?.data
      );
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = {
  admin: createAxiosInstance("admin"),
  counsellor: createAxiosInstance("counsellor"),
  user: createAxiosInstance("user"),
};