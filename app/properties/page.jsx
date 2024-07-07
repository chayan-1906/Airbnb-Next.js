import getCurrentUser from "@/app/api/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "@/app/properties/PropertiesClient";
import getListings from "@/app/api/actions/getListings";

async function PropertiesPage() {
    let currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title={'Unauthorized'} subtitle={'Please login'}/>
            </ClientOnly>
        );
    }

    let propertyListings = await getListings({userId: currentUser.id});

    if (propertyListings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title={'No properties found'} subtitle={'Looks like you have no properties'}/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertiesClient propertyListings={propertyListings} currentUser={currentUser}/>
        </ClientOnly>
    );
}

export default PropertiesPage;
