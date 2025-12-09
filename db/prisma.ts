import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Prisma 5.22.0 doesn't fully support the adapter API from @prisma/adapter-neon@7.0.1
// Using PrismaClient directly with the DATABASE_URL connection string works fine with Neon
// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient().$extends({
	result: {
		product: {
			price: {
				compute(product) {
					return product.price.toString();
				},
			},
			rating: {
				compute(product) {
					return product.rating.toString();
				},
			},
		},
	},
});
