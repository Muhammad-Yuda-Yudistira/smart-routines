import {Head,router,usePage} from '@inertiajs/react';
import {useState,useEffect,useRef} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContainerAdmin from '@/Layouts/ContainerAdmin';
import Title from '@/Components/Title';
import JoditHandle from '@/Components/Routines/JoditHandle';


export default function Form({title,categories,resolution=null,auth})
{
	const [titleRes, setTitleRes] = useState('');
	const [type, setType] = useState('');
	const [period, setPeriod] = useState('');
	let [categoryId, setCategoryId] = useState('');
	const [goal, setGoal] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState({});

	const {flash,errors} = usePage().props;

	let year = new Date().getFullYear()

	const editor = useRef(null)
	const config = {
		placeholder: "Description",
	}

	useEffect((newDesc) => {
		if(resolution)
		{
			setTitleRes(resolution.title)
			setType(resolution.type)
			setPeriod(resolution.period)
			setCategoryId(resolution.category_id)
			setGoal(resolution.goal)
			setDescription(resolution.description)
		} else 
		{
			return
		}
	}, [])

	function richTextEditorHandle(newDesc)
	{
		if(newDesc)
		{
			return setDescription(newDesc)
		}
	}


	function handleChange(e)
	{
		const {name, value, files} = e.target
		
		if(name == 'image')
		{
			setImage(files[0])
		} else 
		{
			switch (name) {
				case 'title':
					setTitleRes(value)
					break
				case 'type':
					setType(value)
					break
				case 'period':
					setPeriod(value)
					break
				case 'category_id':
					setCategoryId(value)
					break
				case 'goal':
					setGoal(value)
					break
				case 'description':
					setDescription(value)
					break
			}
		}
	}

	function handleSubmit(e)
	{
		e.preventDefault()

		categoryId = Number(categoryId)

		const newResolution = {
			title: titleRes,
			type,
			period,
			category_id: categoryId,
			goal,
			description,
		}

		if(resolution)
		{
			router.put(route('resolutions.update', {id:resolution.id}), newResolution)
		} else
		{
			newResolution['image'] = image
			router.post(route('resolutions.store'), newResolution)
		}

		if(flash.message)
		{
			setTitleRes('')
			setType('')
			setPeriod('')
			setCategoryId('')
			setGoal('')
			setDescription('')
			setImage('')
		}
	}
	return (
			<>
				<AuthenticatedLayout 
					user={auth.user}
					header={
						<h2 className="menu-title font-tersier">
			              <span className="inline-block pr-2">
                            <svg width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                                
                                <title>plus</title>
                                <desc>Created with Sketch Beta.</desc>
                                <defs>

                            </defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                                    <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-360.000000, -1035.000000)" fill="white">
                                        <path d="M388,1053 L378,1053 L378,1063 C378,1064.1 377.104,1065 376,1065 C374.896,1065 374,1064.1 374,1063 L374,1053 L364,1053 C362.896,1053 362,1052.1 362,1051 C362,1049.9 362.896,1049 364,1049 L374,1049 L374,1039 C374,1037.9 374.896,1037 376,1037 C377.104,1037 378,1037.9 378,1039 L378,1049 L388,1049 C389.104,1049 390,1049.9 390,1051 C390,1052.1 389.104,1053 388,1053 L388,1053 Z M388,1047 L380,1047 L380,1039 C380,1036.79 378.209,1035 376,1035 C373.791,1035 372,1036.79 372,1039 L372,1047 L364,1047 C361.791,1047 360,1048.79 360,1051 C360,1053.21 361.791,1055 364,1055 L372,1055 L372,1063 C372,1065.21 373.791,1067 376,1067 C378.209,1067 380,1065.21 380,1063 L380,1055 L388,1055 C390.209,1055 392,1053.21 392,1051 C392,1048.79 390.209,1047 388,1047 L388,1047 Z" id="plus" sketch:type="MSShapeGroup">

                            </path>
                                    </g>
                                </g>
                            </svg>
                        </span>
			               {title} 
			            </h2>
					}
				>

				<Head title={title} />

					<ContainerAdmin>
						{flash.message && (
							<div role="alert" className="alert h-12 mb-8 py-2">
							  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
							  <span>{flash.message}</span>
							</div>
							)}
			            <Title>
			            	<h1 className="text-5xl font-main text-second">{title}</h1>
			            </Title>
						<main className="w-full flex justify-center font-tersier">
							<ul className="text-2xl text-center w-[80%] margin-auto">
								<form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
									<table className="table text-xl">
										<tbody>
											<tr>
												<li className="pb-3 flex">
													<td>
														<label for="title" className="mr-3 font-semibold capitalize text-desc">title:</label>
													</td>
													<td className="w-full flex flex-col justify-start">
														<input type="text" name="title" value={titleRes} onChange={handleChange} placeholder={"Example: Resolution the next 10 years. Resolution the next 5 years. Resolution " + year} className="input input-sm input-info input-bordered w-full bg-slate-300 border-slate-400 placeholder-slate-400 text-sub-desc" id="title" />
														{errors.title && <small className="text-second">{errors.title}</small>}
														<div className="label p-0">
														    <span className="label-text text-desc tracking-wide">*reommendation: create 3 resolutions for the next 10 year, the next 5 year and {year} or create 1 for {year} only.</span>
														 </div>
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3 flex">
													<td>
														<span className="mr-3 font-semibold capitalize">type:</span>
													</td>
													<td>
														<input type="radio" onChange={handleChange} checked={type == 'Obligation' ? true : false} id="obligation" name="type" value="Obligation" className="radio radio-info mr-2 border-slate-400 hover:border-slate-500" />
														<label for='obligation' title="Work or Study">obligation</label>
														<input type="radio" onChange={handleChange} checked={type == 'Lifestyle' ? true : false} id="lifestyle" name="type" value="Lifestyle" className="radio radio-info ml-5 mr-2 border-slate-400 hover:border-slate-500" />
														<label for='lifestyle' title="Free Time">lifestyle</label>
														{errors.type && <><br/><small className="text-second">{errors.type}</small></>}
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3 flex">
													<td>
														<span className="mr-3 font-semibold capitalize">period:</span>
													</td>
													<td>
														<input type="radio" id="weekly" name="period" checked={period == 'Weekly' ? true : false} onChange={handleChange} value="Weekly" className="radio radio-info mr-2 border-slate-400 hover:border-slate-500" />
														<label for='weekly' title="not-recommend">weekly</label>
														<input type="radio" id="monthly" name="period" checked={period == 'Monthly' ? true : false} onChange={handleChange} value="Monthly" className="radio radio-info ml-5 mr-2 border-slate-400 hover:border-slate-500" />
														<label for='monthly' title="un-common">monthly</label>
														<input type="radio" id="yearly" name="period" checked={period == 'Yearly' ? true : false} onChange={handleChange} value="Yearly" className="radio radio-info ml-5 mr-2 border-slate-400 hover:border-slate-500" />
														<label for='yearly' title="common">yearly</label>
														{errors.period && <><br/><small className="text-second">{errors.period}</small></>}
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3 flex">
													<td>
														<label for="category" className="mr-3 font-semibold capitalize">category:</label>
													</td>
													<td className="w-full flex flex-col justify-start">
														<select id="category" name="category_id" onChange={handleChange} className="select select-sm select-info py-0 select-bordered w-full max-w-xs bg-slate-300 border-slate-400 placeholder-slate-400 text-sub-desc text-sub-desc">
																  <option disabled selected>choice</option>
															{categories.map(category => {
																return(
																	<>
																  	<option value={category.id} selected={categoryId == category.id ? true : false} >{category.name}</option>
																	</>
																	)
															})}
														</select>
														{errors.category_id && <><br/><small className="text-second">{errors.category_id}</small></>}
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3 flex">
													<td>
														<label for="goal" className="mr-3 font-semibold capitalize">goal:</label>
													</td>
													<td className="w-full flex flex-col justify-start">
														<textarea id="goal" name="goal" onChange={handleChange} value={goal} className="textarea textarea-sm textarea-bordered textarea-info w-full bg-slate-300 border-slate-400 placeholder-slate-400 text-sub-desc" placeholder="Example: Work in google"></textarea>
														<input id="goal" type="hidden" name="goal" />
														

														{errors.goal && <small className="text-second">{errors.goal}</small>}
														<div className="label p-0">
														    <span className="label-text text-desc tracking-wide">*1 resolution for 1 goals. if you have 3 goals please create 3 resolution with the same title. recommendation: max 3 goals, min 1 goals.</span>
														 </div>
													</td>
													
												</li>
												
											</tr>
											<tr>
												<li className="pb-3 flex">
													<td>
														<label for="description"className="mr-3 font-semibold capitalize">description:</label>
													</td>
													<td className="w-full flex flex-col justify-start">
														<JoditHandle 
															description={description}
															setDescription={setDescription}
														/>
														{errors.description && <small className="text-second">{errors.description}</small>}
														<div className="label p-0">
															<span className="label-text text-desc tracking-wide">*this is detail for your goal, describe here. don't too long; short, dense and clear. create to point: 1.detail your goal 2.how to way finished your goal.</span>
														 </div>
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3 flex">
													<td>
														<label for="image" className="mr-3 font-semibold capitalize">image:</label>
													</td>
													<td className="w-full flex flex-col justify-start">
														{resolution && <span id="preview" className="block m-3 text-yellow-400">
															Your Image
															<img src={"/storage/" + resolution.image} alt="" width="150" height="150" className=""/>
														</span>}
														
														<input id="image" type="file" name="image" onChange={handleChange} className="file-input file-input-sm file-input-bordered file-input-info w-full max-w-xs bg-slate-300 border-slate-400 placeholder-slate-400 text-sub-desc" />
														<small className="block">{image.name}</small>
														{errors.image && <small className="text-second">{errors.image}</small>}
														<div className="label p-0">
														    <span className="label-text text-desc tracking-wide">*add image for motivation your goals. image must to related by your goal. example: Google Company Image.</span>
														 </div>
													</td>
												</li>
											</tr>
											<tr>
												<td className="w-full font-main">
													<button name="create" type="submit" className="capitalize btn btn-sm btn-info w-full text-md text-main bg-second border-orange-600 hover:bg-orange-500 hover:border-orange-600">
														create
														<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect width="24" height="24" fill=""/>
															<path d="M12 6V18" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
															<path d="M6 12H18" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
														</svg>
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</form>
							</ul>
						</main>
					</ContainerAdmin>
		        </AuthenticatedLayout>
			</>
		)
}