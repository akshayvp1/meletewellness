"use client";

declare global {
  interface Window {
    google: any;
  }
}

export interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

export interface GoogleUserInfo {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export class GoogleAuthUtil {
  private static instance: GoogleAuthUtil;
  private isInitialized = false;

  static getInstance(): GoogleAuthUtil {
    if (!GoogleAuthUtil.instance) {
      GoogleAuthUtil.instance = new GoogleAuthUtil();
    }
    return GoogleAuthUtil.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (
        document.querySelector(
          'script[src="https://accounts.google.com/gsi/client"]'
        )
      ) {
        this.isInitialized = true;
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.isInitialized = true;
        resolve();
      };
      script.onerror = () => {
        reject(new Error("Failed to load Google Identity Services"));
      };
      document.head.appendChild(script);
    });
  }

  async signIn(): Promise<GoogleUserInfo> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject(new Error("Google Identity Services not loaded"));
        return;
      }

      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        reject(new Error("Google Client ID not configured"));
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: GoogleCredentialResponse) => {
            try {
              console.log("Google callback received:", response);
              const userInfo = this.decodeJWTToken(response.credential);
              resolve(userInfo);
            } catch (error) {
              console.error("Error processing Google response:", error);
              reject(error);
            }
          },
          cancel_on_tap_outside: false,
          auto_select: false,
        });

        // Try One Tap first
        window.google.accounts.id.prompt((notification: any) => {
          console.log("Google prompt notification:", notification);

          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log("One Tap not available, using popup");
            // Fallback to popup
            this.showPopup().then(resolve).catch(reject);
          }
        });
      } catch (error) {
        console.error("Google Sign-In initialization error:", error);
        reject(error);
      }
    });
  }

  private async showPopup(): Promise<GoogleUserInfo> {
    return new Promise((resolve, reject) => {
      try {
        // Create temporary container
        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.top = "-9999px";
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);

        // Render button
        window.google.accounts.id.renderButton(tempDiv, {
          theme: "outline",
          size: "large",
          type: "standard",
          width: 250,
        });

        // Auto-click after a brief delay
        setTimeout(() => {
          const button = tempDiv.querySelector(
            'div[role="button"]'
          ) as HTMLElement;
          if (button) {
            button.click();
          } else {
            reject(new Error("Failed to create Google Sign-In button"));
          }

          // Clean up
          setTimeout(() => {
            if (document.body.contains(tempDiv)) {
              document.body.removeChild(tempDiv);
            }
          }, 1000);
        }, 100);
      } catch (error) {
        reject(error);
      }
    });
  }

  private decodeJWTToken(token: string): GoogleUserInfo {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const payload = JSON.parse(jsonPayload);

      if (!payload.email || !payload.name || !payload.sub) {
        throw new Error("Invalid user data in JWT token");
      }

      return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture || "",
        sub: payload.sub,
      };
    } catch (error) {
      throw new Error("Invalid JWT token");
    }
  }
}
