# 📚 Book My Class  
**College Room Booking App**  

## 🏫 About  
Book My Class is a mobile application designed to simplify the process of booking classrooms for lessons, meetings, and other academic activities. It helps teachers, administrators, and students efficiently manage classroom schedules and availability. This was made as a room booking app for DYPSOET.  

## ✨ Features  
- **Easy Classroom Booking** – Teachers and admins can schedule classrooms on any floor by selecting a date, time, and adding booking details.  
- **Student View** – Students can check room availability and view schedules, including the purpose of bookings.  
- **Authentication** – Secure login and signup ensure privacy and prevent unauthorized access.  
- **User-Friendly Interface** – Intuitive design for seamless navigation and efficient room management.  

## 🖥️ Technical Requirements  
- ✅ **Java SE 15.0.2**  
- ✅ **Android SDK 29 & 30**  
  - Ensure the relevant **NDK versions** are installed for compatibility.  

## 🛠️ Installation & Usage  

### 📥 Clone the Repository  
```sh  
git clone https://github.com/rohanstomar11/book-my-class  
cd book-my-class  
```

### 🔧 Install Dependencies  
```sh  
npm run clean-install  
```

### 🚀 Start the Application  

#### **For Android**  
Open **two terminals** and run:  
```sh  
npm run start  # Starts Metro bundler  
```  
```sh  
npm run android  # Builds and runs the app on Android  
```  

#### **For iOS**  
After running `npm run clean-install`, install iOS dependencies:  
```sh  
cd ios && pod install && cd ..  
```  
Then, open **two terminals** and run:  
```sh  
npm run start  # Starts Metro bundler  
```  
```sh  
npm run ios  # Builds and runs the app on iOS  
```  

## 🎥 Demo  
![App Demo](https://github.com/rohanstomar11/book-my-class/blob/master/demo/book-my-class.gif)
