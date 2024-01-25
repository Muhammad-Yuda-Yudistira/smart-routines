import { Head, usePage, Link } from "@inertiajs/react";
import List from "@/Components/Routines/List";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Navbar from "@/Layouts/Navbar";
import { useEffect, useState } from "react";
import "@/../css/routine.css";

export default function Routines({ auth, title, categories, routines = null }) {
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
            <h2 className="menu-title">
              <span className="text-md inline-block fill-white pr-3"><svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24"><path d="M23,11v1h-4.783l-2.572-4.273c-.027-.045-.057-.088-.089-.13l-3.056,7.147-.864-.547,3.065-7.157c-.111-.026-.225-.041-.341-.041h-2.582l-2.613,6.244c-.275,.672-.029,1.444,.587,1.833l5.248,3.139v5.784h-1v-5.216l-4.772-2.854c-1.038-.656-1.448-1.943-.987-3.068l2.452-5.861h-3.884l-1.862,3.724-.895-.447,2.138-4.276H14.36c.872,0,1.692,.464,2.142,1.211l2.281,3.789h4.217ZM12,2.5c0-1.378,1.122-2.5,2.5-2.5s2.5,1.122,2.5,2.5-1.122,2.5-2.5,2.5-2.5-1.122-2.5-2.5Zm1,0c0,.827,.673,1.5,1.5,1.5s1.5-.673,1.5-1.5-.673-1.5-1.5-1.5-1.5,.673-1.5,1.5Zm-5.138,14.887l-.691,1.613H2v1H7.83l.879-2.051-.507-.303c-.123-.077-.227-.172-.34-.258Z"/></svg></span> {title}
            </h2>
          }
        >
          <Head>
            <title>{title}</title>
            <meta head-key="description" name="description" content="This is a page specific description" />
          </Head>
          
          <div className="container-fluid text-center p-10 px-28 box-border selection:bg-white selection:text-gray-700">
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
            <div className="title-box mb-2">
              <h1 className="test-file text-5xl font-main text-slate-300">Your Routines</h1>
              <p className="text-lg font-tersier text-slate-400">{currentTime.toDateString()}</p>
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
