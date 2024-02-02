import { Head, Link } from '@inertiajs/react';
import { useRef, useEffect, useState, useContext } from 'react';
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import LoadingPage from '@/Layouts/LoadingPage';
import "@/../css/home.css";
import "/node_modules/shepherd.js/dist/css/shepherd.css";
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';
import newSteps from '@/Pages/steps';

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    },
  },
  useModalOverlay: true,
  advanceOn: { selector: '#step-2', event: 'click' },
};

function Button() {
  const tour = useContext(ShepherdTourContext);
  if(tour)
  {
    tour.start()
  }
}

export default function Homepage()
{
  const audioRef = useRef();
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
  const playlist = [
      {title: 'Leonell Cassio - The paranormal is real (ft-carrie)', source: '/assets/images/theme/audio/leonell-cassio-the-paranormal-is-real-ft-carrie.mp3'},
      {title: 'Science Documentary', source: '/assets/images/theme/audio/science-documentary.mp3'},
      {title: 'Sakura Girl - Peach', source: '/assets/images/theme/audio/Sakura-Girl-Peach.mp3'},
      {title: 'A long way', source: '/assets/images/theme/audio/a-long-way.mp3'},
    ]

  gsap.registerPlugin(TextPlugin);

  // gsap animation
    gsap.to('#title-tag', {duration: 2, text: "Create complex todolist for your life"})
    gsap.to('#backsound', {duration:2, x:10})

  useEffect(() => {
    audioRef.current.volume = 0.35;

    function playAudio(audioEl) {
      audioEl.src = playlist[currentAudioIndex].source
      audioEl.play()
    }

    playAudio(audioRef.current);

    audioRef.current.addEventListener('ended', () => {
      if(currentAudioIndex < playlist.length - 1) {
        setCurrentAudioIndex(currentAudioIndex + 1);
      } else {
        setCurrentAudioIndex(0);
      }
    })
  }, [currentAudioIndex])
	return(
		<>
			<Head>
				<title>Homepage</title>
				<meta head-key="description" name="description" content="This is the default description" />
			</Head>

          <div id="container-homepage" className="relative flex flex-col justify-between min-h-screen bg-white overflow-hidden">
            <LoadingPage>

              <div id="audio-box" className="absolute flex flex-col justify-center z-0">
                <audio id="backsound" className="" ref={audioRef} controls volume="0.5" src="/public/assets/images/theme/audio/a-long-way.mp3"></audio>
                <h2 className="text-gray-400"><span id="audio-icon" className="text-sm">🎹</span> {playlist[currentAudioIndex].title}</h2>
              </div>
              <div id="hero-homepage" className="container text-center w-full m-10 mb-0">
                <section id="section-1">
                  <ShepherdTour steps={newSteps} tourOptions={tourOptions}>
                    <Button />
                  </ShepherdTour>

                  <div className="title-box mb-8">
                    <h1 id="title" className="text-5xl text-gray-300">Smart Routines</h1>
                    <small id="title-tag" className="text-sm text-gray-400 tracking-widest"></small>
                  </div>
                  <div id="description" className="flex flex-col justify-between gap-16">
                    <span className="paragraf-1 text-gray-400 font-serif tracking-wide box-border h-20">
                      <span id="text-box" className="block h-6">
                        <p className="viewer inline hover:text-xl transition-all duration-150">You are Main Character in Your life. Create your mission and done of this game.</p><br/>
                      </span>
                      <span id="text-box" className="block h-6">
                        <p className="viewer inline hover:text-xl transition-all duration-150">Growth your skills and essential missions for survival in this world.</p><br/>
                        
                      </span>
                      <span id="text-box" className="block h-6">
                        <p className="viewer inline hover:text-xl transition-all duration-150">Have fun of Live in Real life games!</p><br/>
                        
                      </span>
                    </span>
                    <span className="paragraf-2 text-gray-300 text-2xl tracking-widest w-2/3 m-auto">
                      <p id="step-1">Create your schedule with step by step. first create resolution, then create routine for done your resolution.<span id="clock-icon">⏰</span></p>
                    </span>
                  </div>
                  <div className="py-10">
                    <Link href="/guides" id="step-2" className="clicker text-4xl inline-block">📘</Link>
                    <div className="uppercase text-base text-second font-semibold">Guide</div>
                  </div>
                </section>
              </div>
             <section id="section-2" className="flex">
              <span className="flex justify-center items-center w-[50%] h-40 bg-transparent text-center">
                <Link href="/login" type="button" as="button" className="btn hover:bg-gray-200 bg-transparent text-gray-500 border-gray-500 hover:text-gray-400 shadow-neutral-600 hover:shadow hover:border-dashed hover:border-orange-600">💎 Sign-In</Link>
              </span>
              <span id="button-2" className="flex justify-center items-center inline-block w-[50%] h-40 bg-blue-600 text-center backdrop-opacity-25">
                <Link href="/register" type="button" as="button" className="btn bg-second border-orange-600 text-gray-100 hover:bg-gray-300 hover:text-gray-700 hover:border-gray-400 shadow-neutral-600 shadow-md">✨ Sign-Up</Link>
              </span>
            </section>
          </LoadingPage>
        </div>
      </>
	);
}