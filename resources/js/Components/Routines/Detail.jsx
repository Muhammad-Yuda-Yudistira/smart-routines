export default function Detail()
{
	return (
			<div className="flex flex-col h-full w-full pt-4">
				<div className="w-2/3 h-3/5 ml-24 flex relative">
					<div className="w-full h-full bg-gray-600 text-center overflow-hidden">
						<img src="/assets/images/theme/hero-image-nature.jpg" alt="" />
					</div>
					<div className="w-full h-2/3 bg-transparent absolute -bottom-28 -right-40 text-black overflow-y-scroll p-6 after:content-['💎💎Back-To-Top💎💎'] after:uppercase after:leading-[1000px] after:block after:w-full after:h-[1000px] after:bg-slate-300 after:absolute after:top-0 after:float-left after:opacity-30 after:text-4xl">
						<p className="p-6 opacity-100 leading-loose text-stone-500 z-10 bg-white uppercase">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsam tempore consectetur magnam expedita maxime error numquam sed culpa. Sunt labore cumque exercitationem non ipsa, velit reiciendis tempore assumenda nemo.

							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsam tempore consectetur magnam expedita maxime error numquam sed culpa. Sunt labore cumque exercitationem non ipsa, velit reiciendis tempore assumenda nemo.
						</p>
					</div>
					<span className="absolute px-4 pr-6 bg-slate-300 opacity-30 text-stone-700 rounded-b-sm font-bold left-12">
						<h6 className="z-30 uppercase">Title</h6>
					</span>
					<span className="absolute h-[80px] px-2 bg-slate-300 text-stone-900 leading-[80px] text-center right-6 opacity-30 uppercase">Category</span>
					<span className="absolute w-[80px] h-[80px] bg-yellow-200 text-red-500 leading-[80px] text-center -right-40 top-8 rotate-45">Duration</span>
				</div>

				<div className="w-full h-2/5 bg-green-300 p-2 pl-10 text-start">
					<button className="btn btn-sm btn-primary mr-2">Edit</button>
					<button className="btn btn-sm btn-primary mr-2">Delete</button>
					<br/>
					<small className="text-purple-600">Created At: jumat, 12 feb 2024</small>
				</div>
			</div>
		)
}