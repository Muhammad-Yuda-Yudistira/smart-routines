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
                <h2 className="menu-title">
                    <span className="text-md inline-block fill-white pr-3"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M24,23.5c0,.276-.224,.5-.5,.5H2.5c-1.378,0-2.5-1.122-2.5-2.5V.5C0,.224,.224,0,.5,0s.5,.224,.5,.5V21.5c0,.827,.673,1.5,1.5,1.5H23.5c.276,0,.5,.224,.5,.5Zm-2.5-18.5h-4c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h4c.231,0,.45,.053,.646,.146l-5.771,5.414c-.584,.585-1.536,.586-2.153-.029l-.954-.799c-.943-.944-2.597-.939-3.53-.005l-5.586,5.414c-.198,.192-.203,.509-.011,.707,.098,.101,.229,.152,.359,.152,.125,0,.251-.047,.348-.141l5.591-5.419c.566-.566,1.523-.596,2.153,.029l.954,.799c.974,.975,2.561,.975,3.524,.011l5.771-5.414,.011-.011c.094,.196,.147,.415,.147,.647v4c0,.276,.224,.5,.5,.5s.5-.224,.5-.5V7.5c0-1.378-1.122-2.5-2.5-2.5Z"/></svg></span> {title}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container text-center pt-10 pb-16">
                        	<div className="title-box pb-10">
                        		<h1 id="title" className="text-4xl text-title">Your Graphic</h1>
                        		<small id="title-tag" className="italic text-lg text-desc">Count of category in your routines</small>
                        	</div>
                        	<main id="routine-list" className="graphic-box w-[60%] m-auto bg-slate-100 p-4 pt-8 border-2 border-orange-600 border-dashed" style={{fontFamily: ''}}>
                        		<ul id="graphic-list" className="pb-10 text-xl text-start list-outside">
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
		                        				<span className="font-bold non-italic font-title pl-8 inline-block">
		                        					<span className="inline-block mr-3">
		                        						<svg fill="#ea580c" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="22px" height="22px" viewBox="0 0 433.012 433.012"
	 xml:space="preserve">
<g>
	<g id="Layer_2_22_">
		<g>
			<path d="M249.062,279.146l-29.115-20.59l0.457-35.655c0.049-3.807-2.068-7.31-5.458-9.038c-3.393-1.729-7.473-1.381-10.521,0.896
				l-28.578,21.327l-33.77-11.452c-3.605-1.222-7.59-0.293-10.283,2.399c-2.691,2.692-3.621,6.678-2.398,10.283l11.451,33.77
				l-21.326,28.578c-2.277,3.051-2.623,7.129-0.896,10.521c1.729,3.392,5.27,5.52,9.039,5.459l35.654-0.455l20.59,29.112
				c1.893,2.676,4.949,4.228,8.162,4.228c0.52,0,1.043-0.041,1.566-0.124c3.76-0.596,6.855-3.274,7.984-6.909l10.586-34.051
				l34.051-10.584c3.635-1.13,6.312-4.227,6.907-7.985C253.76,285.115,252.17,281.343,249.062,279.146z M201.248,289.906
				c-3.143,0.977-5.604,3.438-6.58,6.581l-6.133,19.723l-11.926-16.863c-1.875-2.651-4.92-4.226-8.164-4.226
				c-0.041,0-0.084,0-0.127,0.001l-20.652,0.264l12.354-16.553c1.967-2.638,2.512-6.075,1.455-9.192l-6.633-19.56l19.559,6.633
				c3.119,1.058,6.557,0.514,9.193-1.456l16.553-12.353l-0.264,20.651c-0.043,3.291,1.537,6.393,4.225,8.292l16.863,11.926
				L201.248,289.906z"/>
			<path d="M376.885,5.057c-33.625-14.943-74.965,4.36-92.146,43.028c-2.973,6.691-5.01,13.53-6.207,20.343l-30.141,1.482
				c-2.479,0.122-4.824,1.162-6.58,2.917L21.734,292.905c-1.875,1.875-2.928,4.419-2.928,7.071c0,2.651,1.053,5.195,2.928,7.07
				l123.037,123.036c1.953,1.953,4.512,2.93,7.072,2.93c2.559,0,5.117-0.978,7.07-2.93l220.078-220.078
				c1.754-1.755,2.795-4.101,2.916-6.58l3.531-71.801c8.935-7.957,16.24-18.014,21.275-29.344
				C423.895,63.614,410.514,20,376.885,5.057z M151.844,408.87L42.95,299.976l210.277-210.28l24.225-1.191
				c1.24,17.583,8.244,33.737,19.984,45.171c-1.422,5.623,0.047,11.827,4.445,16.226c6.647,6.648,17.43,6.648,24.078,0
				c6.647-6.648,6.647-17.429,0-24.077c-4.379-4.38-10.552-5.855-16.154-4.463c-8.734-8.355-13.941-20.415-14.93-33.713
				l72.879-3.584l-5.633,114.527L151.844,408.87z M390.748,95.187c-1.152,2.593-2.453,5.1-3.888,7.506l1.41-28.668
				c0.139-2.819-0.92-5.566-2.916-7.563c-1.996-1.995-4.742-3.055-7.562-2.917l-81.259,3.997c0.984-4.141,2.359-8.284,4.173-12.363
				c13.268-29.864,44.26-45.187,69.084-34.155C394.615,32.055,404.018,65.324,390.748,95.187z"/>
		</g>
	</g>
