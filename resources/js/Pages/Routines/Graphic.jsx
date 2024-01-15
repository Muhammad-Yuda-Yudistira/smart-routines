import List from "@/Components/Routines/List";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import "@/../css/graphic_routines.css";

export default function Graphic({auth, title, routines, categories}) {
	let totalCategory = []
	let totalTime = 0
	let remainingTime = 86400 //1 day in second

	function convertTimeToSeconds(time) {
		const [hours, minutes] = time.split(':')
		return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60
	}

	function remainingTimeInSeconds(time) {
		// 24jam × 60menit/jam × 60detik/menit = 86.400detik
		return remainingTime - time
	}

	function convertSecondsToHuman(seconds) {
		const hours = Math.floor(seconds / 3600)
		const remainingSecond = seconds % 3600
		const minutes = Math.floor(remainingSecond / 60)
		return `${hours} hours, ${minutes} minutes.`
	}

	categories.map(category => {
		totalCategory = [...totalCategory, category.name]
	})

	routines.map(routine => {
		const startTimeInSeconds = convertTimeToSeconds(routine.start_time)
		const endTimeInSeconds = convertTimeToSeconds(routine.end_time)

		const timeDiffInSeconds = endTimeInSeconds - startTimeInSeconds

		totalTime += timeDiffInSeconds
	})

	remainingTime = remainingTimeInSeconds(totalTime)
	remainingTime = convertSecondsToHuman(remainingTime)
	const totalDuration = convertSecondsToHuman(totalTime)

	return (
		<AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-gray-600 leading-tight" style={{fontFamily:'Smooch Sans'}}>
                    <span className="font-sans">〽</span> {title}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container text-center pt-10 pb-16">
                        	<div className="title-box pb-10">
                        		<h1 id="title" className="text-4xl">Your Graphic</h1>
                        		<small id="title-tag" className="italic text-lg">Count of category in your routines</small>
                        	</div>
                        	<main id="routine-list" className="graphic-box w-[60%] m-auto bg-gray-200 p-4 pt-8 border-2 border-gray-900 border-dashed" style={{fontFamily: ''}}>
                        		<ul id="graphic-list" className="pb-10 text-xl text-start">
                        			{categories.map(category => {
                        				let activities = 0, durations = 0
                        				routines.map(routine => {
                        					if(category.name == routine.category.name) {
                        						activities += 1
                        						const startTimeInSeconds = convertTimeToSeconds(routine.start_time)
														const endTimeInSeconds = convertTimeToSeconds(routine.end_time)

														const timeDiffInSeconds = endTimeInSeconds - startTimeInSeconds

														durations += timeDiffInSeconds
                        					}
                        				})
                        				const durationsInHuman = convertSecondsToHuman(durations)
                        				return (
		                        			<li key={category.id} className="pb-4">
		                        				<span className="font-bold non-italic">
		                        					<span className="non-italic text-sm opacity-90 pr-2">🔱</span> 
		                        					{category.name} ➡
		                        				</span> 
		                        				<p className="inline italic text-gray-500"> count activities: <span className="text-yellow-600">{activities}</span>, count durations: <span className="text-blue-500">{durationsInHuman}</span>.</p>
		                        				<hr className="border-b-orange-300 border-b-2"/>                      			
		                        			</li>
                        					)
                        			})}
                        		</ul>
                        		<div className="graphic-sum">
                        			<h3 className="text-lg italic text-gray-500">
                        				<span className="non-italic pr-1">⚜ </span> 
                        				Total activities: <span className="text-yellow-600">{routines.length}</span>, total durations: <span className="text-yellow-600">{totalDuration}</span>, remaining free time: <span className="text-yellow-600">{remainingTime}</span>
                        			</h3>
                        		</div>
                        	</main>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
	)
}