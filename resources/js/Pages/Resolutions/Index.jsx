import {Head,Link,usePage,router} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContainerAdmin from '@/Layouts/ContainerAdmin';
import Title from '@/Components/Title';
import Swal from 'sweetalert2';
import parse from 'html-react-parser';

export default function Index({auth,title,data,routines}) {
  const {flash} = usePage().props;
	return (
		<>
			<AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="menu-title">
	              <span className="text-md inline-block fill-white pr-3"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M21.5,0h-3.5V1h3.5c.231,0,.451,.053,.646,.147l-4.223,4.223c-2.35-2.176-5.387-3.369-8.608-3.369C5.928,2,2.742,3.319,.347,5.715L-.007,6.069,8.609,14.684l-3.316,3.316H0v1H4.293l-3.646,3.646,.707,.707,3.649-3.649,.01,4.297,1-.002-.012-5.293,3.315-3.315,8.615,8.615,.354-.354c2.396-2.396,3.715-5.581,3.715-8.969,0-3.221-1.193-6.258-3.369-8.608L22.853,1.854c.094,.196,.147,.415,.147,.646v3.5h1V2.5c0-1.378-1.122-2.5-2.5-2.5ZM1.415,6.076c4.456-4.093,11.346-4.093,15.802,0l-7.9,7.9L1.415,6.076ZM17.924,22.585l-7.901-7.901,7.9-7.9c4.094,4.456,4.095,11.346,0,15.802Z"/></svg></span> {title}
	            </h2>
            }
        >
            <Head title={title} />

            <ContainerAdmin>
                {flash.message && (
                  <div role="alert" className="alert h-12 mb-8 py-2 rounded-tr-none bg-second-2 text-main border-orange-600">
                    <svg fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{flash.message}</span>
                  </div>
                  )}
                <Title>
                    <h1 className="text-6xl font-main text-title">Your {title}</h1>
                    <p className="text-lg font-tersier text-desc">Even if you don't achieve your goals, you have become a better person.</p>
                </Title>
                <div>
                    <Link className="btn capitalize mb-10 bg-second-2 border-none text-main hover:text-slate-100 hover:bg-orange-500" as="button" type="button" href={route('resolutions.create')}>
                        add new resolution 
                        <span className="">
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
                    </Link>
                    <hr className="border-b-4 border-slate-300"/>
                </div>
                <main className="font-tersier">
                {data <= 0 && (<h3 className="text-4xl my-28 text-center opacity-80">Resolution Empty</h3>)}
                {data.map(resolution => {
                    let newUrlImg;
                    if(resolution.image == "https://source.unsplash.com/300x300")
                    {
                        newUrlImg = resolution.image;
                    } else {
                        newUrlImg = "/storage/" + resolution.image;
                    }
                    return(
                            <ul className="mb-12">
                                <div className="mb-7">
                                    <li className="block mt-3 pl-4">
                                        <h2 className="text-title capitalize font-bold text-3xl inline font-main">{resolution.goal}</h2>
                                    </li>
                                    <li className="inline pl-4">
                                        <p className="text-second uppercase inline">{resolution.title}</p>
                                    </li>
                                </div>
                                <div id="content-box" className="flex gap-10">
                                    <div id="content-left">
                                        <li className="w-400 h-400 block">
                                            <div className="w-full h-full overflow-hidden">
                                                <img src={newUrlImg} alt="Image for motivation goals" className="overflow-hidden" width="400" height="400"/>
                                            </div>
                                        </li>
                                    </div>
                                    <div id="content-right">
                                        <div className="mb-2">
                                            <Link href={route('resolutions.edit', {id:resolution.id})} method="get" as="button" type="button" className="btn btn-sm btn-outline uppercase mr-4 rounded-tr-none text-sm">
                                                <span className="text-xl">
                                                    <svg fill="black" width="16px" height="16px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M960.36.011 109 508.785v902.442L960.36 1920l851.475-508.773V508.785L960.36.01ZM222.516 1346.864v-773.83L960.36 132.143l737.96 440.89v773.831l-737.96 441.005-737.846-441.005Z" fill-rule="evenodd"/>
                                                    </svg>
                                                </span>
                                                edit
                                            </Link>
                                            <Link onClick={function(e) { 
                                                e.preventDefault()
                                                Swal.fire({
                                                    title: "Are you sure?",
                                                    text: "Delete this...",
                                                    confirmButtonText: "Yes, delete it!",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#ea580c",
                                                    cancelButtonColor: "#64748b",
                                                }).then(result => {
                                                    if(result.isConfirmed) {
                                                        router.delete(route('resolutions.destroy', {id:resolution.id}))
                                                    } 
                                                })}} as="button" type="button" className="btn btn-sm uppercase mr-4 rounded-tr-none text-sm bg-second-2 border-none text-main hover:bg-orange-500">
                                                <span className="text-xl">
                                                    <svg fill="white" width="16px" height="16px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M960.36.011 109 508.785v902.442L960.36 1920l851.475-508.773V508.785z" fill-rule="evenodd"/>
                                                    </svg>
                                                </span>
                                                delete
                                            </Link>
                                        </div>
                                        <li>
                                            <p className="text-desc capitalize"><span className="font-semibold text-xl text-desc">type: </span>{resolution.type}</p>
                                        </li>
                                        <li>
                                            <p className="text-desc capitalize"><span className="font-semibold text-xl text-desc">duration type: </span>{resolution.period}</p>
                                        </li>
                                        <li>
                                            <p className="text-desc capitalize"><span className="font-semibold text-xl text-desc">category: </span>{resolution.category.name ? resolution.category.name : ''}</p>
                                        </li>
                                        <li className="bg-slate-100 p-5 rounded">
                                            <p className="text-desc"><div className="text-xl text-desc font-semibold capitalize">description: </div>{parse(resolution.description)}</p>
                                        </li>
                                        <li>
                                          <div className="text-3xl font-semibold capitalize text-desc">routines for this goal: </div>
                                          <ul className="">
                                            {
                                              routines.filter(routine => routine.category_id === resolution.category_id).length > 0 
                                                ? 
                                                routines.filter(routine => routine.category_id === resolution.category_id).map(routine => <Link href={"/dashboard/routines#" + routine.id} className="text-second underline"><li key={routine.id} className="clicker inline text-xl">{"- " + routine.title}</li></Link>) 
                                                :
                                                <li className="text-desc opacity-60 text-semibold uppercase text-3xl py-12 text-center">Routines not found!</li>
                                            }
                                          </ul>
                                        </li>
                                    </div>
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