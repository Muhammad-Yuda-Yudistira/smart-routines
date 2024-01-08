import {Head,router,usePage} from '@inertiajs/react';
import {useState,useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContainerAdmin from '@/Layouts/ContainerAdmin';
import Title from '@/Components/Title';

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

	useEffect(() => {
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

		const formData = new FormData();
		  formData.append('title', titleRes);
		  formData.append('type', type);
		  formData.append('period', period);
		  formData.append('category_id', categoryId);
		  formData.append('goal', goal);
		  formData.append('description', description);
		  formData.append('image', image);

		if(resolution)
		{
			console.log('formData:',formData);
			router.put(route('resolutions.update', {id:resolution.id}), formData)
		} else
		{
			console.log('formData2:',formData);
			router.post(route('resolutions.store'), formData)
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
						<h2 className="font-semibold text-2xl text-gray-600 leading-tight" style={{fontFamily:'Smooch Sans'}}>
              <span className="font-sans">👼🏿</span> {title} 
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
            	<h1 className="text-5xl" style={{fontFamily:'Nova Square'}}>{title}</h1>
            </Title>
						<main className="w-full flex justify-center" style={{fontFamily:'Smooch Sans'}}>
							<ul className="text-2xl text-center w-[80%] margin-auto">
								<form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
									<table className="table text-xl">
										<tbody>
											<tr>
												<li className="pb-3">
													<td>
														<label for="title" className="mr-3 font-semibold capitalize">title:</label>
													</td>
													<td className="w-full">
														<input type="text" name="title" value={titleRes} onChange={handleChange} placeholder="Type here" className="input input-sm input-info input-bordered w-full" id="title" />
														{errors.title && <small className="text-rose-500">{errors.title}</small>}
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3">
													<td>
														<span className="mr-3 font-semibold capitalize">type:</span>
													</td>
													<td>
														<input type="radio" onChange={handleChange} checked={type == 'Obligation' ? true : false} id="obligation" name="type" value="Obligation" className="radio radio-info mr-2" />
														<label for='obligation'>obligation</label>
														<input type="radio" onChange={handleChange} checked={type == 'Lifestyle' ? true : false} id="lifestyle" name="type" value="Lifestyle" className="radio radio-info ml-5 mr-2" />
														<label for='lifestyle'>lifestyle</label>
														{errors.type && <><br/><small className="text-rose-500">{errors.type}</small></>}
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3">
													<td>
														<span className="mr-3 font-semibold capitalize">period:</span>
													</td>
													<td>
														<input type="radio" id="weekly" name="period" checked={period == 'Weekly' ? true : false} onChange={handleChange} value="Weekly" className="radio radio-info mr-2" />
														<label for='weekly'>weekly</label>
														<input type="radio" id="monthly" name="period" checked={period == 'Monthly' ? true : false} onChange={handleChange} value="Monthly" className="radio radio-info ml-5 mr-2" />
														<label for='monthly'>monthly</label>
														<input type="radio" id="yearly" name="period" checked={period == 'Yearly' ? true : false} onChange={handleChange} value="Yearly" className="radio radio-info ml-5 mr-2" />
														<label for='yearly'>yearly</label>
														{errors.period && <><br/><small className="text-rose-500">{errors.period}</small></>}
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3">
													<td>
														<label for="category" className="mr-3 font-semibold capitalize">category:</label>
													</td>
													<td className="w-full">
														<select id="category" name="category_id" onChange={handleChange} className="select select-sm select-info py-0 select-bordered w-full max-w-xs">
																  <option disabled selected>choice</option>
															{categories.map(category => {
																return(
																	<>
																  	<option value={category.id} selected={categoryId == category.id ? true : false} >{category.name}</option>
																	</>
																	)
															})}
														</select>
														{errors.category_id && <><br/><small className="text-rose-500">{errors.category_id}</small></>}
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3">
													<td>
														<label for="goal" className="mr-3 font-semibold capitalize">goal:</label>
													</td>
													<td className="w-full">
														<textarea id="goal" name="goal" onChange={handleChange} value={goal} className="textarea textarea-sm textarea-bordered textarea-info w-full" placeholder="Type Here.."></textarea>
														{errors.goal && <small className="text-rose-500">{errors.goal}</small>}
													</td>
													
												</li>
												
											</tr>
											<tr>
												<li className="pb-3">
													<td>
														<label for="description"className="mr-3 font-semibold capitalize">description:</label>
													</td>
													<td className="w-full">
														<textarea id="description" name="description" onChange={handleChange} value={description} className="textarea textarea-sm textarea-info textarea-bordered w-full" placeholder="Type Here.."></textarea>
														{errors.description && <small className="text-rose-500">{errors.description}</small>}
													</td>
												</li>
											</tr>
											<tr>
												<li className="pb-3">
													<td>
														<label for="image" className="mr-3 font-semibold capitalize">image:</label>
													</td>
													<td className="w-full">
														{resolution && <span id="preview" className="block m-3 text-yellow-400">
															Your Image
															<img src={"/storage/" + resolution.image} alt="" width="150" height="150" className=""/>
														</span>}
														
														<input id="image" type="file" name="image" onChange={handleChange} className="file-input file-input-sm file-input-bordered file-input-info w-full max-w-xs" />
														<small className="block">{image.name}</small>
														{errors.image && <small className="text-rose-500">{errors.image}</small>}
													</td>
												</li>
											</tr>
											<tr>
												<td className="w-full">
													<button name="create" className="capitalize btn btn-sm btn-info w-full text-md" style={{fontFamily:'Nova Square'}}>➕ create</button>
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