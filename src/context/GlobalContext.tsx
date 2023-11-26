'use client';

import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductContext";
import { NotificationProvider } from "./NotificationContext";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "./ModalContext";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
	return (
		<ModalProvider>
			<AuthProvider>
				<ProductProvider>
					<CartProvider>
						<NotificationProvider>
							<SessionProvider>
								{children}
							</SessionProvider>
						</NotificationProvider>
					</CartProvider>
				</ProductProvider>
			</AuthProvider>
		</ModalProvider>
	);
}