import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import HorizontalProductCart from "../components/HorizontalProductCart";
import VerticalProductCart from "../components/VerticalProductCard";

const Home = () => {
   
    return (
        <div>
            <CategoryList/>
            <BannerProduct/>
            <HorizontalProductCart category={"airpodes"} heading={"Top's Airpodes"} />
            <HorizontalProductCart category={"earphones"} heading={"Top's Earphones"} />
            <VerticalProductCart category={"camera"} heading={"Top's Camera"} />
            <VerticalProductCart category={"mobiles"} heading={"Top's Mobiles"} />
            <VerticalProductCart category={"mouse"} heading={"Mouse"} />
            <VerticalProductCart category={"processor"} heading={"Processor"} />
            <VerticalProductCart category={"trimmers"} heading={"Trimmers"} />
            <VerticalProductCart category={"printers"} heading={"Printers"} />
            <VerticalProductCart category={"speakers"} heading={"Top's Speakers"} />
            <VerticalProductCart category={"refrigerator"} heading={"Top's Refrigerator"} />
            <VerticalProductCart category={"watches"} heading={"Top's Watches"} />
            <VerticalProductCart category={"televisions"} heading={"Top's Televisions"} />
        </div>
    );
};

export default Home;
