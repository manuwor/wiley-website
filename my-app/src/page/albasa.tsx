import HeaderComponent from "../component/header"
import './main.scss';
import ALBASA_PAGE_JSON from "../assets/json/pages.json";
import IMG_LOGO from "../assets/assets/images/albasa-logo-panel.jpg";
import TablePageComponent from "../component/table/table-page";
const AlbasaPage = () => {


    return (

        <>
            <HeaderComponent></HeaderComponent>
            <div className="main-control">
                <div className="main-content-control">

                    <h1 className="main-text-title">{ALBASA_PAGE_JSON.albasa.title}</h1>
                    <img src={IMG_LOGO} className="main-logo-control"></img>
                    <span className="main-desc">{ALBASA_PAGE_JSON.albasa.desc}</span>
                    <div className="main-table">
                        <TablePageComponent nameMod="albasa"></TablePageComponent>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AlbasaPage;