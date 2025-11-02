import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import HorizontalProductCart from "../components/HorizontalProductCart";

const Home = () => {
   
    return (
        <div>
            <CategoryList/>
            <BannerProduct/>
            <HorizontalProductCart category={"airpodes"} heading={"Top's Airpodes"} />
        </div>
    );
};

export default Home;
