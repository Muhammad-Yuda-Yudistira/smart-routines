export default function Roadmap()
{
	let year = new Date().getFullYear()
	return(
		<div className="">
			<div id="title" className="text-center">
				<h2 className="title capitalize text-3xl pt-2">Roadmap</h2>
				<small className="subtitle">Don't worry if you losed, it's proof that you <span className="underline">growth!</span></small>
			</div>
			<main className="text-center">
				<div className="py-12">
					<ul className="steps steps-vertical lg:steps-horizontal">
					  <li className="step step-neutral overflow-visible">
					  	<p className="relative">Create Resolutions</p>
					  </li>
					  <li className="step step-neutral">Create Routine</li>
					  <li className="step step-neutral">Track Graphic</li>
					  <li className="step step-neutral" data-content="★">Result Your Goals</li>
					</ul>
				</div>
			</main>
		</div>
		)
}