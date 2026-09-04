
import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />

          <div
            className={`${styles.section} bg-[#f5f5f5] py-10`}
          >
            <div className="flex flex-row gap-6 items-start">

              {/* Sidebar */}
              <div className="w-15 lg:w-70 xl:w-83.75 shrink-0">
                <ProfileSideBar
                  active={active}
                  setActive={setActive}
                />
              </div>

              {/* Profile Content */}
              <div className="flex-1 min-w-0">
                <ProfileContent active={active} />
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;