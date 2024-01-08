import {Head,Link,usePage} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContainerAdmin from '@/Layouts/ContainerAdmin';
import Title from '@/Components/Title';

export default function Index({auth,title,data,routines}) {
  const {flash} = usePage().props;
  console.log('data:', '../assets/' + data[0].image)
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
                  <div role="alert" className="alert h-12 mb-8 py-2 rounded-tr-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{flash.message}</span>
                  </div>
                  )}
                <Title>
                    <h1 className="text-6xl" style={{fontFamily:'Nova Square'}}>Your {title}</h1>
                    <p className="text-lg" style={{fontFamily:'Smooch Sans'}}>Even if you don't achieve your goals, you have become a better person.</p>
                </Title>
                <div>
                    <Link className="btn capitalize mb-10 hover:text-slate-300" as="button" type="button" href={route('resolutions.create')}>add new resolution ➕</Link>
                </div>
                <main style={{fontFamily:'Smooch Sans'}}>
                {data.map(resolution => {
                    let newUrlImg = "/storage/" + resolution.image;
                    return(
                            <ul className="mb-12">
                                <div>
                                    <li>
                                        <h2 className="text-slate-400 capitalize font-bold text-4xl mb-6" style={{fontFamily:'Nova Square'}}>{resolution.title}</h2>
                                    </li>
                                </div>
                                <div>
                                    <li className="w-300 block">
                                        <img src={newUrlImg} alt="Image for motivation goals" className="float-left pr-6" width="300" />
                                    </li>
                                    <div className="mb-2">
                                        <Link href={route('resolutions.edit', {id:resolution.id})} method="get" as="button" type="button" className="btn btn-sm btn-outline uppercase mr-4 rounded-tr-none text-sm btn-disabled"><span className="text-xl">🔲</span>edit</Link>
                                        <Link href={route('resolutions.destroy', {id:resolution.id})} method="delete" onClick={function() { return confirm('Are you sure?')}} as="button" type="button" className="btn btn-sm uppercase mr-4 rounded-tr-none text-sm bg-[#191e24] hover:bg-[#3b3f46]"><span className="text-xl">🔳</span>delete</Link>
                                    </div>
                                    <li>
                                        <p className="text-slate-400 capitalize"><span className="font-semibold text-xl">type: </span>{resolution.type}</p>
                                    </li>
                                    <li>
                                        <p className="text-slate-400 capitalize"><span className="font-semibold text-xl">duration type: </span>{resolution.period}</p>
                                    </li>
                                    <li>
                                        <p className="text-slate-400 capitalize"><span className="font-semibold text-xl">category: </span>{resolution.category_id}</p>
                                    </li>
                                    <li>
                                        <p className="text-slate-400"><div className="text-xl font-semibold capitalize">goal: </div>{resolution.goal}</p>
                                    </li>
                                    <li>
                                        <p className="text-slate-400"><div className="text-xl font-semibold capitalize">description: </div>{resolution.description}</p>
                                    </li>
                                    <li>
                                      <div className="text-3xl font-semibold capitalize text-slate-400">routines for this goal: </div>
                                      <ul>
                                        {
                                          routines.filter(routine => routine.category_id === resolution.category_id).length > 0 
                                            ? 
                                            routines.filter(routine => routine.category_id === resolution.category_id).map(routine => <li key={routine.id} className="ml-5 text-2xl list-disc">{routine.title}</li>) 
                                            :
                                            <li className="text-rose-700 opacity-80 text-semibold uppercase">Routines not found!</li>
                                        }
                                      </ul>
                                    </li>
                                </div>
                                <hr className="border-t-2 mt-3" />
                            </ul>
                        )
                })}
                </main>
            </ContainerAdmin>
        </AuthenticatedLayout>
		</>
		)
}