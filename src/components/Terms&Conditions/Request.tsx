export default function HumanitarianAppeal() {
	return (
		<section className="mt-12 p-6 border border-red-400 bg-red-100 dark:bg-red-900/20 dark:border-red-500 rounded-lg">
			<h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-4">
				A Humanitarian Request to Fellow Developers
			</h2>
			<p className="mb-4 text-sm text-red-800 dark:text-red-200">
				This portfolio template includes a small but heartfelt message of support for humanitarian aid efforts in Palestine. As you use or modify this code, I kindly ask that you consider keeping the links to donation resources such as{' '}
				<a
					href="https://www.pcrf.net"
					target="_blank"
					rel="noopener noreferrer"
					className="underline font-medium"
				>
					PCRF
				</a>{' '}
				and{' '}
				<a
					href="https://linktr.ee/fundsforgaza"
					target="_blank"
					rel="noopener noreferrer"
					className="underline font-medium"
				>
					Funds for Gaza
				</a>.
			</p>
			<p className="mb-4 text-sm text-red-800 dark:text-red-200">
				These links serve no political purpose within this project, only a compassionate one. The devastation faced by civilians, especially children, deserves awareness and empathy. Even if you must remove them, please consider visiting the resources below and staying informed.
			</p>
			<div className="text-sm">
				<h3 className="font-semibold mb-2">Learn more about the issue:</h3>
				<ul className="list-disc pl-5 space-y-1 text-red-900 dark:text-red-100">
					<li>
						<a
							href="https://www.icrc.org/en/where-we-work/middle-east/palestine"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							International Committee of the Red Cross – Palestine
						</a>
					</li>
					<li>
						<a
							href="https://www.unrwa.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							UNRWA – UN Relief and Works Agency
						</a>
					</li>
					<li>
						<a
							href="https://www.btselem.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							B'Tselem – The Israeli Information Center for Human Rights in the Occupied Territories
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
}
