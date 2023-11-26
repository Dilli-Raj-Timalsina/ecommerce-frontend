'use client'
import Modal from "../Modal/Modal";
import { BellIcon } from "@/assets/svg";
import { useNotificationContext } from "@/context/NotificationContext";
import { useModalContext } from "@/context/ModalContext";

export default function NotifyButton() {
	const { notificationList } = useNotificationContext()
	const { show } = useModalContext()

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn hover:bg-transparent btn-ghost btn-circle">
				<div className="indicator">
					<BellIcon />
					<span className="badge badge-sm indicator-item">{notificationList?.length || 0}</span>
				</div>
			</label>
			{notificationList?.length > 0 ?
				<div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 lg:w-80 bg-base-100 shadow">
					<div className="card-body">
						{notificationList && notificationList.map((e: any, i) => {
							return (
								<div key={i} className="card card-bordered">
									<div className="card-body">
										<span className="text-sm">{e?.notification}</span>
										<span className="text-xs text-right text-gray-600">{e?.date?.toLocaleString()}</span>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				:
				null
			}
			{show && <Modal />}
		</div>
	)
}