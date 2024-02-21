import {useState, useEffect} from 'react'

export default function Item({card, index, isActive, startZones, handleDetail})
{
	const [cardFilled, setCardFilled] = useState(false)

	// menentukan card empty dan card filled
	useEffect(() =>  {
		startZones.map(startZone => {
			if(startZone == card) {
				setCardFilled(true)
			}
		})
	}, [startZones])

	const handleClick = (e) => {
		handleDetail(e.target.getAttribute('index'))
	}

	return isActive ? (
		<li>
			<span className="bg-slate-200 text-stone-500 inline-block w-32 h-32 rounded-full text-center my-10 mb-12 uppercase font-four text-s pt-8
			after:content-['Detail'] after:leading-[100px] after:text-stone-500 after:text-base after:font-four after:border-t-[10px] after:border-b-[10px] after:border-l-[5px] after:border-l-orange-500 after:border-b-gray-400 after:w-[120px] after:h-[120px] after:border-solid after:bg-gray-300 after:bg-[url('')] after:bg-cover after:rounded-tr-full after:rounded-br-full after:fixed after:left-[19rem] after:top-72 after:z-10 after:opacity-90">
				<small className="">{card}</small>
				<p>Category</p>
				<small className="">3 Hour</small>
			</span>
		</li>
		) : cardFilled ? (
			<li className="">
				<div index={index} className="relative bg-slate-300 opacity-60 text-stone-500 text-3xl inline-block z-30 relative w-32 h-32 text-center leading-[8rem] mb-2 pt-2 uppercase hover:opacity-30 first:mt-6 first:leading-0" onClick={handleClick}>
					<div index={index} onClick={handleClick} className="w-full h-full bg-rose-800 absolute top-0 opacity-0"></div>
					<small className="CARD bg-orange-300 absolute leading-3 p-2">{card}</small>
					<img src={'/assets/icons/simbol/hobby.svg'} alt="" className="m-auto w-24 h-24" />
					<small className="bg-slate-700 absolute leading-3 p-2 -left-8 rounded-tr-2xl">1 Hour</small>
				</div>
			</li>
		) : (
			<li className="">
				<span className="bg-slate-300 opacity-60 text-stone-500 text-3xl inline-block w-32 h-32 text-center mb-2 uppercase hover:opacity-30 first:mt-6">
			 		<button className="relative w-full h-full rotate-45 bg-white opacity-60 z-20">
			 			<div index={index} onClick={handleClick} className="absolute w-full h-full bg-rose-800 opacity-0"></div> 
			 			<div className="w-full h-full flex flex-col justify-center">
			 				<p>Empty</p>
			 				<small className="CARD text-sm">{card}</small>
			 			</div> 
			 		</button>
			 	</span>
			</li>
		)
}