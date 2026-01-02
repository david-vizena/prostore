import { z } from 'zod';
import {
	insertProductSchema,
	insertCartSchema,
	cartItemSchema,
	shippingAddressSchema,
} from '@/lib/validators';
import 'next-auth';
import 'next-auth/jwt';

export type Product = z.infer<typeof insertProductSchema> & {
	id: string;
	rating: string;
	createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

// Extend NextAuth types to include role
declare module 'next-auth' {
	interface User {
		role?: string;
	}

	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role?: string;
		};
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		role?: string;
	}
}
