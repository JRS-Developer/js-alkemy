import { NavLink } from "react-router-dom";
import { useAppContext } from "../Context";
import styles from "../css/Navbar.module.css";
import { AuthLinks, Links } from "../data";
import LogOutButton from "./LogOutButton";

const Navbar = () => {
	const { authToken } = useAppContext();

	return (
		<nav className={styles.navbar}>
			<ul className={styles.navbar_right}>
				{authToken
					? Links.map((link, index) => {
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
					  })
					: AuthLinks.map((link, index) => {
							const { path, name } = link;
							return (
								<li
									className={styles.navbar__item}
									key={`authLink-${index}`}
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
				{authToken ? <LogOutButton /> : null}
			</ul>
		</nav>
	);
};

export default Navbar;
