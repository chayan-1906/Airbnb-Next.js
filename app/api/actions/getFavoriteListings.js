import getCurrentUser from "@/app/api/actions/getCurrentUser";

export default async function getFavoriteListings() {
    try {
        let currentUser = await getCurrentUser();

        if (!currentUser) return [];

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])],
                },
            },
        });

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));

        return safeFavorites;
    } catch (error) {
        throw new Error(error);
    }
}
