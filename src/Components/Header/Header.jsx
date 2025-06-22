import './Header.css'

function Header() {

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <div className="header-logo">
                            <h1>Alibekov Azimbek</h1>
                        </div>

                        <div className="header-menu">
                            <div className="menu-lines">
                                <div className="span1 menu"></div>
                                <div className="span2 menu"></div>
                                <div className="span3 menu"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header
