import { NavLink } from "react-router-dom";
import styles from "../css/Navbar.module.css";
import { Links } from "../data";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<ul className={styles.navbar_right}>
				{Links.map((link, index) => {
					const { path, name } = link;
					return (
						<li
							className={styles.navbar__item}
							key={`link-${index}`}
						>
							<NavLink
								exact
								className={styles.navbar__link}
								activeClassName={styles.active}
								to={path}
							>
								{name}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navbar;
