import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/login.jsx";
import Home from "./Pages/Home/home.jsx";
import Contact from "./Pages/Contact/contact.jsx";
import Topics from "./Pages/Topic/topics.jsx";
import Quizess from "./Pages/Quizess/quizess.jsx";
import About from "./Pages/About/about.jsx";
// import Header from "./Components/Header/header.jsx";
// import Footer from "./Components/Footer/footer.jsx";
import UserRoute from "./Routes/UserRoute.jsx";
import UserContextProvider from "./Contexts/UserContext.js";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import DetailTopic from "./Pages/DetailTopic/DetailTopic.jsx";
import Lesson from "./Pages/Lesson/Lesson.jsx";
import LearnContainer from "./Pages/LearnContainer/LearnContainer.jsx";
import "./style.css";
import Profile from "./Pages/Profile/Profile.jsx";
import { Toaster } from "react-hot-toast";
import History from "./Pages/History/History.jsx";
import HistoryQuizz from "./Pages/HistoryQuizz/HistoryQuizz.jsx";
import Statistic from "./Pages/Statistic/Statistic.jsx";
import Excercise from "./Pages/Excercise/Excercise.jsx";
import DetailHistory from "./Pages/DetailHistory/DetailHistory.jsx";
import AdminProfile from "./Pages/Dashboard/adminProfile.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import UserManagement from "./Pages/Dashboard/UserManagement.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
// import { UserContext } from "./Contexts/UserContext.js";
// import { useContext } from "react";
import Rank from "./Pages/Rank/Rank.jsx";
import QuizContainer from "./Pages/QuizContainer/QuizContainer.jsx";
import RankQuizz from "./Pages/Rank/RankQuizz.jsx";

export default function App() {
  return (
    <UserContextProvider>
      {/* <Header /> */}
      <Routes>
        <Route
          path="/"
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        />
        <Route
          path="/QuizContainer/:quizzId"
          element={
            <UserRoute>
              <QuizContainer />
            </UserRoute>
          }
        />
        <Route
          path="/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/historyQuizz"
          element={
            <UserRoute>
              <HistoryQuizz />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/rank"
          element={
            <UserRoute>
              <Rank />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/rankquizz"
          element={
            <UserRoute>
              <RankQuizz />
            </UserRoute>
          }
        ></Route>

        <Route
          path="/detailhistory"
          element={
            <UserRoute>
              <DetailHistory />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/statistic"
          element={
            <UserRoute>
              <Statistic />
            </UserRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        />
        <Route
          path="/topics"
          element={
            <UserRoute>
              <Topics />
            </UserRoute>
          }
        />

        <Route
          path="/topics/:topicId"
          element={
            <UserRoute>
              <DetailTopic />
            </UserRoute>
          }
        />
        <Route
          path="/topics/:topicId/lessons"
          element={
            <UserRoute>
              <Lesson />
            </UserRoute>
          }
        />
        <Route
          path="/lessons/:lessonId"
          element={
            <UserRoute>
              <LearnContainer />
            </UserRoute>
          }
        />
        <Route
          path="/quizess"
          element={
            <UserRoute>
              <Quizess />
            </UserRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <UserRoute>
              <Contact />
            </UserRoute>
          }
        />
        <Route
          path="/excercises"
          element={
            <UserRoute>
              <Excercise />
            </UserRoute>
          }
        />
        <Route
          path="/about"
          element={
            <UserRoute>
              <About />
            </UserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/dashboard-test" element={<AdminProfile />} />
        <Route
          path="/user-management"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />
        <Route path="/history" element={<History />}></Route>
        <Route path="/statistic" element={<Statistic />}></Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
      {/* <Footer /> */}
    </UserContextProvider>
  );
}