</g>
</svg>
		                        					</span>
		                        					{category.name} ➡
		                        				</span> 
		                        				<p className="inline-block italic text-sub-desc"> count activities: <span className="text-second">{activities}</span>, count durations: <span className="text-second">{durationsInHuman}</span>.</p>
		                        				<hr className="border-b-slate-300 border-b-2"/>                      			
		                        			</li>
                        					)
                        			})}
                        		</ul>
                        		<div className="graphic-sum">
                        			<h3 className="text-lg italic text-sub-desc relative">
                        				<span className="inline-block pr-2 w-30 h-30 absolute left-12 top-0">
                        					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16ZM12 6C11.7159 6 11.5259 6.34084 11.1459 7.02251L11.0476 7.19887C10.9397 7.39258 10.8857 7.48944 10.8015 7.55334C10.7173 7.61725 10.6125 7.64097 10.4028 7.68841L10.2119 7.73161C9.47396 7.89857 9.10501 7.98205 9.01723 8.26432C8.92945 8.54659 9.18097 8.84072 9.68403 9.42898L9.81418 9.58117C9.95713 9.74833 10.0286 9.83191 10.0608 9.93531C10.0929 10.0387 10.0821 10.1502 10.0605 10.3733L10.0408 10.5763C9.96476 11.3612 9.92674 11.7536 10.1565 11.9281C10.3864 12.1025 10.7318 11.9435 11.4227 11.6254L11.6014 11.5431C11.7978 11.4527 11.8959 11.4075 12 11.4075C12.1041 11.4075 12.2022 11.4527 12.3986 11.5431L12.5773 11.6254C13.2682 11.9435 13.6136 12.1025 13.8435 11.9281C14.0733 11.7536 14.0352 11.3612 13.9592 10.5763L13.9395 10.3733C13.9179 10.1502 13.9071 10.0387 13.9392 9.93531C13.9714 9.83191 14.0429 9.74833 14.1858 9.58118L14.316 9.42898C14.819 8.84072 15.0706 8.54659 14.9828 8.26432C14.895 7.98205 14.526 7.89857 13.7881 7.73161L13.5972 7.68841C13.3875 7.64097 13.2827 7.61725 13.1985 7.55334C13.1143 7.48944 13.0603 7.39258 12.9524 7.19887L12.8541 7.02251C12.4741 6.34084 12.2841 6 12 6Z" fill="#ea580c"/>
											<path d="M4.49517 12.9946L2.99206 14.551C2.45194 15.1102 2.18188 15.3898 2.08843 15.6266C1.87548 16.1662 2.05772 16.7648 2.52138 17.0486C2.72486 17.1732 3.09187 17.212 3.82589 17.2897C4.2403 17.3335 4.44755 17.3554 4.6211 17.4219C5.00966 17.5709 5.31191 17.8838 5.45575 18.2861C5.52 18.4658 5.54117 18.6804 5.5835 19.1095C5.65848 19.8695 5.69597 20.2495 5.81628 20.4602C6.09042 20.9403 6.66852 21.129 7.18967 20.9085C7.41837 20.8117 7.68843 20.5321 8.22855 19.9729L10.7106 17.4029C8.01306 16.9924 5.73225 15.314 4.49517 12.9946Z" fill="#ea580c"/>
											<path d="M13.2894 17.4029L15.7715 19.9729C16.3116 20.5321 16.5816 20.8117 16.8103 20.9085C17.3315 21.129 17.9096 20.9403 18.1837 20.4602C18.304 20.2495 18.3415 19.8695 18.4165 19.1095C18.4588 18.6804 18.48 18.4658 18.5442 18.2861C18.6881 17.8838 18.9903 17.5709 19.3789 17.4219C19.5525 17.3554 19.7597 17.3335 20.1741 17.2897C20.9081 17.212 21.2751 17.1732 21.4786 17.0486C21.9423 16.7648 22.1245 16.1662 21.9116 15.6266C21.8181 15.3898 21.5481 15.1102 21.0079 14.551L19.5048 12.9946C18.2677 15.314 15.9869 16.9924 13.2894 17.4029Z" fill="#ea580c"/>
											</svg>
                        				</span> 
                        				Total activities: <span className="text-second">{routines.length}</span>, total durations: <span className="text-second">{totalDuration}</span>, remaining free time: <span className="text-second">{remainingTime}</span>
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