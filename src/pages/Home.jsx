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
        </div>
    );
};

export default Home;
