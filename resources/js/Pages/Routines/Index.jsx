// METHODS
import { Head, usePage, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
// UI
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Navbar from "@/Layouts/Navbar";
import Item from "@/Components/Routines/Item";
import Detail from "@/Components/Routines/Detail";
// STYLE
import "@/../css/routine.css";



export default function Index({ auth, title, categories, routines = null }) {
  // time zones
  const [currentTime, setCurrentTime] = useState(new Date());

  // flash message
  const { flash } = usePage().props;

  // card system
  const [startZones, setStartZones] = useState([])
  const [endZones, setEndZones] = useState([])
  const [cards, setCards] = useState([])


  const handleTimeZones = (timeZones) => {
    let currentStartZones = []
    let currentEndZones = []
    timeZones.map(timeZone => {
      currentStartZones = [...currentStartZones, timeZone.start_time]
      currentEndZones = [...currentEndZones, timeZone.end_time]
    })
    setStartZones(currentStartZones)
    setEndZones(currentEndZones)
  }

  const handleCards = (startZones, endZones) => {
    let currentCards = []
    if(startZones[0] != '00:00:00')
    {
      currentCards = [...currentCards, '00:00:00']
    }
    startZones.map((startZone, index) => {
      let nextIndex = index + 1

      currentCards = [...currentCards, startZone]
      if(endZones[index] != startZones[nextIndex])
      {
        currentCards = [...currentCards, endZones[index]]
      }
    })
    setCards(currentCards)
  }

  useEffect(() => {
    // algoritma waktu saat ini
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return clearInterval(interval);
  }, [routines]);


  useEffect(() => {
    // kumpulkan data start time dan end time terlebih dahulu
    // lalu looping lagi untuk membuat card kosong dan card berisi dengan kondisi tertentu
    // cocokan cards dan data start time routines untuk menentuka card empty / filled

    // ALGORITMA CARD MAKER
    // CREATE ZONES
    handleTimeZones(routines)
  }, [routines])

  useEffect(() => {
    // CREATE CARD
    // card pertama jika kosong
    
    // card berikutnya jika ada plus jika ada card kosong dibawahnya
    handleCards(startZones, endZones)
  }, [startZones])



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
          
          <div className="container-fluid text-center p-16 px-8 pr-16 box-border selection:bg-white selection:text-gray-700">
            {flash.message && (
              <div className="alert alert-success bg-second text-main h-12 flex mb-3">
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

            <div className="title-box rotate-90 absolute -right-40 top-80">
                <h1 className="test-file text-5xl font-main text-slate-300">{currentTime.toDateString()}</h1>
              <span className="block w-10">
              </span>
            </div>

            <main id="routines" className="h-96 overflow-hidden">
              <div id="routines-box" className="grid grid-flow-col gap-2 grid-cols-9 min-w-full min-h-full text-white">

                <aside id="routines-list" className="col-span-2 bg-sky-300 overflow-y-scroll h-96 bg-[url('/assets/images/theme/blob-scene-haikei.svg')] bg-cover">
                  <ul>
                  {/*{
                    routines[0].start_time != '00:00:00' && (<Item index={(routines.length - 1) +1} />)
                  }
                  {
                    routines.map((routine, index) => {
                      // console.log(routines[index + 1].start_time)
                      var newIndex = index + 1
                      return newIndex < routines.length && routine.end_time != routines[newIndex] ?
                      (
                        <>
                          <Item routine={routine} index={index} />
                          <Item index={(routines.length - 1) +1} />
                        </>
                      )
                      :
                      (
                        <Item routine={routine} index={index} />
                      )
                    })
                  }*/}
                  {
                    cards.map((card, index) => {
                      <Item card={card} index={index} />
                    }) 
                  }
                  </ul>
                </aside>

                <div id="routines-detail" className="col-span-7 bg-yellow-400 bg-[url('/assets/images/theme/stacked-steps-haikei.svg')] bg-cover bg-no-repeat">
                  <Detail />
                </div>

              </div>
            </main>
          </div>
        </AuthenticatedLayout>
    </>
  );
}
