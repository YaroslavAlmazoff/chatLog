import CityBlock from "../components/CityBlock"
import Head from "../components/Head"
import NewBlock from "../components/NewBlock"
import '../styles/main.css'

const AdMain = () => {
    return (
        <div className="ads-main">
            <div className="ads-main-content">
                <Head />
                <NewBlock />
                <CityBlock />
            </div>
        </div>
    )
}

export default AdMain