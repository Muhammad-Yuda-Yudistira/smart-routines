import {useEffect} from 'react';

export default function LoadingPage({children, onLoading}) {
	 // loading
	  function handleLoading() {
	    const loadEl = document.querySelector('#sheet-loading');
	    loadEl.style.display = "none";
	  }

	useEffect(() => {
		window.addEventListener('load', handleLoading())
	}, [])
	return (
		<>
			<div id="container-loading">
				<div id="sheet-loading">
			 		<div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
				{children}	
			</div>
		</>
		)
}