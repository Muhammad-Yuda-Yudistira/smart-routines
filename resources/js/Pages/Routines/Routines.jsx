import { Head, usePage, Link } from "@inertiajs/react";
import List from "@/Components/Routines/List";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Navbar from "@/Layouts/Navbar";
import { useEffect, useState } from "react";

export default function Routines({ auth, categories, routines = null }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { flash } = usePage().props;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return clearInterval(interval);
  }, []);

  return (
    <>
        <AuthenticatedLayout
          user={auth.user}
          header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Routines
            </h2>
          }
        >
          <Head>
            <title>Routines</title>
            <meta head-key="description" name="description" content="This is a page specific description" />
          </Head>
          
          <div className="container-fluid text-center p-10 px-28 box-border">
            {flash.message && (
              <div className="alert alert-success h-12 flex mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="">{flash.message}</span>
              </div>
            )}
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
    </>
  );
}
