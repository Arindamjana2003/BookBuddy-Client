# Name : Book buddy

1. Features:

   - Admin
     - User details
     - Add books
     - Add Question papers
     - Approved by admin when books are added by users
   - User
     - Account create
     - Add books
     - Read books
     - Add review of books
     - Liked books
     - Search books
     - Request for books
     - See question papers
     - Add notes to the diary
     - Add Blogs (Any types)

2. Technology use:

   - React Native [Expo] --------> App Framework
   - Node with Express.JS --------> Backend and API creation
   - MongoDB --------------------> DB connection
   - Bcrypt.JS -------------------> Password Hashing
   - Socket.io -------------------> Realtime communication
   - Cloudinary ------------------> Storage
   - Nodemailer ------------------> Mail service
   - Zod -------------------------> Validation
   - Zustand --------------------> State Management
   - NativeWind ------------------> CSS library
   - Expo Icons ------------------> Icon packs
   - Lottie files ----------------> Animated files

```

```

```json
{
  "expo": {
    "name": "BookBuddy",
    "slug": "BookBuddy",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/logo.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/logo.png",
        "backgroundColor": "#f5fffa",
        "dark": {
          "backgroundColor": "#1e2d2f"
        }
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/logo.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#f5fffa",
          "dark": {
            "backgroundColor": "#1e2d2f"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```
