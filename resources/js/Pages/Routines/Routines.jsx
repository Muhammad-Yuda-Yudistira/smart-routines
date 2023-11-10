import { Head } from "@inertiajs/react";
import List from "@/Components/Routines/List";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Navbar from "@/Layouts/Navbar";
import { useEffect, useState } from "react";

export default function Routines({ auth, categories, routines = null }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  return (
    <>
      {auth.user ? (
        <AuthenticatedLayout
          user={auth.user}
          header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Routines
            </h2>
          }
        >
          <Head title="Routines" />
          <div className="container text-center m-10 mx-16 w-full box-border">
            <div className="title-box mb-10">
              <h1 className="text-5xl">Your Routines</h1>
              <p>{currentTime.toDateString()}</p>
            </div>
            <List
              routines={routines}
              user={auth.user}
              categories={categories}
            />
          </div>
        </AuthenticatedLayout>
      ) : (
        <>
          <Head title="Routines" />
          <Navbar />
          <div className="container text-center m-10 mx-16 w-full box-border">
            <div className="title-box mb-10">
              <h1 className="text-5xl">Your Routines</h1>
              <p>{currentTime.toDateString()}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
