import getCurrentUser from "@/app/api/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/api/actions/getReservations";
import ReservationsClient from "@/app/reservations/ReservationsClient";

async function ReservationsPage() {
    let currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title={'Unauthorized'} subtitle={'Please login'}/>
            </ClientOnly>
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title={'No reservations found'} subtitle={'Looks like you have no reservations on your property'}/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} currentUser={currentUser}/>
        </ClientOnly>
    );
}

export default ReservationsPage;
