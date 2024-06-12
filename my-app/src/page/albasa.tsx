import HeaderComponent from "../component/header"
import './main.scss';
import ALBASA_PAGE_JSON from "../assets/json/pages.json";

import TablePageComponent from "../component/table/table-page";
const AlbasaPage = () => {


    return (

        <>
            <HeaderComponent></HeaderComponent>
            <div className="main-control">
                <div className="main-content-control">

                    <h1 className="main-text-title">{ALBASA_PAGE_JSON.albasa.title}</h1>
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