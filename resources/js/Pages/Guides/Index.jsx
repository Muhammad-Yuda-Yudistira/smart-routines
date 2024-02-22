import {Head} from '@inertiajs/react'
import Roadmap from '@/Components/Guides/Roadmap'
import DetailRoadmap from '@/Components/Guides/DetailRoadmap'
import Navbar from '@/Layouts/Navbar'
import Footer from '@/Layouts/Footer'

export default function Index({auth,appName})
{
	// console.log('app name in guide:',auth)
	return(
			<>
				<Head title="Guides"></Head>
				<Navbar user={auth.user} appName={appName} />
				<div className="container px-14 pt-8 min-w-full">
					<div className="pb-8">
						<h1 className="text-center text-5xl py-4 text-second">Guides</h1>
						<hr className="border-b-1 border-orange-600"/>
					</div>
					<Roadmap/>
				</div>
				<DetailRoadmap/>
				<Footer/>
			</>
		)
}	