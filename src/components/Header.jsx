import { HEADER_LOGO_URL, HEADER_TITLE } from "../utils/constant";

const Header = () => {
  return (
		<div className="header-container">
			<div className="header-icon">
				<img src={HEADER_LOGO_URL}/>
			</div>
			<div className="header-title">
				{HEADER_TITLE}
			</div>
		</div>
	);
};

export default Header;