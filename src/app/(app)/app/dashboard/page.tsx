import Branding from '@/components/branding'
import H1 from '@/components/h1'
import Stats from '@/components/stats'

export default function DashboardPage() {
	return (
		<main>
			<div className="flex justify-between items-center text-white py-8">
				<Branding />
				<Stats />
			</div>
		</main>
	)
}
