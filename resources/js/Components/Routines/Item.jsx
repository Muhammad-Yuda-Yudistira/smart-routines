export default function Item({isActive = false, routine = null, index})
{
	console.log('routine:', routine);
	routine && index == 0 ? isActive = true : isActive;
	return isActive && routine ? 
	(
		<>
			<span className="bg-slate-200 text-stone-500 inline-block w-32 h-32 rounded-full text-center my-10 mb-12 uppercase font-four text-s pt-8
				after:content-['Detail'] after:leading-[100px] after:text-stone-500 after:text-base after:font-four after:border-t-[10px] after:border-b-[10px] after:border-l-[5px] after:border-l-orange-500 after:border-b-gray-400 after:w-[120px] after:h-[120px] after:border-solid after:bg-gray-300 after:bg-[url('')] after:bg-cover after:rounded-tr-full after:rounded-br-full after:fixed after:left-[19rem] after:top-72 after:z-10 after:opacity-90">
				<small className="">{routine.start_time}</small>
				<p>{routine.category.name}</p>
				<small className="">3 Hour</small>
			</span>
		</>
	)
	:
	routine ? 
	(
		<span className="bg-slate-300 opacity-60 text-stone-500 text-3xl inline-block relative w-32 h-32 text-center leading-[8rem] mb-2 pt-2 uppercase hover:opacity-30 first:mt-6 first:leading-0">
			{/*<p className="bg-white rotate-45 opacity-60">{routine.category.name}</p>*/}
			<small className="bg-orange-300 absolute leading-3 p-2">{routine.start_time}</small>
			<img src={routine.category.simbol} alt="" className="m-auto w-24 h-24" />
			<small className="bg-slate-700 absolute leading-3 p-2 -left-8 rounded-tr-2xl">1 Hour</small>
		</span>
	)
	:
	(
		<span className="bg-slate-300 opacity-60 text-stone-500 text-3xl inline-block w-32 h-32 text-center leading-[8rem] mb-2 uppercase hover:opacity-30 first:mt-6">
			<p className="bg-white rotate-45 opacity-60">Empty</p>
		</span>
	)
		
}

// w-0 h-0 border-t-4 border-b-4 border-transparent border-r-4 border-solid border-yellow-500