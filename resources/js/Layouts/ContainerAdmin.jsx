export default function ContainerAdmin({children})
{
	return(
		<div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg text-lg py-10 px-28">
                	{children}
                </div>
            </div>
        </div>    
		)
}