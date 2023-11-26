
export default function ToggleDetail({ name, details }: { name: string, details: string }) {
	return (
		<div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100">
			<div className="collapse-title text-base font-medium">
				{name}
			</div>
			<div className="collapse-content">
				<p>{details}</p>
			</div>
		</div>
	)
}
