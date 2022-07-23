import Head from "../components/Head"
import '../styles/main.css'
import AdCity from "./AdCity"
import AdNew from "./AdNew"

const AdMain = () => {
    return (
        <div className="ads-main">
            <div className="ads-main-content">
                <Head />
                <AdNew />
                <AdCity />
            </div>
        </div>
    )
}

export default AdMain