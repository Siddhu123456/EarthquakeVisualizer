import LogoSection from './LogoSection/LogoSection';
import HeaderControls from './HeaderControls/HeaderControls';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-left">
                    <LogoSection />
                    <div className="subtitle">
                        Real-time seismic activity monitoring
                    </div>
                </div>
                
                <HeaderControls />
            </div>
        </header>
    );
};

export default Header;