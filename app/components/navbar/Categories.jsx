import Container from "@/app/components/navbar/Container";
import {TbBeach, TbMountain, TbPool} from "react-icons/tb";
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill, GiWoodCabin} from "react-icons/gi";
import {MdOutlineVilla} from "react-icons/md";
import CategoryBox from "@/app/components/CategoryBox";
import {usePathname, useSearchParams} from "next/navigation";
import {FaSkiing} from "react-icons/fa";
import {BsFillCupHotFill, BsSnow} from "react-icons/bs";
import {IoDiamond} from "react-icons/io5";
import {PiFarm, PiParkFill} from "react-icons/pi";
import {FcLandscape} from "react-icons/fc";

export const categories = [
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a castle!'
    },
    {
        label: 'Amazing Pools',
        icon: TbPool,
        description: 'This property has a pool!'
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a cave!'
    },
    {
        label: 'National Parks',
        icon: PiParkFill,
        description: 'This property has park!'
    },
    {
        label: 'BeachFront',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Farms',
        icon: PiFarm,
        description: 'This property has farms!'
    },
    {
        label: 'Treehouses',
        icon: GiWindmill,
        description: 'This property has treehouse!'
    },
    {
        label: 'Cabins',
        icon: GiWoodCabin,
        description: 'This property has cabins!'
    },
    {
        label: 'Lakefront',
        icon: GiBoatFishing,
        description: 'This property is close to a lake!'
    },
    {
        label: 'Bed & breakfasts',
        icon: BsFillCupHotFill,
        description: 'This property will provide you complementary breakfasts!'
    },
    {
        label: 'Countryside',
        icon: FcLandscape,
        description: 'This property is countryside!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activities!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in the barn!'
    },
    {
        label: 'Luxe',
        icon: IoDiamond,
        description: 'This property is luxurious!'
    },
]

function Categories() {
    let params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) return null;

    return (
        <Container>
            <div className={'flex items-center justify-between pt-4 overflow-x-auto'}>
                {categories.map((item) => (
                    <CategoryBox key={item.label} label={item.label} icon={item.icon} selected={category === item.label}/>
                ))}
            </div>
        </Container>
    );
}

export default Categories;
