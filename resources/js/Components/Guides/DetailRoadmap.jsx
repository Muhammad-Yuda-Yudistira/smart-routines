export default function DetailRoadmap()
{
	let year = new Date().getFullYear()
	return (
		<div className="stats shadow text-dark-content border-0 w-full">
		  <div className="stat">
		    <div className="stat-figure text-secondary">
		      {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>*/}
		    </div>
		    <div className="stat-title text-gray-500">Create</div>
		    <div className="stat-value">Resolutions</div>
		    <ul className="stat-desc text-gray-600">
		    	<li>Resolution for the next 10 years</li>
		    	<li>Resolution for the next 5 years</li>
		    	<li>Resolution for the {year}</li>
		    </ul>
		  </div>
		  
		  <div className="stat">
		    <div className="stat-figure text-secondary">
		    </div>
		    <div className="stat-title text-gray-500">Create</div>
		    <div className="stat-value">Routine</div>
		    <ul className="stat-desc text-gray-600">
		    	<li>Routine for the {year}</li>
		    	<li>If finished, create routine for next year until the next 5 years</li>
		    	<li>If finished, create routine for next year until the next 10 years</li>
		    	<li>back to first if done</li>
		    </ul>
		  </div>
		  
		  <div className="stat">
		    <div className="stat-figure text-secondary">
		    </div>
		    <div className="stat-title text-gray-500">Tracking</div>
		    <div className="stat-value">Graphics</div>
		    <ul className="stat-desc text-gray-600">
		    	<li>Fix your next year resolution by analytic graphics</li>
		    	<li>Fix now resolution by analytic graphics, when your this year resolution is going..</li>
		    	<li>Fix your next 5 year resolution by analytic graphics</li>
		    	<li>Fix your next 10 year resolution by analytic graphics</li>
		    </ul>
		  </div>
		</div>
		)
}