import H1 from '@/components/h1'

export default function DashboardPage() {
	return (
		<main>
			<div className="flex justify-between items-center text-white py-8">
				<section>
					<H1>
						Pet<span className="font-semibold">Soft</span>
					</H1>
					<p className="text-lg opacity-80">
						Manage your pet daycare with ease
					</p>
				</section>
				<section className="text-center">
					<p className="text-2xl font-bold leading-6">2</p>
					<p className="opacity-80">current guests</p>
				</section>
			</div>
		</main>
	)
}
